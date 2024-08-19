import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';
import axios from 'axios';

const TaskEditorPopup = ({ task, onSave, onDelete, onClose, boardId, listId }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [assignee, setAssignee] = useState(task?.assignee || '');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setAssignee(task.assignee);
    }

    // Fetch all users and populate the dropdown
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [task]);

  const handleSave = () => {
    onSave({ ...task, title, description, assignee });
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/boards/${boardId}/lists/${listId}/tasks/${task.id}`);
      if (response.status === 200) {
        onDelete(task.id);
        onClose();
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white text-black py-9 px-7 rounded-md w-full max-w-3xl">
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h3 className="text-xl font-bold mb-4">Edit Task</h3>
        <label>Title</label>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div>
          <label>Description</label>
          <textarea 
            placeholder="Add a more detailed description..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <label>Assign To</label>
          <select 
            value={assignee} 
            onChange={(e) => setAssignee(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4"
          >
            <option value="">Please Select...</option>
            {users.map((user, index) => (
              <option key={index} value={user.username}>{user.username}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between mt-4">
          <button 
            onClick={handleSave} 
            className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-600"
          >
            Save
          </button>
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-400"
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskEditorPopup;
