import { usePlanetsDataStore } from '../../stores/planetDataStore'
import Planet from '../Planet/Planet';

function SceneSolarSystem() {
  const planetsData = usePlanetsDataStore(state => state.planetsData);

  return (
    <>
      {
        planetsData.map((planet) => {
          return ( <Planet key={planet.id} planet={planet} /> )
        }
      )}
    </>
  )
}

export default SceneSolarSystem