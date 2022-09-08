import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { FlyControls } from '@react-three/drei';


const SceneSolarSystem = lazy(() => import('../components/SceneSolarSystem/SceneSolarSystem'));
const Sun = lazy(() => import('../components/Sun/Sun'));

function SolarSystem() {
  return (
    <Suspense fallback={null}>
      <Canvas camera={{ position: [0, 100, 250], fov: 80, near: 0.1, far: 10000}}>
        <pointLight position={[0, 0, 0]} />
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
