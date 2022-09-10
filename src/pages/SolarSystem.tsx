import { Suspense, lazy, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { FlyControls } from '@react-three/drei';
import { DirectionalLight } from 'three';


const SceneSolarSystem = lazy(() => import('../components/SceneSolarSystem/SceneSolarSystem'));
const Sun = lazy(() => import('../components/Sun/Sun'));

function SolarSystem() {
  const ref = useRef<DirectionalLight>(null);

  return (
    <Suspense fallback={null}>
      <Canvas shadows camera={{ position: [0, 100, 250], fov: 80, near: 0.1, far: 10000}}>
        <pointLight 
          position={[0, 0, 0]}
        />
        <directionalLight
          ref={ref}
          position={[0, 0, 0]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={1000}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <Suspense fallback={null}>
          <Sun />
        </Suspense>
        <SceneSolarSystem />
        <FlyControls 
          autoForward={false} 
          dragToLook={true} 
          rollSpeed={.5} 
          movementSpeed={50.0} 
          rotation={[Math.PI, Math.PI, Math.PI]}/>
      </Canvas>
    </Suspense>
  )
}

export default SolarSystem
