import React, { useState } from "react";
import Modal from "react-modal";

// Set the app element to avoid accessibility issues
Modal.setAppElement("#root");

const WeatherCard = ({
  city,
  weather,
  temperature,
  humidity,
  lastUpdated,
  iconUrl,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cityDetails, setCityDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch detailed city weather data
  const fetchCityDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/weather/${city}`);
      const data = await response.json();
      setCityDetails(data);
    } catch (error) {
      console.error("Error fetching city weather details:", error);
    }
    setLoading(false);
  };

  // Function to open the modal
  const openModal = () => {
    fetchCityDetails(); // Fetch city details when modal is opened
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
    setCityDetails(null); // Reset city details when modal is closed
  };

  return (
    <>
      {/* Weather Card */}
      <div
        onClick={openModal}
        className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 p-4 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        <h1 className="font-bold text-2xl text-white text-center mb-4">
          {city}
        </h1>
        <div className="flex flex-col items-center justify-center">
          {iconUrl && (
            <img src={iconUrl} alt="weather icon" className="w-20 h-20 mb-3" />
          )}
          <h2 className="font-semibold text-lg text-white mb-2">{weather}</h2>
          <h3 className="text-white text-lg mb-1">Temp: {temperature}°C</h3>
          <h4 className="text-white text-lg mb-4">Humidity: {humidity}%</h4>
          {lastUpdated && (
            <p className="text-white text-sm">
              Last Updated: {lastUpdated}
            </p>
          )}
        </div>
      </div>

      {/* Modal for displaying detailed city information */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="City Weather Details"
        className="modal-content bg-gradient-to-b from-blue-800 to-blue-600 text-white rounded-lg shadow-2xl p-8 max-w-7xl h-[85vh] mx-auto mt-10 transition-opacity duration-500 overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 transition-opacity duration-500"
      >
        {loading ? (
          <p className="text-center text-xl">Loading...</p>
        ) : cityDetails ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                {cityDetails.city} Weather Details
              </h2>
              <button
                className="text-red-400 font-bold text-3xl hover:text-red-600 transition duration-300"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {cityDetails.forecasts.map((forecast, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center bg-blue-500 p-4 rounded-lg shadow-lg"
                >
                  <p className="font-semibold text-lg mb-2">{forecast.date}</p>
                  <img
                    src={forecast.iconUrl}
                    alt="weather icon"
                    className="w-16 h-16 mb-2"
                  />
                  <p className="text-lg mb-2">{forecast.weather}</p>
                  <p className="text-lg font-bold">{forecast.temperature}°C</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center">No details available.</p>
        )}
      </Modal>
    </>
  );
};

export default WeatherCard;
