import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import robotAnimation from '../assets/images/robot.json';
import { UserContext } from '../context/UserContext'; // Import UserContext

const Login = () => {
  const { setUser } = useContext(UserContext); // Get the setUser function from UserContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/login', {
  //       username,
  //       password,
  //     });
      
  //     if (response.data.success) {
  //       const loggedInUser = { id: response.data.userId, username: response.data.username };
  //       setUser(loggedInUser);
  //       localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  //       navigate('/boards');
  //     } else {
  //       setError('Login failed');
  //     }
  //   } catch (error) {
  //     setError('Invalid Username / Password');
  //     console.error(error);
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      
      if (response.data.success) {
        const loggedInUser = { id: response.data.userId, username: response.data.username };
        setUser(loggedInUser);
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser)); // Save user in localStorage
        navigate('/boards');
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Invalid Username / Password');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="w-1/2 flex items-center justify-center">
        <Lottie animationData={robotAnimation} style={{ width: 500, height: 500 }} loop={true} />
      </div>

      <div className="w-1/2 flex items-center justify-center bg-[#5094c2]">
        <form onSubmit={handleLogin} className="animate-form bg-white p-8 max-w-md w-full">
          <h2 className="text-4xl font-extrabold text-[#5094c2] mb-4 text-center">Sign In</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="text-black block w-full mb-4 p-4 border border-gray-300 rounded-md"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-black block w-full mb-6 p-4 border border-gray-300 rounded-md"
            required
          />
          <button type="submit" className="w-full p-4 rounded-md text-[20px] font-bold text-white bg-[#5094c2]">
            Log In
          </button>
          <p className="mt-4 text-center text-[#5094c2]">
            New user?{' '}
            <Link to="/signup" className="font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
