import React from 'react';

/**
 * A reusable card component for displaying a question
 * @param {Object} props - Component props
 * @param {string} props.id - The ID of the question
 * @param {string} props.title - The title of the question
 * @param {string} props.question - The content of the question
 * @param {string} props.category - The category of the question
 * @param {string} props.createdAt - The creation date of the question
 * @param {Function} props.onClick - Function to call when the card is clicked
 * @returns {JSX.Element} QuestionCard component
 */
const QuestionCard = ({ id, title, question, category, createdAt, onClick }) => {
  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(id)}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{question}</p>
      <div className="text-sm text-gray-500">
        <span>Category: {category}</span>
        <span className="mx-2">|</span>
        <span>Created: {new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default QuestionCard; 