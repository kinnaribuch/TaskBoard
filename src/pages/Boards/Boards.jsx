import React, { useState, useEffect } from 'react';
import SubHeader from '../../components/SubHeader';
import Sidebar from '../../components/Sidebar';
import Main from '../../components/Main';
import { BoardContext } from '../../context/BoardContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Boards = () => {
  const { boardId } = useParams(); // Get the boardId from the URL
  const [allboard, setAllBoard] = useState({
    activeBoard: null,
    boards: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoardsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/boards");
        const boards = response.data.boards;
        
        const activeBoard = boards.find(board => board.id === boardId);

        setAllBoard({
          activeBoard: activeBoard || null,
          boards,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching board data:', err);
        setError('Failed to load boards');
        setLoading(false);
      }
    };
  
    fetchBoardsData();
  }, [boardId]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!allboard.activeBoard) {
    return <div>No active board found.</div>;
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