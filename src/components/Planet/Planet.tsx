import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { DoubleSide, Mesh, TextureLoader } from 'three';
import { TPlanet, TEarth } from '../../types/planet.type';
import Ring from '../Ring/Ring';

type TProps = {
  planet: TPlanet;
}


function Planet({planet}: TProps): JSX.Element {
  const planetRef = useRef<Mesh>(null);
    
  useFrame(({clock}) => {
    if (planetRef.current) {
      const time = ((clock.getElapsedTime() * planet.orbitalSpeed) % 360) * (Math.PI / 180);
      const x = ((planet.distFromCenter * 4) * Math.sin(time));
      const z = ((planet.distFromCenter * 3) * Math.cos(time));
      planetRef.current.position.set(x, 0, z);
      planetRef.current.rotation.y += planet.spinSpeed;
    }
  });
  
  return (
    <>
      <mesh ref={planetRef} receiveShadow={true} castShadow={true}>
        <sphereGeometry attach="geometry" args={[planet.diameter, 64, 64]} />
        {planet.name === 'Earth' ? (
          <>
          <meshPhongMaterial 
            attach="material" 
            specularMap={useLoader(TextureLoader, (planet.texture as TEarth).specularMap)} />
          <meshStandardMaterial 
            attach="material" 
            map={useLoader(TextureLoader, (planet.texture as TEarth).colorMap)}
            normalMap={useLoader(TextureLoader, (planet.texture as TEarth).normalMap)} />
            </>
        ) : (
          <meshStandardMaterial shadowSide={DoubleSide} attach="material" map={useLoader(TextureLoader, planet.texture as string)} />
        )}
      </mesh>
      {planet.name === 'Saturn' ? (
        <Ring planetRef={planetRef} />
      ) : null}
    </>
  )
}

export default Planet