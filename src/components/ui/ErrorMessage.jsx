import React from 'react';

/**
 * A reusable error message component
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @returns {JSX.Element} ErrorMessage component
 */
const ErrorMessage = ({ message }) => {
  return (
    <div className="text-red-500 text-center p-4 bg-red-50 rounded-md">
      <p className="font-medium">Error</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage; 