import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-white">404</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-8 px-4 py-2 text-white bg-blue-500 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
