import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import QuestionDetail from './pages/QuestionDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/question/:id" element={<QuestionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
