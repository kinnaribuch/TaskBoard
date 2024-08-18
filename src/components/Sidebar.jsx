import React, { useContext, useState } from 'react';
import { ChevronRight, ChevronLeft, Plus, X, Trash2 } from 'react-feather';
import { Popover } from 'react-tiny-popover';
import { BoardContext } from '../context/BoardContext';
import { UserContext } from '../context/UserContext'; // Import UserContext
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate(); 
    const { boardId } = useParams(); 
    const { user } = useContext(UserContext); // Get the current user from context
    const blankBoard = {
        name: '',
        bgcolor: '#f60000',
        list: []
    };

    const [boardData, setBoarddata] = useState(blankBoard);
    const [collapsed, setCollapsed] = useState(false);
    const [showpop, setShowpop] = useState(false);
    const { allboard, setAllBoard } = useContext(BoardContext);

    // This function handles the board click event
    const handleBoardClick = (id) => {
        if (id !== boardId) {
            navigate(`/boards/${id}`);
        }
    };

    const addBoard = async () => {
        if (!user) {
            console.error("User not logged in");
            return;
        }

        const newBoard = {
            ...boardData,
        };

        const requestData = {
            userId: user.id, // Pass the userId with the new board data
            board: newBoard,
        };

        try {
            const response = await axios.post("http://localhost:5000/api/boards", requestData);
            let newB = { ...allboard };
            newB.boards.push(response.data);
            setAllBoard(newB);
            setBoarddata(blankBoard);
            setShowpop(!showpop);
            navigate(`/boards/${response.data.id}`);  // Navigate to the new board after creation
        } catch (error) {
            console.error("Error creating board:", error);
        }
    };

    const handleDeleteBoard = async (id, index) => {
        if (!user) {
          console.error("User not logged in");
          return;
        }
      
        try {
          await axios.delete(`http://localhost:5000/api/boards/${user.id}/${id}`);
          let updatedBoards = { ...allboard };
          updatedBoards.boards.splice(index, 1);
      
          setAllBoard(updatedBoards);
          if (id === boardId) {
            navigate('/boards');  // Navigate to a neutral page if the current active board is deleted
          }
        } catch (error) {
          console.error("Failed to delete board:", error);
        }
      };
      

    return (
        <div className={`bg-[#121417] h-[calc(100vh-3.6rem)] border-r border-r-[#9fadbc29] transition-all linear duration-500 flex-shrink-0 ${collapsed ? 'w-[42px]' : 'w-[280px]'}`} >
            {collapsed && <div className='p-2'>
                <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 rounded-sm'>
                    <ChevronRight size={18}></ChevronRight>
                </button>
            </div>}
            {!collapsed && <div>
                <div className="workspace p-3 flex justify-between border-b border-b-[#9fadbc29]">
                    <h4
                        onClick={() => navigate('/boards', { state: { workspaceName: "Your Workspace" } })}
                        className="text-[18px] cursor-pointer hover:text-blue-400 transition-all duration-300"
                    >
                        Your Workspace
                    </h4>
                    <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 rounded-sm p-1'>
                        <ChevronLeft size={18}></ChevronLeft>
                    </button>
                </div>
                <div className="boardlist">
                    <div className='flex justify-between px-3 py-2'>
                        <h6>Your Boards</h6>
                        <Popover
                            isOpen={showpop}
                            align='start'
                            positions={['right', 'top', 'bottom', 'left']} 
                            content={
                                <div className='ml-2 p-2 w-60 flex flex-col justify-center items-center bg-slate-600 text-white rounded'>
                                    <button onClick={() => setShowpop(!showpop)} className='absolute right-2 top-2 hover:bg-gray-500 p-1 rounded'><X size={16}></X></button>
                                    <h4 className='py-3'>Create Board</h4>
                                    <img src="https://placehold.co/200x120/png" alt="" />
                                    <div className="mt-3 flex flex-col items-start w-full">
                                        <label htmlFor="title">Board Title <span>*</span></label>
                                        <input value={boardData.name} onChange={(e) => setBoarddata({ ...boardData, name: e.target.value })} type="text" className='mb-2 h-8 px-2 w-full bg-gray-700' />
                                        <label htmlFor="Color">Board Color</label>
                                        <input value={boardData.bgcolor} onChange={(e) => setBoarddata({ ...boardData, bgcolor: e.target.value })} type="color" className='mb-2 h-8 px-2 w-full bg-gray-700' />
                                        <button onClick={addBoard} className='w-full rounded h-8 bg-slate-700 mt-2 hover:bg-gray-500'>Create</button>
                                    </div>
                                </div>
                            }
                        >
                            <button onClick={() => setShowpop(!showpop)} className='hover:bg-slate-600 p-1 rounded-sm'>
                                <Plus size={16}></Plus>
                            </button>
                        </Popover>
                    </div>
                </div>
                <ul>
                    {allboard.boards && allboard.boards.map((x, i) => {
                        const isActive = x.id === boardId;

                        return (
                            <li key={i} className={`flex justify-between items-center hover:bg-gray-500 ${isActive ? 'bg-gray-700' : ''}`}>
                                <button
                                    onClick={() => handleBoardClick(x.id)}  // Using handleBoardClick here
                                    className={`px-3 py-2 w-full text-sm flex justify-start align-baseline`}
                                >
                                    <span className='w-6 h-max rounded-sm mr-2' style={{ backgroundColor: `${x.bgcolor}` }}>&nbsp;</span>
                                    <span>{x.name}</span>
                                </button>
                                <button
                                    onClick={() => handleDeleteBoard(x.id, i)}
                                    className="text-white hover:text-red-500 mr-3"
                                >
                                    <Trash2 size={18}/>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>}
        </div>
    );
}

export default Sidebar;
