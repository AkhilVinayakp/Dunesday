import React, { useRef, useMemo, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import type { ThemeViewMode } from '../data/dunesdayContent';

export interface HeroSceneProps {
  themeMode?: ThemeViewMode;
  className?: string;
}

// ============================================================================
// CUSTOM GLSL SHADERS FOR SWIRLING SPICE MELANGE PARTICLES
// ============================================================================

const spiceParticleVertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uMorphHourglass;
  
  attribute float aScale;
  attribute float aPhase;
  attribute float aOrbitSpeed;
  attribute vec3 aColor;
  
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    
    // Base position in spherical/hourglass coordinates
    vec3 pos = position;
    
    // Calculate orbital rotation around Y and slight tilt on Z
    float angle = uTime * aOrbitSpeed * uSpeed + aPhase;
    float cosA = cos(angle);
    float sinA = sin(angle);
    
    vec3 rotatedPos = vec3(
      pos.x * cosA - pos.z * sinA,
      pos.y + sin(uTime * 1.4 + aPhase) * 0.14,
      pos.x * sinA + pos.z * cosA
    );

    // Subtle breathing radial wave
    float radialPulse = 1.0 + sin(uTime * 1.8 + aPhase * 2.0) * 0.06;
    rotatedPos.xz *= radialPulse;

    // Hourglass pinch effect modulated by theme
    float pinch = mix(1.0, 0.45 + 0.65 * abs(rotatedPos.y / 2.2), uMorphHourglass);
    rotatedPos.xz *= pinch;

    vec4 mvPosition = modelViewMatrix * vec4(rotatedPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Distance-attenuated point size
    gl_PointSize = (aScale * 34.0) * (1.0 / -mvPosition.z);
    
    // Shimmering alpha based on phase and vertical bounds
    vAlpha = 0.55 + 0.45 * sin(uTime * 2.5 + aPhase * 3.0);
  }
`;

const spiceParticleFragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uOpacityMultiplier;

  void main() {
    // Circular soft particle mask
    vec2 uv = gl_PointCoord.xy - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Hot glowing core with soft atmospheric falloff
    float strength = pow(1.0 - (dist * 2.0), 1.8);
    gl_FragColor = vec4(vColor, strength * vAlpha * uOpacityMultiplier);
  }
`;

// ============================================================================
// 1. PROCEDURAL SPICE SAND VORTEX (1,800+ PARTICLES)
// ============================================================================

interface SpiceParticlesProps {
  count?: number;
  themeMode: ThemeViewMode;
}

const SpiceSandVortex: React.FC<SpiceParticlesProps> = ({
  count = 2000,
  themeMode,
}) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, scales, phases, orbitSpeeds, colors } = useMemo(() => {
    const posArray = new Float32Array(count * 3);
    const scaleArray = new Float32Array(count);
    const phaseArray = new Float32Array(count);
    const speedArray = new Float32Array(count);
    const colorArray = new Float32Array(count * 3);

    // Color Palette: Spice Orange, Ochre Gold, Deep Amber, Eyes of Ibad Cyan, and subtle Emerald flecks
    const cSpice = new THREE.Color('#ff5500');
    const cGold = new THREE.Color('#e6c280');
    const cOchre = new THREE.Color('#d87d2b');
    const cIbad = new THREE.Color('#00d2ff');
    const cEmerald = new THREE.Color('#00ff66');

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Distribute in an outer orbital shell + hourglass torus bands
      const radius = 1.45 + Math.pow(Math.random(), 1.3) * 2.1;
      const theta = Math.random() * Math.PI * 2;
      const ySpread = (Math.random() - 0.5) * 3.6;

      posArray[i3] = Math.cos(theta) * radius;
      posArray[i3 + 1] = ySpread;
      posArray[i3 + 2] = Math.sin(theta) * radius;

      scaleArray[i] = 0.4 + Math.random() * 1.4;
      phaseArray[i] = Math.random() * Math.PI * 2;
      speedArray[i] = (0.15 + Math.random() * 0.45) * (i % 2 === 0 ? 1 : 0.7);

      // Assign particle color based on orbital height and probability
      const roll = Math.random();
      let chosenColor = cGold;
      if (roll < 0.45) {
        chosenColor = cSpice;
      } else if (roll < 0.78) {
        chosenColor = cOchre;
      } else if (roll < 0.92) {
        chosenColor = cGold;
      } else if (roll < 0.97) {
        chosenColor = cIbad; // Rare Fremen blue-within-blue spice glint
      } else {
        chosenColor = cEmerald; // Cross-bleed with Doom plasma
      }

      colorArray[i3] = chosenColor.r;
      colorArray[i3 + 1] = chosenColor.g;
      colorArray[i3 + 2] = chosenColor.b;
    }

    return {
      positions: posArray,
      scales: scaleArray,
      phases: phaseArray,
      orbitSpeeds: speedArray,
      colors: colorArray,
    };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: 1.0 },
      uMorphHourglass: { value: 0.6 },
      uOpacityMultiplier: { value: 1.0 },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const material = pointsRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Smoothly interpolate shader parameters based on active themeMode
    const targetHourglass =
      themeMode === 'desert' ? 0.85 : themeMode === 'split' ? 0.5 : 0.15;
    const targetOpacity =
      themeMode === 'desert' ? 1.0 : themeMode === 'split' ? 0.88 : 0.45;
    const targetSpeed = themeMode === 'desert' ? 1.15 : 0.85;

    material.uniforms.uMorphHourglass.value = THREE.MathUtils.lerp(
      material.uniforms.uMorphHourglass.value,
      targetHourglass,
      delta * 2.5
    );
    material.uniforms.uOpacityMultiplier.value = THREE.MathUtils.lerp(
      material.uniforms.uOpacityMultiplier.value,
      targetOpacity,
      delta * 2.5
    );
    material.uniforms.uSpeed.value = THREE.MathUtils.lerp(
      material.uniforms.uSpeed.value,
      targetSpeed,
      delta * 2.0
    );

    // Subtle axial tilt precession
    pointsRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.25) * 0.18;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aOrbitSpeed"
          count={orbitSpeeds.length}
          array={orbitSpeeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aColor"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={spiceParticleVertexShader}
        fragmentShader={spiceParticleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ============================================================================
// 2. CENTRAL HYBRID ORB & MONOLITHIC HOURGLASS CONTAINMENT RINGS
// ============================================================================

interface CoreArtifactProps {
  themeMode: ThemeViewMode;
}

const HybridArtifactCore: React.FC<CoreArtifactProps> = ({ themeMode }) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const innerPlasmaRef = useRef<THREE.Mesh>(null);
  const wireframeCageRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const hourglassFrameRef = useRef<THREE.Group>(null);

  // Target colors for smooth theme transitions
  const emeraldColor = useMemo(() => new THREE.Color('#00ff66'), []);
  const spiceColor = useMemo(() => new THREE.Color('#ff5500'), []);
  const goldColor = useMemo(() => new THREE.Color('#e6c280'), []);
  const titaniumColor = useMemo(() => new THREE.Color('#8a9597'), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // 1. Mouse / Pointer Parallax with smooth damping
    if (rootGroupRef.current) {
      const targetRotY = state.pointer.x * 0.55 + t * 0.18;
      const targetRotX = -state.pointer.y * 0.4 + Math.sin(t * 0.4) * 0.08;

      rootGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        delta * 3.5
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        delta * 3.5
      );
    }

    // 2. Pulsing Core Scale & Geodesic Cage counter-rotation
    if (innerPlasmaRef.current) {
      const pulse = 1.0 + Math.sin(t * 2.8) * 0.055;
      const modeScale =
        themeMode === 'doom' ? 1.12 : themeMode === 'split' ? 1.0 : 0.88;
      innerPlasmaRef.current.scale.setScalar(
        THREE.MathUtils.lerp(
          innerPlasmaRef.current.scale.x,
          pulse * modeScale,
          delta * 4
        )
      );
    }

    if (wireframeCageRef.current) {
      wireframeCageRef.current.rotation.y -= delta * 0.45;
      wireframeCageRef.current.rotation.z += delta * 0.25;
      const cageMat = wireframeCageRef.current
        .material as THREE.MeshStandardMaterial;

      const targetEmissive =
        themeMode === 'desert'
          ? spiceColor
          : themeMode === 'doom'
          ? emeraldColor
          : emeraldColor;
      cageMat.emissive.lerp(targetEmissive, delta * 3);
    }

    // 3. Gimbal Gyroscopic Rings (Arrakis Gold + Latveria Titanium)
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = t * 0.35;
      outerRingRef.current.rotation.y = Math.cos(t * 0.2) * 0.5;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = -t * 0.5;
      innerRingRef.current.rotation.x = Math.sin(t * 0.3) * 0.6;
    }

    // 4. Monolithic Hourglass Chevrons
    if (hourglassFrameRef.current) {
      hourglassFrameRef.current.rotation.y = -t * 0.22;
      const targetScaleY =
        themeMode === 'desert' ? 1.12 : themeMode === 'split' ? 1.0 : 0.85;
      hourglassFrameRef.current.scale.y = THREE.MathUtils.lerp(
        hourglassFrameRef.current.scale.y,
        targetScaleY,
        delta * 3
      );
    }
  });

  // Determine core plasma primary tint based on view mode
  const coreColor =
    themeMode === 'desert'
      ? '#ff6a00'
      : themeMode === 'doom'
      ? '#00ff66'
      : '#00e676';

  const coreEmissive =
    themeMode === 'desert'
      ? '#ff4500'
      : themeMode === 'doom'
      ? '#00ff66'
      : '#00cc55';

  return (
    <group ref={rootGroupRef}>
      <Float
        speed={2.2}
        rotationIntensity={0.35}
        floatIntensity={0.65}
        floatingRange={[-0.18, 0.18]}
      >
        {/* INNER CORE: Distorted Plasma Sphere */}
        <mesh ref={innerPlasmaRef}>
          <icosahedronGeometry args={[0.92, 16]} />
          <MeshDistortMaterial
            color={coreColor}
            emissive={coreEmissive}
            emissiveIntensity={themeMode === 'doom' ? 1.6 : 1.15}
            roughness={0.18}
            metalness={0.85}
            distort={0.38}
            speed={2.6}
          />
        </mesh>

        {/* OUTER CAGE: Latverian Geometric HUD Wireframe */}
        <mesh ref={wireframeCageRef} scale={1.18}>
          <icosahedronGeometry args={[1.0, 2]} />
          <meshStandardMaterial
            color={themeMode === 'desert' ? goldColor : titaniumColor}
            emissive={themeMode === 'desert' ? spiceColor : emeraldColor}
            emissiveIntensity={0.9}
            wireframe
            transparent
            opacity={themeMode === 'desert' ? 0.35 : 0.65}
          />
        </mesh>

        {/* GYROSCOPIC RING 1: Arrakis Imperial Brass/Sand Orbit */}
        <mesh ref={outerRingRef}>
          <torusGeometry args={[1.65, 0.018, 16, 100]} />
          <meshStandardMaterial
            color="#e6c280"
            emissive="#ff5500"
            emissiveIntensity={themeMode === 'doom' ? 0.25 : 0.85}
            metalness={0.9}
            roughness={0.2}
          />
        </mesh>

        {/* GYROSCOPIC RING 2: Battleworld Titanium/Plasma Orbit */}
        <mesh ref={innerRingRef}>
          <torusGeometry args={[1.42, 0.022, 16, 80]} />
          <meshStandardMaterial
            color="#8a9597"
            emissive="#00ff66"
            emissiveIntensity={themeMode === 'desert' ? 0.25 : 0.95}
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* MONOLITHIC HOURGLASS CONES (Top & Bottom Energy Conduits) */}
        <group ref={hourglassFrameRef}>
          {/* Upper Hourglass Funnel (Wireframe Cone inverted) */}
          <mesh position={[0, 1.35, 0]} rotation={[Math.PI, 0, 0]}>
            <coneGeometry args={[1.25, 1.3, 6, 1, true]} />
            <meshStandardMaterial
              color="#e6c280"
              emissive="#d87d2b"
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={themeMode === 'doom' ? 0.18 : 0.42}
            />
          </mesh>

          {/* Lower Hourglass Funnel */}
          <mesh position={[0, -1.35, 0]}>
            <coneGeometry args={[1.25, 1.3, 6, 1, true]} />
            <meshStandardMaterial
              color="#8a9597"
              emissive="#00ff66"
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={themeMode === 'desert' ? 0.18 : 0.42}
            />
          </mesh>
        </group>

        {/* MICRO-SPARKLES AROUND CORE */}
        <Sparkles
          count={65}
          scale={3.4}
          size={2.2}
          speed={0.6}
          opacity={0.75}
          color={themeMode === 'desert' ? '#ff8800' : '#00ff88'}
        />
      </Float>

      {/* SWIRLING SPICE SAND VORTEX (2,000 PROCEDURAL POINTS) */}
      <SpiceSandVortex count={2000} themeMode={themeMode} />
    </group>
  );
};

