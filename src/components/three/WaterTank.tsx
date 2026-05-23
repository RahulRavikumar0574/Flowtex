import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function TankMesh() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.35
    }
  })

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.4}>
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[1.1, 1.15, 2.4, 48]} />
          <MeshTransmissionMaterial
            backside
            samples={4}
            thickness={0.8}
            chromaticAberration={0.06}
            anisotropy={0.3}
            distortion={0.2}
            distortionScale={0.4}
            temporalDistortion={0.1}
            color="#4da3ff"
            attenuationColor="#1e5a9e"
            attenuationDistance={2}
          />
        </mesh>
        <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[0.95, 1.05, 0.25, 48]} />
          <meshStandardMaterial color="#0d2847" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -1.1, 0]}>
          <cylinderGeometry args={[1.05, 1.1, 0.15, 48]} />
          <meshStandardMaterial color="#0a1628" metalness={0.5} roughness={0.4} />
        </mesh>
      </Float>
    </group>
  )
}

export function WaterTank3D({ className = '' }: { className?: string }) {
  return (
    <div className={`h-full w-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 5], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} color="#e8f4fc" />
        <pointLight position={[-3, 2, 2]} intensity={0.8} color="#4da3ff" />
        <Environment preset="city" />
        <TankMesh />
      </Canvas>
    </div>
  )
}
