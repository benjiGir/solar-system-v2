import { Canvas } from '@react-three/fiber';
import PlaneHomePageBackground from './PlaneHomePageBackground';

function SceneHomePageBackground() {
  return (
    <Canvas style={{
      height: '100vh',
      width: '100vw',
      position: 'absolute',
      pointerEvents: 'none',
    }}>
      <PlaneHomePageBackground />
    </Canvas>
  )
}

export default SceneHomePageBackground