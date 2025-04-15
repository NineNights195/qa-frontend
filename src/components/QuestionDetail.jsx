import React, { useState } from 'react';
import { LoadingSpinner, ErrorMessage, Modal } from './ui';
import CreateAnswerForm from './CreateAnswerForm';
import { createAnswer } from '../api/questionApi';

/**
 * A component to display question details and answers
 * @param {Object} props - Component props
 * @param {Object} props.question - The question data
 * @param {boolean} props.loading - Whether the question is loading
 * @param {string} props.error - Error message if any
 * @param {Function} props.onAnswerCreated - Function to call when an answer is created
 * @returns {JSX.Element} QuestionDetail component
 */
const QuestionDetail = ({ question, loading, error, onAnswerCreated }) => {
  const [isAnswerFormOpen, setIsAnswerFormOpen] = useState(false);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [answerError, setAnswerError] = useState(null);

  const handleOpenAnswerForm = () => {
    setIsAnswerFormOpen(true);
    setAnswerError(null);
  };

  const handleCloseAnswerForm = () => {
    setIsAnswerFormOpen(false);
    setAnswerError(null);
  };

  const handleSubmitAnswer = async (answerData) => {
    setAnswerLoading(true);
    setAnswerError(null);
    
    try {
      await createAnswer(answerData);
      setAnswerLoading(false);
      setIsAnswerFormOpen(false);
      if (onAnswerCreated) {
        onAnswerCreated();
      }
    } catch (err) {
      setAnswerError('Failed to submit answer. Please try again later.');
      setAnswerLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading question details..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!question) {
    return <p className="text-gray-500">No question details available.</p>;
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{question.title}</h3>
        <p className="text-gray-700 mb-4">{question.question}</p>
        <div className="text-sm text-gray-500">
          <span>Category: {question.category?.category || 'Unknown'}</span>
          <span className="mx-2">|</span>
          <span>Created: {new Date(question.CreatedAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-md font-medium text-gray-900">Answers</h4>
          <button
            onClick={handleOpenAnswerForm}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Answer
          </button>
        </div>
        
        {question.answers && question.answers.length > 0 ? (
          <div className="space-y-4">
            {question.answers.map((answer) => (
              <div key={answer.ID} className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-700">{answer.answer}</p>
                <div className="text-xs text-gray-500 mt-2">
                  <span>Posted: {new Date(answer.CreatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No answers yet.</p>
        )}
      </div>

      {/* Answer Form Modal */}
      <Modal
        isOpen={isAnswerFormOpen}
        onClose={handleCloseAnswerForm}
        title="Add Your Answer"
      >
        {answerError && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
            {answerError}
          </div>
        )}
        <CreateAnswerForm
          questionId={question.ID}
          onSubmit={handleSubmitAnswer}
          onCancel={handleCloseAnswerForm}
        />
      </Modal>
    </div>
  );
};

export default QuestionDetail; 