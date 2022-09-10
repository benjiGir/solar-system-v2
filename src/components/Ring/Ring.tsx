import { useMemo, useRef, RefObject } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader, Texture, DoubleSide } from 'three';

import { ringVertexShader } from './shader/ring.vertex';
import { ringFragmentShader } from './shader/ring.fragment';

type TRingProps = {
  planetRef: RefObject<Mesh>;
};

type TRingShaderData = {
  uniforms: {
    utexture: { value: Texture | null };
    innerRadius: { value: number };
    outerRadius: { value: number };
  };
  ringVertexShader: string;
  ringFragmentShader: string;
};

function Ring({ planetRef }: TRingProps): JSX.Element {
  const ringRef = useRef<Mesh>(null);
  const ringTexture = useLoader(TextureLoader, 'src/assets/Saturn/8k_saturn_ring_alpha.png');

  const ringShaderData = useMemo<TRingShaderData>(() => ({
    uniforms: {
      utexture: { value: ringTexture },
      innerRadius: { value: 12 },
      outerRadius: { value: 20 },
    },
    ringVertexShader,
    ringFragmentShader,
  }), []);

  useFrame(() => {
    if (ringRef.current && planetRef.current) {
      ringRef.current.position.x = planetRef.current.position.x;
      ringRef.current.position.z = planetRef.current.position.z;
    }
  });

  return (
    <mesh
      ref={ringRef}
      rotation={[Math.PI / 2, Math.PI / 8, 0]}
      receiveShadow={true}
      castShadow={true}
    >
      <ringBufferGeometry attach='geometry' args={[12, 20, 64]} />
      <shaderMaterial
        uniforms={ringShaderData.uniforms}
        vertexShader={ringShaderData.ringVertexShader}
        fragmentShader={ringShaderData.ringFragmentShader}
        transparent
        side={DoubleSide}
        extensions={{
          derivatives: true,
          fragDepth: false,
          drawBuffers: false,
          shaderTextureLOD: false,
        }}
      />
    </mesh>
  )
}

export default Ring