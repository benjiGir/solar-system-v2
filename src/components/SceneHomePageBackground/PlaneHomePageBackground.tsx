import { useRef, useMemo } from 'react';
import { Mesh, Clock, PerspectiveCamera, Vector2, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import { vertexShader} from './shader/vertexShader';
import { fragmentShader } from './shader/fragmentShader';

function PlaneHomePageBackground() {
  const ref = useRef<Mesh>(null)
  const { viewport } = useThree();

  const shaderData = useMemo(() => ({
    uniforms: {
      iTime :{ value: 0 },
      iResolution: { value: new Vector3(viewport.width, viewport.height, 1) },
      iMouse: { value: new Vector2(0, 0) },
    },
    vertexShader,
    fragmentShader,
  }), []);

  useFrame(({ clock, mouse }: { clock: Clock, mouse: Vector2 }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    shaderData.uniforms.iMouse.value = new Vector2(x, y);
    shaderData.uniforms.iTime.value = clock.getElapsedTime() / 1000;
  });

  return (
    <Plane ref={ref} scale={[20,10,10]}>
      <shaderMaterial {...shaderData}/>
    </Plane>
  )
}

export default PlaneHomePageBackground