import './App.css';
import { QuestionsPage } from './pages';

const App = () => {
  return (
    <div className="App min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-800">Q&A Board</h1>
        </div>
      </header>
      <main>
        <QuestionsPage />
      </main>
    </div>
  );
};

export default App;
