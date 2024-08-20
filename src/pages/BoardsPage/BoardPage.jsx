import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, UserPlus, Edit2, X } from "react-feather";
import { motion } from "framer-motion";
import { BoardContext } from "../../context/BoardContext";
import { UserContext } from "../../context/UserContext";

const BoardPage = () => {
  const port = import.meta.env.VITE_PORT;
  const baseUrl = `http://localhost:${port}`;

  const { user } = useContext(UserContext);
  const [boards, setBoards] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editBoardTitle, setEditBoardTitle] = useState("");
  const [editBoardColor, setEditBoardColor] = useState("#1d3557");
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardColor, setNewBoardColor] = useState("#1d3557");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState(null);
  const navigate = useNavigate();
  const { boardId } = useParams();
  const { setAllBoard } = useContext(BoardContext);

  useEffect(() => {
    if (user) {
      axios.get(`${baseUrl}/api/boards`, { params: { userId: user.id } })
        .then((response) => {
          const boards = response.data.boards;
  
          if (boards.length === 0) {
            // Handle case where no boards are available
            setBoards([]);
            // setShowCreateForm(true); // Automatically show create board form
            alert("Welcome! It looks like you don't have any boards yet. Let's create your first board.");
          } else {
            setBoards(boards);
          }
        })
        .catch((error) => {
          console.error("Error fetching boards:", error);
          alert("An error occurred while fetching your boards. Please try again.");
        });
  
      axios.get(`${baseUrl}/api/users`)
        .then((response) => {
          const usersArray = response.data;
          const otherUsers = usersArray.filter(u => u.id !== user.id);
          setAvailableUsers(otherUsers);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, [user, navigate]);
  

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

    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newBoard = {
      name: newBoardTitle,
      bgcolor: newBoardColor,
      list: [],
    };

    const requestData = {
      userId: user.id,
      board: newBoard,
    };

    axios.post(`${baseUrl}/api/boards`, requestData)
      .then((response) => {
        setBoards([...boards, response.data]);
        setShowCreateForm(false);
        setNewBoardTitle("");
        setNewBoardColor("#1d3557");
      })
      .catch(error => {
        console.error("Error creating board:", error.response ? error.response.data : error.message);
      });
  };

  const handleEditClick = (board) => {
    setSelectedBoard(board);
    setEditBoardTitle(board.name);
    setEditBoardColor(board.bgcolor);
    setShowEditForm(true);
  };

  const handleEditBoard = (e) => {
    e.preventDefault();

    if (!selectedBoard || !user) {
      console.error("User or selected board not available");
      return;
    }

    const updatedBoard = {
      ...selectedBoard,
      name: editBoardTitle,
      bgcolor: editBoardColor,
    };

    axios.put(`${baseUrl}/api/boards/${user.id}/${selectedBoard.id}`, updatedBoard)
      .then((response) => {
        setBoards(boards.map(board => board.id === selectedBoard.id ? response.data.board : board));
        setShowEditForm(false);
        alert("Board updated successfully!");
      })
      .catch(error => {
        console.error("Error updating board:", error);
        alert("Failed to update board. Please try again.");
      });
  };

  const handleAddMemberClick = (board) => {
    setSelectedBoard(board);
    setShowAddMemberModal(true);
  };

  const handleAddMemberToBoard = (userId) => {
    if (!selectedBoard.teamMembers) {
      selectedBoard.teamMembers = [];
    }

    if (!selectedBoard.teamMembers.includes(userId)) {
      selectedBoard.teamMembers.push(userId);

      axios.put(`${baseUrl}/api/boards/${user.id}/${selectedBoard.id}`, selectedBoard)
        .then(() => {
          setBoards(prevBoards =>
            prevBoards.map(board => board.id === selectedBoard.id ? selectedBoard : board)
          );
          setShowAddMemberModal(false);
          alert(`${availableUsers.find(user => user.id === userId).username} has been added to the board.`);
        })
        .catch(error => {
          console.error("Error updating board:", error);
          alert("Failed to add team member. Please try again.");
        });
    } else {
      alert("This user is already a team member.");
    }
  };

  const handleDeleteClick = (board) => {
    setBoardToDelete(board);
    setShowDeleteModal(true);
  };

  const handleDeleteBoard = async (boardId) => {
    setShowDeleteModal(false);

    if (!user) {
      console.error("User not logged in");
      return;
    }

    try {
      await axios.delete(`${baseUrl}/api/boards/${user.id}/${boardId}`);
      setBoards(boards.filter((board) => board.id !== boardId));
    } catch (error) {
      console.error("Failed to delete board:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  const username = user?.username || "User";
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

      <div className="py-10 flex-grow relative">
        <div className="w-full max-w-[1200px] mx-auto md:max-w-[970px] lg:max-w-[1000px] xl:max-w-[1200px]">
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
          <div className="grid grid-cols-4 gap-5 mt-10">
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
                  className="text-white text-[17px] font-bold cursor-pointer"
                  onClick={() => navigate(`/boards/${board.id}`)}
                >
                  {board.name}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddMemberClick(board)}
                    className="text-white"
                  >
                    <UserPlus size={20}/>
                  </button>
                  <button
                    onClick={() => handleEditClick(board)} // Edit button
                    className="text-white"
                  >
                    <Edit2 size={20}/>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(board)}
                    className="text-white"
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add Member Modal */}
        {showAddMemberModal && (
          <div 
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50" 
              style={{ zIndex: 9999 }}
          >
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowAddMemberModal(false)}
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-semibold mb-4 text-black">Add Team Member</h2>
                  <p className="mb-4 text-black">
                      Select members to add to "{selectedBoard?.name}".
                  </p>
                  <ul>
                    {availableUsers.map((availableUser) => (
                      <li key={availableUser.id}>
                        <button
                          className="bg-blue-500 text-white px-3 py-1 rounded mb-2"
                          onClick={() => handleAddMemberToBoard(availableUser.id)}
                        >
                          Add {availableUser.username}
                        </button>
                      </li>
                    ))}
                  </ul>
              </div>
          </div>
        )}

        {/* Edit Board Modal */}
        {showEditForm && (
          <div 
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50" 
              style={{ zIndex: 9999 }}
          >
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowEditForm(false)}
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-semibold mb-4 text-black">Edit Board</h2>
                  <form onSubmit={handleEditBoard}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-medium mb-2">
                        Board Title
                      </label>
                      <input
                        type="text"
                        value={editBoardTitle}
                        onChange={(e) => setEditBoardTitle(e.target.value)}
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
                        value={editBoardColor}
                        onChange={(e) => setEditBoardColor(e.target.value)}
                        className=" w-full h-10 p-1 border border-gray-300 rounded-md cursor-pointer"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#5094c2] text-white py-3 rounded-md font-bold hover:bg-[#407fa6] transition duration-300"
                    >
                      Save Changes
                    </button>
                  </form>
              </div>
          </div>
        )}

        {showDeleteModal && (
          <div 
              className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50" 
              style={{ zIndex: 9999 }}
          >
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                  <button 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowDeleteModal(false)}
                  >
                    <X size={24} />
                  </button>
                  <h2 className="text-xl font-semibold mb-4 text-black">Delete Board</h2>
                  <p className="mb-4 text-black">
                      Are you sure you want to delete the board "{boardToDelete?.name}"? <br></br> <b>This action cannot be undone</b>.
                  </p>
                  <div className="flex justify-end">
                      <button 
                          className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                          onClick={() => setShowDeleteModal(false)}
                      >
                          Cancel
                      </button>
                      <button 
                          className="bg-red-600 text-white px-4 py-2 rounded"
                          onClick={() => handleDeleteBoard(boardToDelete?.id)}
                      >
                          Delete Board
                      </button>
                  </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardPage;
