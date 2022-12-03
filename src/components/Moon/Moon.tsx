import { useFrame, useLoader } from "@react-three/fiber";
import { RefObject, useRef } from "react";
import { Mesh, TextureLoader } from "three";
import { TMoon } from "../../types/planet.type";

type TMoonProps = {
  moon: TMoon;
  planetRef: RefObject<Mesh>;
};

let moonPositionIndex = 0;

function Moon({ moon, planetRef }: TMoonProps): JSX.Element {
  const moonRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (moonRef.current && planetRef.current) {
      const time = ((clock.getElapsedTime() * moon.orbitalSpeed) % 360) * (Math.PI / 180) / 100;
      const x = ((moon.distFromCenter) * Math.sin(time * moonPositionIndex++)) + planetRef.current.position.x;
      const z = 1.2 * ((moon.distFromCenter) * Math.cos(time * moonPositionIndex)) + planetRef.current.position.z;
      moonRef.current.position.set(x, 0, z);
      moonRef.current.rotation.y += moon.spinSpeed;
    }
  });

  return (
    <>
      <mesh ref={moonRef} receiveShadow={true} castShadow={true}>
        <sphereGeometry attach="geometry" args={[moon.diameter, 64, 64]} />
        <meshStandardMaterial attach="material" map={useLoader(TextureLoader, moon.texture as string)} />
      </mesh>
    </>
  )
}

export default Moon;
