// import React from 'react';
import Header from "./components/Header";
import CurrentTime from "./components/CurrentTime";
import WeatherChart from "./components/WeatherChart";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <CurrentTime />
      <WeatherChart />
      <Footer />
    </>
  );
}

export default App;