// ============================================================================
// 3. MAIN EXPORTED HERO SCENE WITH DUAL LIGHTING & WEBGL FALLBACK
// ============================================================================

export const HeroScene: React.FC<HeroSceneProps> = ({
  themeMode = 'split',
  className = '',
}) => {
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check WebGL capability and screen size for mobile optimization
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLSupported(false);
      }
    } catch {
      setWebGLSupported(false);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fallback UI if WebGL is disabled or context is lost on low-memory mobile devices
  if (!webGLSupported || contextLost) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-[#08090c] ${className}`}
        aria-label="Dunesday Monolith Fallback Visual"
      >
        <div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-arrakis-sand/30 bg-gradient-to-br from-arrakis-spice/20 via-zinc-900 to-latveria-plasma/20 shadow-dual-glow">
          <div className="h-44 w-44 animate-pulse rounded-full border border-latveria-plasma/40 bg-gradient-to-tr from-arrakis-ochre/30 to-latveria-emerald/30 blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <span className="font-mono text-[10px] tracking-[0.25em] text-arrakis-sand/80 uppercase">
              TELEMETRY // LOW-POWER MODE
            </span>
            <span className="mt-1 font-serif text-sm font-bold tracking-widest text-white">
              ARRAKIS × LATVERIA
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Dynamic light intensities based on active themeMode
  const leftAmberIntensity =
    themeMode === 'desert' ? 4.5 : themeMode === 'split' ? 3.2 : 1.2;
  const rightEmeraldIntensity =
    themeMode === 'doom' ? 4.5 : themeMode === 'split' ? 3.2 : 1.2;

  return (
    <div
      className={`relative w-full h-full min-h-[380px] select-none ${className}`}
    >
      <Canvas
        dpr={[1, isMobile ? 1.5 : 2]}
        camera={{ position: [0, 0, 5.2], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          const domElement = gl.domElement;
          domElement.addEventListener(
            'webglcontextlost',
            (event) => {
              event.preventDefault();
              setContextLost(true);
            },
            false
          );
        }}
      >
        {/* Base Ambient Fill */}
        <ambientLight intensity={0.45} color="#1a1d24" />

        {/* LEFT LIGHT: Arrakis Spice / Amber Point & Spot Light */}
        <pointLight
          position={[-4.5, 2.2, 3.0]}
          intensity={leftAmberIntensity}
          color="#ff6600"
          distance={15}
          decay={1.5}
        />
        <pointLight
          position={[-3.0, -2.5, -2.0]}
          intensity={leftAmberIntensity * 0.5}
          color="#e6c280"
          distance={12}
        />

        {/* RIGHT LIGHT: Latveria Victor von Doom Emerald Plasma Light */}
        <pointLight
          position={[4.5, 2.2, 3.0]}
          intensity={rightEmeraldIntensity}
          color="#00ff66"
          distance={15}
          decay={1.5}
        />
        <pointLight
          position={[3.0, -2.5, -2.0]}
          intensity={rightEmeraldIntensity * 0.6}
          color="#00d2ff"
          distance={12}
        />

        {/* Top Rim Light for Metallic Separation */}
        <directionalLight
          position={[0, 6, 2]}
          intensity={0.9}
          color="#ffffff"
        />

        <Suspense fallback={null}>
          <HybridArtifactCore themeMode={themeMode} />
        </Suspense>
      </Canvas>

      {/* Subtle Vignette & Telemetry Corner Accents */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#08090c] via-transparent to-transparent opacity-70" />
    </div>
  );
};

export default HeroScene;