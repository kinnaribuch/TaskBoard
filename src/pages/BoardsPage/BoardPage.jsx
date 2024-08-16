import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2 } from "react-feather";
import { motion } from "framer-motion";
import { BoardContext } from "../../context/BoardContext";

const BoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("#1d3557");
  const navigate = useNavigate();
  const { boardId } = useParams(); 
  const { setAllBoard } = useContext(BoardContext); 

  useEffect(() => {
    axios.get("http://localhost:5000/api/boards").then((response) => {
      setBoards(response.data.boards);
    });
  }, []);

  useEffect(() => {
    if (boardId && boards.length > 0) {
      const activeBoardIndex = boards.findIndex((board) => board.id === boardId);
      if (activeBoardIndex !== -1) {
        setAllBoard((prevState) => ({
          ...prevState,
          active: activeBoardIndex,
          boards: boards,
        }));
      }
    }
  }, [boardId, boards, setAllBoard]);

  const handleCreateBoard = (e) => {
    e.preventDefault();

    const newBoard = {
      id: Date.now().toString(),
      name: newBoardTitle,
      bgcolor: newBoardColor,
      list: [],
    };

    axios.post("http://localhost:5000/api/boards", newBoard).then((response) => {
      setBoards([...boards, response.data]);
      setShowCreateForm(false);
      setNewBoardTitle("");
      setNewBoardColor("#1d3557");
    }).catch(error => {
      console.error("Error creating board:", error);
    });
  };

  const handleDeleteBoard = (boardId) => {
    axios.delete(`http://localhost:5000/api/boards/${boardId}`).then(() => {
      setBoards(boards.filter((board) => board.id !== boardId));
    }).catch((error) => {
      console.error("Failed to delete board:", error);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const username = JSON.parse(localStorage.getItem("loggedInUser"))?.username || "User";
  const initials = username.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-[#5094c2] w-full h-[3.6rem] px-3 flex flex-row justify-between items-center text-white">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">TaskBoard</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-white text-[#5094c2] font-bold rounded-full w-8 h-8 flex items-center justify-center">
            {initials}
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="p-10 flex-grow relative">
        <div className="w-[1200px] mx-auto">
          <h1 className="text-3xl font-bold text-[#5094c2] text-center">
            Your Workspace
          </h1>
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold text-[#5094c2]">Boards</h2>
            <div className="relative">
              <button
                onClick={() => setShowCreateForm(!showCreateForm)}
                className="bg-[#5094c2] text-white px-4 py-2 rounded"
              >
                Create new board
              </button>
              {showCreateForm && (
                <div
                  className="absolute right-0 mt-2 bg-white p-6 shadow-xl rounded-lg z-10"
                  style={{
                    width: "400px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3 className="text-xl font-semibold text-[#5094c2] mb-4">
                    Create New Board
                  </h3>
                  <form onSubmit={handleCreateBoard}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Board Title
                      </label>
                      <input
                        type="text"
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
                        className="text-black w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5094c2]"
                        placeholder="Enter board title"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Select Board Color
                      </label>
                      <input
                        type="color"
                        value={newBoardColor}
                        onChange={(e) => setNewBoardColor(e.target.value)}
                        className=" w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#5094c2] text-white py-3 rounded-md font-bold hover:bg-[#407fa6] transition duration-300"
                    >
                      Create
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-5">
            {boards.map((board) => (
              <motion.div
                key={board.id}
                className="p-5 rounded shadow relative flex items-center justify-between"
                style={{ backgroundColor: board.bgcolor }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3
                  className="text-white text-lg font-bold cursor-pointer"
                  onClick={() => navigate(`/boards/${board.id}`)}
                >
                  {board.name}
                </h3>
                <button
                  onClick={() => handleDeleteBoard(board.id)}
                  className="text-white"
                >
                  <Trash2 size={20}/>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardPage;
