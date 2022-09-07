import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';


const SceneSolarSystem = lazy(() => import('../components/SceneSolarSystem/SceneSolarSystem'));

function SolarSystem() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 10, 25], fov: 80, near: 0.1, far: 10000}}>
        <ambientLight />
        <SceneSolarSystem />
      </Canvas>
    </Suspense>
  )
}

export default SolarSystem