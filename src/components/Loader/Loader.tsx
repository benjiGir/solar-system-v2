import { useRef, useMemo } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';

import { vertexShader } from './shader/vertexShader';
import { fragmentShader } from './shader/fragmentShader';

type TLoaderShaderData = {
  uniforms: {
    iTime: { value: number };
    iResolution: { value: Vector3 };
  },
  vertexShader: string,
  fragmentShader: string,
};

function Loader() {
  const { viewport } = useThree();
  const loaderRef = useRef<Mesh>(null);

  const loaderShaderData = useMemo<TLoaderShaderData>(() => ({
    uniforms: {
      iTime: { value: 0 },
      iResolution: { value: new Vector3(0.1, 0.1, 0) },
    },
    vertexShader,
    fragmentShader,
  }), []);

  useFrame(({ clock }) => {
    loaderShaderData.uniforms.iTime.value = clock.getElapsedTime() ;
  });

  return (
    <Plane ref={loaderRef} position={[0, 0, 0]} scale={[viewport.width, viewport.height,0]}>
      <shaderMaterial  {...loaderShaderData} />
    </Plane>
  )
}

export default Loader