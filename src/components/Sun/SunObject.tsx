import { useRef, useMemo } from 'react';
import { Texture, ShaderMaterial, Vector4, Vector2, DoubleSide } from 'three';

import { sunShaderTextureVertex } from './shader/sunShaderTexture.vertex';
import { sunShaderTextureFragment } from './shader/sunShaderTexture.fragment';
import { RootState, useFrame } from '@react-three/fiber';
import { useSunStore } from '../../stores/sunStore';

interface ISunShaderTextureProps {
  uniforms: {
    time: { value: number };
    uPerlin: { value: Texture | null };
    resolution: { value: Vector4 };
    uvRate1: { value: Vector2 };
  };
  sunShaderTextureVertex: string;
  sunShaderTextureFragment: string;
}

function SunObject(): JSX.Element {
  const texture = useSunStore((state) => state.texture);

  const meshRef = useRef<ShaderMaterial>(null);

  const sunObjectShaderData = useMemo<ISunShaderTextureProps>(() => ({
    uniforms: {
      time: { value: 0 },
      uPerlin: { value: null },
      resolution: { value: new Vector4() },
      uvRate1: { value: new Vector2(1, 1)}
    },
    sunShaderTextureVertex,
    sunShaderTextureFragment,
  }), []);

  useFrame(({clock}: RootState) => {
    const time = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.uniforms.time.value = time;
      meshRef.current.uniforms.uPerlin.value = texture;
    }
  });

  return (
    <>
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[40, 64, 64]} />
        <shaderMaterial
          ref={meshRef}
          attach="material"
          uniforms={sunObjectShaderData.uniforms}
          vertexShader={sunObjectShaderData.sunShaderTextureVertex}
          fragmentShader={sunObjectShaderData.sunShaderTextureFragment}
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

export default SunObject