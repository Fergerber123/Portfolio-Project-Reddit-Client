import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LaunchPage from './pages/LaunchPage';
import PostsPage from './pages/PostsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/r/:subreddit" element={<PostsPage />} />
      </Routes>
    </Router>
  );
}

export default App
