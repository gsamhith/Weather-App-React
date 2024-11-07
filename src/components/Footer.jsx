// import React from "react";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="w-full text-center py-4 bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-inner">
      <div className="text-lg">
        &copy; {year} Weather App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;