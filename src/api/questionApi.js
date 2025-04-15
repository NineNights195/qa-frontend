import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Fetches all questions from the API
 * @returns {Promise} Promise object with the questions data
 */
export const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/question`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

/**
 * Fetches a single question by ID from the API
 * @param {string} id - The ID of the question to fetch
 * @returns {Promise} Promise object with the question data
 */
export const fetchQuestionById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/question/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching question with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Fetches all categories from the API
 * @returns {Promise} Promise object with the categories data
 */
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/category`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Creates a new question
 * @param {Object} questionData - The question data to create
 * @param {string} questionData.category_id - The ID of the category
 * @param {string} questionData.title - The title of the question
 * @param {string} questionData.question - The content of the question
 * @returns {Promise} Promise object with the created question data
 */
export const createQuestion = async (questionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/question`, questionData);
    return response.data;
  } catch (error) {
    console.error('Error creating question:', error);
    throw error;
  }
};

/**
 * Creates a new answer
 * @param {Object} answerData - The answer data to create
 * @param {string} answerData.question_id - The ID of the question
 * @param {string} answerData.answer - The content of the answer
 * @returns {Promise} Promise object with the created answer data
 */
export const createAnswer = async (answerData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/answer`, answerData);
    return response.data;
  } catch (error) {
    console.error('Error creating answer:', error);
    throw error;
  }
}; 