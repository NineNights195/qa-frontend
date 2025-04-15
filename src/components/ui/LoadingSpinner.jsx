import React from 'react';

/**
 * A reusable loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.message - Optional message to display below the spinner
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default LoadingSpinner; 