import { Suspense, lazy } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { FlyControls } from '@react-three/drei';
import Loader  from '../components/Loader/Loader';
import { Vector3 } from 'three';


const SceneSolarSystem = lazy(() => import('../components/SceneSolarSystem/SceneSolarSystem'));
const Sun = lazy(() => import('../components/Sun/Sun'));

function SolarSystem() {

  const MoveCamera = () => {
    let cameraMoved = false;
    const vec = new Vector3();

    useFrame(({camera}) => {
      if (!cameraMoved) {
        camera.position.lerp(vec.set(0, 50, 250), 0.01);
      }
      if (camera.position.distanceTo(vec) < 1) {
        cameraMoved = true;
      }
    });
    return null;
  };

  return (
    <Canvas shadows camera={{ position: [0, 0, 10], fov: 80, near: 0.1, far: 10000}}>
      <Suspense fallback={<Loader/>}>
        <pointLight 
          position={[0, 0, 0]}
        />  
        <Suspense fallback={null}>
          <Sun />
        </Suspense>
        <SceneSolarSystem />
        <MoveCamera />
        <FlyControls 
          autoForward={false} 
          dragToLook={true} 
          rollSpeed={.5} 
          movementSpeed={50.0} 
          rotation={[Math.PI, Math.PI, Math.PI]}/>
      </Suspense>
    </Canvas>
  )
}

export default SolarSystem
