import { useNavigate } from 'react-router-dom';

import style from './style/homepage.module.css';

function Homepage(): JSX.Element {
  const navigate = useNavigate();

  const navigateToExplore = () => {
    navigate('/');
  }

  return (
    <main className={style.container}>
      <h1>The Solar System</h1>
      <div className={style.menu}>
        <p className={style.text}>Explore the solar system, click on the button and let&apos;s go to adventure</p>
        <button className={style.button} onClick={navigateToExplore}>Explore</button>
      </div>
    </main>
  )
}

export default Homepage