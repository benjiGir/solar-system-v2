import { Canvas } from '@react-three/fiber';

function SolarSystemScene() {
  return (
    <Canvas camera={{ position: [0, 100, 250], fov: 80, near: 0.1, far: 10000}}>
      <pointLight position={[0, 0, 0]} intensity={2.5}  color={0xffdcb4} />
      
    </Canvas>
  )
}

export default SolarSystemScene