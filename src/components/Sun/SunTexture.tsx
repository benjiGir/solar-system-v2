import { useState, useRef, useMemo } from 'react';
import { 
  WebGLCubeRenderTarget, 
  RGBAFormat, 
  LinearMipmapLinearFilter, 
  sRGBEncoding, 
  ShaderMaterial, 
  CubeCamera, 
  Vector4, 
  DoubleSide } from 'three';
import { sunShaderVertex } from './shader/sunShader.vertex';
import { sunShaderFragment } from './shader/sunShader.fragment';
import { RootState, useFrame } from '@react-three/fiber';
import { useSunStore } from '../../stores/sunStore';
import { TSunShaderProps } from './sun.type';

function SunTexture(): JSX.Element {
  const setTexture = useSunStore((state) => state.setTexture);

  const [cubeRenderTarget] = useState(
    new WebGLCubeRenderTarget(1024, {
      format: RGBAFormat,
      generateMipmaps: true,
      minFilter: LinearMipmapLinearFilter,
      encoding: sRGBEncoding,
    })
  );

  const sunRef = useRef<ShaderMaterial>(null);
  const cameraRef = useRef<CubeCamera>(null);

  const sunShaderData = useMemo<TSunShaderProps>(() => ({
    uniforms: {
      time: { value: 0 },
      resolution: { value: new Vector4() },
      envMap: { value: cubeRenderTarget.texture },
    },
    sunShaderVertex,
    sunShaderFragment,
  }), [cubeRenderTarget]);

  useFrame(({clock, gl, scene}: RootState) => {
    const time = clock.getElapsedTime();
    const texture = cubeRenderTarget.texture;

    if (sunRef.current) {
      sunRef.current.uniforms.time.value = time;
    }
    
    if (cameraRef.current) {
      cameraRef.current.update(gl, scene);
    }
    setTexture(texture);
  });
  
  return (
    <>
      <cubeCamera ref={cameraRef} args={[0.1, 10, cubeRenderTarget]} />
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry attach="geometry" args={[5, 64, 64]} />
        <shaderMaterial
          ref={sunRef}
          attach="material"
          uniforms={sunShaderData.uniforms}
          vertexShader={sunShaderData.sunShaderVertex}
          fragmentShader={sunShaderData.sunShaderFragment}
          extensions={{
            derivatives: true,
            fragDepth: false,
            drawBuffers: false,
            shaderTextureLOD: false,
          }}
          side={DoubleSide}
        />
      </mesh>
    </>
  )
}

export default SunTexture