import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [session, setSession] = useState();
  const [lapsPerDriver, setLapsperDriver] = useState();
  const [drivers, setDrivers] = useState();

  useEffect(() => {
    getF1Data();
  }, []);

  const getF1Data = async () => {
    const session = await fetch(
      'https://api.openf1.org/v1/sessions?country_name=Bahrain&session_name=Practice 1&year=2024'
    );
    const sessionToJson = await session.json();

    const drivers = await fetch(
      `https://api.openf1.org/v1/drivers?session_key=${sessionToJson[0].session_key}`
    );
    const driversToJson = await drivers.json();

    const lapsPerDriver = await fetch(
      `https://api.openf1.org/v1/laps?session_key=${sessionToJson[0].session_key}&driver_number=1`
    );
    const lapsPerDriverToJson = await lapsPerDriver.json();

    setSession(sessionToJson);
    setDrivers(driversToJson);
    setLapsperDriver(lapsPerDriverToJson);

    console.log('-----------');
    console.log('sessionToJson', sessionToJson);
    console.log('driversToJson', driversToJson);
    console.log('lapsPerDriverToJson', lapsPerDriverToJson);
    console.log('-----------');
  };

  return (
    <div className="App">
      {drivers && <p> drivers successfully fetched </p>}

      {session && <p> session successfully fetched </p>}

      {lapsPerDriver && <p> lapsPerDriver successfully fetched </p>}
    </div>
  );
}

export default App;
