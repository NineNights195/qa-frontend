import React, { useState } from 'react';

/**
 * A form component for creating new answers
 * @param {Object} props - Component props
 * @param {string} props.questionId - The ID of the question to answer
 * @param {Function} props.onSubmit - Function to call when the form is submitted
 * @param {Function} props.onCancel - Function to call when the form is cancelled
 * @returns {JSX.Element} CreateAnswerForm component
 */
const CreateAnswerForm = ({ questionId, onSubmit, onCancel }) => {
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit({
        question_id: String(questionId),
        answer: answer.trim()
      });
      setAnswer('');
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
          Your Answer
        </label>
        <textarea
          id="answer"
          name="answer"
          rows={4}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder="Enter your answer here..."
          required
        />
      </div>
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Answer'}
        </button>
      </div>
    </form>
  );
};

export default CreateAnswerForm; 