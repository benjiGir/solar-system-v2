import { useRef, useMemo } from 'react';
import { Mesh, Clock, PerspectiveCamera, Vector2 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { vertexShader} from './shader/vertexShader';
import { fragmentShader } from './shader/fragmentShader';

function PlaneHomePageBackground() {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree();

  const shaderData = useMemo(() => ({
    uniforms: {
      time :{ value: 0 },
      aspect: { value: 0.5 },
      mouse: { value: new Vector2(0, 0) },
    },
    vertexShader,
    fragmentShader,
  }), []);

  useFrame((state) => {
    const x = (state.mouse.x * viewport.width) / 2;
    const y = (state.mouse.y * viewport.height) / 2;
    shaderData.uniforms.mouse.value = new Vector2(x, y);
  })

  useFrame(({ clock }: { clock: Clock }) => {
    shaderData.uniforms.time.value = clock.getElapsedTime() / 1000;
  });

  return (
    <Plane ref={ref} scale={[20,10,10]}>
      <shaderMaterial {...shaderData}/>
    </Plane>
  )
}

export default PlaneHomePageBackground