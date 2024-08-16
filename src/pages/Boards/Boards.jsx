import React, { useState, useEffect } from 'react';
import SubHeader from '../../components/SubHeader';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import { BoardContext } from '../../context/BoardContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Boards = () => {
  const { boardId } = useParams(); // Get the boardId from the URL
  const [allboard, setAllBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchBoardData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/api/boards/${boardId}`);
  //       setAllBoard(response.data); // Assuming your API returns the board data in the correct format
  //       setLoading(false);
  //     } catch (err) {
  //       console.error('Error fetching board data:', err);
  //       setError('Failed to load board');
  //       setLoading(false);
  //     }
  //   };

  //   fetchBoardData();
  // }, [boardId]);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/boards/${boardId}`);
        const boardData = {
          active: 0,
          boards: [response.data], // Wrapping the response in an array if it's a single board
        };
        console.log("Processed Board Data:", boardData);
        setAllBoard(boardData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching board data:', err);
        setError('Failed to load board');
        setLoading(false);
      }
    };
  
    fetchBoardData();
  }, [boardId]);

  if (loading) {
    return <div>Loading...</div>; // or a spinner, etc.
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Ensure allboard and allboard.boards are defined before accessing them
  if (!allboard || !allboard.boards || !allboard.boards[allboard.active]) {
    return <div>Board data is not available.</div>;
  }

  return (
    <BoardContext.Provider value={{ allboard, setAllBoard }}>
      <div className='app-container'>
        <SubHeader />
        <div className='content flex'>
          <Sidebar />
          <Main />
        </div>
      </div>
    </BoardContext.Provider>
  );
};

export default Boards;
