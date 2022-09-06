import { Canvas } from '@react-three/fiber';
import PlaneHomePageBackground from './PlaneHomePageBackground';
import { Html } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

import style from '../../pages/style/homepage.module.css';

function SceneHomePageBackground() {
  const navigate = useNavigate();

  const navigateToExplore = () => {
    navigate('/');
  }

  return (
    <Canvas style={{
      height: '100vh',
      width: '100vw',
      position: 'absolute',
    }}>
      <PlaneHomePageBackground />
      <Html center>
        <main className={style.container}>
          <h1>The Solar System</h1>
          <div className={style.menu}>
            <p className={style.text}>Explore the solar system, click on the button and let&apos;s go to adventure</p>
            <button className={style.button} onClick={navigateToExplore}>Explore</button>
          </div>
        </main>
      </Html>
    </Canvas>
  )
}

export default SceneHomePageBackground