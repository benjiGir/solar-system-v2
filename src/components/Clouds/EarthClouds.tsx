import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh, TextureLoader, DoubleSide } from "three";

type TEarthCloudsProps = {
  texture: string;
};

function EarthClouds({ texture }: TEarthCloudsProps): JSX.Element {
  const cloudRef = useRef<Mesh>(null);
  const cloudTexture = useLoader(TextureLoader, texture);

  useFrame(() => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.0008;
    }
  });

  return (
    <mesh ref={cloudRef}>
      <sphereGeometry args={[1.008, 64, 64]} attach='geometry'/>
      <meshPhongMaterial alphaMap={cloudTexture} transparent={true} attach='material' side={DoubleSide}/>
    </mesh>
  )
}

export default EarthClouds