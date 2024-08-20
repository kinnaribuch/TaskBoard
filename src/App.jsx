import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Boards from './pages/Boards/Boards';
import BoardsPage from './pages/BoardsPage/BoardPage';
import Home from './pages/Home/Home';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { UserProvider } from './context/UserContext'; // Import the UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/boards/:boardId" element={<Boards />} />
          <Route path="/boards" element={<BoardsPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;