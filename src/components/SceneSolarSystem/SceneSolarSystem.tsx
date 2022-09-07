import React from 'react'

function SceneSolarSystem() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default SceneSolarSystem