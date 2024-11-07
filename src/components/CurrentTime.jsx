import { useEffect, useState } from "react";

const CurrentTime = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, []);

  return (
    <div
      className="p-4 flex justify-center items-center"
      style={{
        background: "linear-gradient(135deg, #0072ff, #00c6ff)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1 className="text-6xl font-bold text-white drop-shadow-lg transition-transform duration-300 ease-in-out">
        {time}
      </h1>
    </div>
  );
};

export default CurrentTime;
