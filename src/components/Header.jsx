// import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-sky-500 to-blue-500 text-white p-4 shadow-lg">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h2 className="font-bold text-3xl">Weather App</h2>
        <nav>
          <ul className="flex gap-8 text-lg">
            <li>
              <a
                href="/"
                className="hover:text-gray-200 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-200 transition duration-300"
              >
                Search
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;