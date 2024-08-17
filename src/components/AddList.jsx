import React, { useState, useContext } from 'react';
import { X, Plus } from 'react-feather';
import axios from 'axios';
import { BoardContext } from '../context/BoardContext';

const AddList = () => {
  const [listTitle, setListTitle] = useState('');
  const [show, setShow] = useState(false);
  const { allboard, setAllBoard } = useContext(BoardContext);

  const saveList = async () => {
    if (!listTitle) {
      return;
    }

    try {
      const activeBoard = allboard?.activeBoard;

      if (!activeBoard) {
        console.error("Active board is not defined.");
        return;
      }

      const response = await axios.post(
        `http://localhost:5000/api/boards/${activeBoard.id}/lists`,
        { title: listTitle }
      );

      if (response.status === 201) {
        // Update the local state with the new list
        const updatedBoards = { ...allboard };
        updatedBoards.activeBoard.list.push(response.data.list);
        setAllBoard(updatedBoards);
        setListTitle('');
        setShow(false);
      }
    } catch (error) {
      console.error('Error adding new list:', error);
    }
  };

  const closeBtn = () => {
    setListTitle('');
    setShow(false);
  };

  return (
    <div>
      <div className="flex flex-col h-fit flex-shrink-0 mr-3 w-60 rounded-md p-2 bg-black">
        {show && (
          <div>
            <textarea
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900"
              cols="30"
              rows="2"
              placeholder="Enter list Title..."
            ></textarea>
            <div className="flex p-1">
              <button
                onClick={saveList}
                className="p-1 rounded bg-sky-600 text-white mr-2"
              >
                Add list
              </button>
              <button
                onClick={closeBtn}
                className="p-1 rounded hover:bg-gray-600"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        {!show && (
          <button
            onClick={() => setShow(true)}
            className="flex p-1 w-full justify-center rounded items-center mt-1 hover:bg-gray-500 h-8"
          >
            <Plus size={16} /> Add a list
          </button>
        )}
      </div>
    </div>
  );
};

export default AddList;
