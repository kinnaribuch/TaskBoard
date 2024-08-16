import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubHeader = () => {
  const navigate = useNavigate();
  const username = JSON.parse(localStorage.getItem('loggedInUser'))?.username || 'User';
  const initials = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');  // Clear user info from localStorage
    navigate('/');  // Redirect to Home
  };

  return (
    <div className='bg-[#1d2125] w-full h-[3.6rem] px-3 border-b flex flex-row justify-between border-b-[#9fadbc29]'>
      <div className="left flex items-center">
        <h3 className='text-slate-50 font-bold text-lg'>TaskBoard</h3>
      </div>
      <div className="right flex items-center space-x-4">
        <div className="bg-white text-[#1d2125] font-bold rounded-full w-8 h-8 flex items-center justify-center">
          {initials}
        </div>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default SubHeader;
