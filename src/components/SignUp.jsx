import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import robotAnimation from '../assets/images/robot.json'; // Your Lottie animation file

const Signup = () => {
  const port = import.meta.env.VITE_PORT;
  const baseUrl = `http://localhost:${port}`;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Password validation: at least 8 characters, including at least one letter
    const passwordRegex = /^(?=.*[A-Za-z])[A-Za-z\d]{1,8}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be exactly 8 characters long and contain at least one letter.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/api/signup`, {
        username,
        email,
        password,
      });
      alert(response.data.message);
      if (response.data.message === 'User created successfully') {
        navigate('/login'); 
      }
    } catch (error) {
      setError('Error signing up');
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side with Robot Animation */}
      <div className="w-1/2 flex items-center justify-center">
        <Lottie 
          animationData={robotAnimation} 
          style={{ width: 500, height: 500 }} 
          loop={true} 
        />
      </div>

      {/* Right Side with Signup Form */}
      <div className="w-1/2 flex items-center justify-center bg-[#5094c2]">
        <form onSubmit={handleSignup} className="animate-form bg-white p-8 max-w-md w-full">
          <h2 className="text-4xl font-extrabold text-[#5094c2] mb-4 text-center">Sign Up</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            className="text-black block w-full mb-4 p-4 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
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
            Sign Up
          </button>
          <p className="mt-4 text-center text-[#5094c2]">
            Already a user?{' '}
            <Link to="/login" className="font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
