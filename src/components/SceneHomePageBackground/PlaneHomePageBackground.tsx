import { useRef, useMemo } from 'react';
import { Mesh, Clock, Vector2, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { vertexShader} from './shader/vertexShader';
import { fragmentShader } from './shader/fragmentShader';

interface IPlaneShaderProps {
  uniforms: {
    iTime: { value: number };
    iResolution: { value: Vector3 };
    iMouse: { value: Vector2 };
  };
  vertexShader: string;
  fragmentShader: string;
}

function PlaneHomePageBackground() {
  const ref = useRef<Mesh>(null)
  const { viewport} = useThree();

  const shaderData = useMemo<IPlaneShaderProps>(() => ({
    uniforms: {
      iTime :{ value: 0 },
      iResolution: { value: new Vector3(2, 5, 0) },
      iMouse: { value: new Vector2(0, 0) },
    },
    vertexShader,
    fragmentShader,
  }), []);

  useFrame(({ clock }: { clock: Clock }) => {
    shaderData.uniforms.iTime.value = clock.getElapsedTime() / 10; 
  });

  return (
    <Plane ref={ref} scale={[viewport.width, viewport.height, 2]}>
      <shaderMaterial {...shaderData}/>
    </Plane>
  )
}

export default PlaneHomePageBackground