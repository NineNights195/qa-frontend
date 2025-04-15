import { useState, useEffect } from 'react';
import { fetchQuestions, fetchQuestionById, createQuestion } from '../api/questionApi';
import { QuestionCard, LoadingSpinner, ErrorMessage, Modal } from '../components/ui';
import QuestionDetail from '../components/QuestionDetail';
import CreateQuestionForm from '../components/CreateQuestionForm';

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [questionDetail, setQuestionDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  // Create question modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch questions. Please try again later.');
        setLoading(false);
      }
    };

    getQuestions();
  }, []);

  const handleQuestionClick = async (id) => {
    setSelectedQuestionId(id);
    setIsModalOpen(true);
    setDetailLoading(true);
    setDetailError(null);
    
    try {
      const data = await fetchQuestionById(id);
      setQuestionDetail(data);
      setDetailLoading(false);
    } catch (err) {
      setDetailError('Failed to fetch question details. Please try again later.');
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedQuestionId(null);
    setQuestionDetail(null);
  };

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
    setCreateError(null);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateError(null);
  };

  const handleCreateQuestion = async (formData) => {
    setCreateLoading(true);
    setCreateError(null);
    
    try {
      await createQuestion(formData);
      // Refresh the questions list
      const updatedQuestions = await fetchQuestions();
      setQuestions(updatedQuestions);
      setCreateLoading(false);
      setIsCreateModalOpen(false);
    } catch (err) {
      setCreateError('Failed to create question. Please try again later.');
      setCreateLoading(false);
    }
  };

  const handleAnswerCreated = async () => {
    // Refresh the question details
    if (selectedQuestionId) {
      setDetailLoading(true);
      setDetailError(null);
      
      try {
        const data = await fetchQuestionById(selectedQuestionId);
        setQuestionDetail(data);
        setDetailLoading(false);
      } catch (err) {
        setDetailError('Failed to refresh question details. Please try again later.');
        setDetailLoading(false);
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading questions..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Questions</h1>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Question
        </button>
      </div>
      
      {questions.length === 0 ? (
        <p className="text-gray-500">No questions found.</p>
      ) : (
        <div className="grid gap-4">
          {questions.map((question) => (
            <QuestionCard
              key={question.id}
              id={question.id}
              title={question.title}
              question={question.question}
              category={question.category}
              createdAt={question.created_at}
              onClick={handleQuestionClick}
            />
          ))}
        </div>
      )}

      {/* Question Detail Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
        title="Question Details"
      >
        <QuestionDetail 
          question={questionDetail}
          loading={detailLoading}
          error={detailError}
          onAnswerCreated={handleAnswerCreated}
        />
      </Modal>

      {/* Create Question Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        title="Create New Question"
      >
        {createError && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
            {createError}
          </div>
        )}
        <CreateQuestionForm
          onSubmit={handleCreateQuestion}
          onCancel={handleCloseCreateModal}
        />
      </Modal>
    </div>
  );
};

export default QuestionsPage; 