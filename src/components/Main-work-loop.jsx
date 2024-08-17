import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MoreHorizontal, Edit2, Trash2 } from "react-feather";
import CardAdd from "./CardAdd";
import { Popover } from "react-tiny-popover";
import { BoardContext } from "../context/BoardContext";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import AddList from "./AddList";
import TaskEditorPopup from "./TaskEditorPopup";
import { useParams } from "react-router-dom"; // Import useParams to get the board ID from the URL

const Main = () => {
  const { allboard, setAllBoard } = useContext(BoardContext);
  const [editingCardId, setEditingCardId] = useState(null);
  const [editedCardTitle, setEditedCardTitle] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedListIndex, setSelectedListIndex] = useState(null);
  const [openPopoverIndex, setOpenPopoverIndex] = useState(null);
  const [editingListIndex, setEditingListIndex] = useState(null);
  const [editedListTitle, setEditedListTitle] = useState("");

  const { boardId } = useParams(); // Get the board ID from the URL

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/boards");
        setAllBoard(response.data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchBoardData();
  }, [setAllBoard]);

  useEffect(() => {
    // Update the active board based on the board ID in the URL
    if (allboard && allboard.boards) {
      const activeIndex = allboard.boards.findIndex(board => board.id === boardId);
      if (activeIndex !== -1) {
        let newBoard = { ...allboard };
        newBoard.active = activeIndex;
        setAllBoard(newBoard);
      }
    }
  }, [boardId, allboard, setAllBoard]);

  const bdata = allboard && allboard.boards ? allboard.boards[allboard.active] : null;

  if (!bdata) {
    return <div>No board data available</div>;
  }

  function onDragEnd(res) {
    if (!res.destination) {
      return;
    }

    const sourceListIndex = bdata.list.findIndex(
      (list) => list.id === res.source.droppableId
    );
    const destinationListIndex = bdata.list.findIndex(
      (list) => list.id === res.destination.droppableId
    );

    if (sourceListIndex === -1 || destinationListIndex === -1) {
      return;
    }

    const newList = [...bdata.list];
    const [movedTask] = newList[sourceListIndex].tasks.splice(res.source.index, 1);
    newList[destinationListIndex].tasks.splice(res.destination.index, 0, movedTask);

    let updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);

    axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
      list: newList,
    }).catch((error) => {
      console.error("Error updating board data:", error);
    });
  }

  const handleEditCard = (card, listIndex) => {
    setSelectedTask(card);
    setSelectedListIndex(listIndex);
    setShowPopup(true);
  };

  const saveEditedCard = (updatedTask) => {
    let newList = [...bdata.list];
    newList[selectedListIndex].tasks = newList[selectedListIndex].tasks.map(
      (item) => (item.id === updatedTask.id ? updatedTask : item)
    );

    let updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);

    axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
      list: newList,
    }).catch((error) => {
      console.error("Error updating board data:", error);
    });

    setShowPopup(false);
  };

  const handleCardAdded = (newCard, listIndex) => {
    let newList = [...bdata.list];
    newList[listIndex].tasks.push(newCard);

    let updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);

    axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
      list: newList,
    }).catch((error) => {
      console.error("Error updating board data:", error);
    });
  };

  const handleInlineEditStart = (task) => {
    setEditingCardId(task.id);
    setEditedCardTitle(task.title);
  };

  const handleInlineEditSave = (taskId, listIndex) => {
    let newList = [...bdata.list];
    newList[listIndex].tasks = newList[listIndex].tasks.map((item) =>
      item.id === taskId ? { ...item, title: editedCardTitle } : item
    );

    let updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);

    axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
      list: newList,
    }).catch((error) => {
      console.error("Error updating board data:", error);
    });

    setEditingCardId(null);
  };

  const handleKeyDown = (e, taskId, listIndex) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInlineEditSave(taskId, listIndex);
    }
  };

  const handleListEdit = (index) => {
    setEditingListIndex(index);
    setEditedListTitle(bdata.list[index].title);
    setOpenPopoverIndex(null);
  };

  const handleListSave = (index) => {
    let newList = [...bdata.list];
    newList[index].title = editedListTitle;

    let updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);

    axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
      list: newList,
    }).catch((error) => {
      console.error("Error updating board data:", error);
    });

    setEditingListIndex(null);
  };

  const handleListDelete = (index) => {
    let newList = [...bdata.list];
    newList.splice(index, 1);

    let updatedBoard = { ...allboard };
    updatedBoard.boards[updatedBoard.active].list = newList;
    setAllBoard(updatedBoard);

    axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
      list: newList,
    }).catch((error) => {
      console.error("Error updating board data:", error);
    });

    setOpenPopoverIndex(null);
  };

  return (
    <div
      className="flex flex-col w-full"
      style={{ backgroundColor: `${bdata.bgcolor}` }}
    >
      <div className="p-3 items-center bg-black flex justify-between w-full bg-opacity-50">
        <h2 className="text-lg">{bdata.name}</h2>
      </div>
      <div className="flex flex-col w-full flex-grow relative">
        <div className="absolute mb-1 pb-2 left-0 right-0 top-0 bottom-0 p-3 flex overflow-x-scroll overflow-y-hidden">
          <DragDropContext onDragEnd={onDragEnd}>
            {bdata.list &&
              bdata.list.map((x, ind) => {
                return (
                  <div
                    key={ind}
                    className="mr-3 w-60 h-fit rounded-md p-2 bg-black flex-shrink-0"
                  >
                    <div className="list-body">
                      <div className="flex justify-between p-1">
                        {editingListIndex === ind ? (
                          <input
                            type="text"
                            value={editedListTitle}
                            onChange={(e) => setEditedListTitle(e.target.value)}
                            onBlur={() => handleListSave(ind)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleListSave(ind);
                              }
                            }}
                            className="bg-zinc-700 text-white p-1 rounded-md border-2 border-gray-600 w-full"
                          />
                        ) : (
                          <span>{x.title}</span>
                        )}
                        <Popover
                          isOpen={openPopoverIndex === ind}
                          positions={["bottom", "top", "left", "right"]}
                          content={
                            <div className="w-28 bg-white shadow-lg">
                              <button
                                className="text-black border-b border-black flex items-center px-3 py-1 text-sm hover:bg-gray-200 w-full text-left"
                                onClick={() => handleListEdit(ind)}
                              >
                                <Edit2 size={16} className="mr-2" />
                                Edit
                              </button>
                              <button
                                className="text-black flex items-center px-3 py-1 text-sm hover:bg-gray-200 w-full text-left"
                                onClick={() => handleListDelete(ind)}
                              >
                                <Trash2 size={16} className="mr-2" />
                                Delete
                              </button>
                            </div>
                          }
                          onClickOutside={() => setOpenPopoverIndex(null)}
                        >
                          <button
                            onClick={() =>
                              setOpenPopoverIndex(
                                openPopoverIndex === ind ? null : ind
                              )
                            }
                            className="hover:bg-gray-500 p-1 rounded-sm"
                          >
                            <MoreHorizontal size={16} />
                          </button>
                        </Popover>
                      </div>
                      <Droppable droppableId={x ? x.id : "droppable-null"}>
                        {(provided, snapshot) => (
                          <div
                            className="py-1"
                            ref={provided.innerRef}
                            style={{
                              backgroundColor: snapshot.isDraggingOver
                                ? "#222"
                                : "transparent",
                            }}
                            {...provided.droppableProps}
                          >
                            {x?.tasks &&
                              x.tasks.map(
                                (item, index) =>
                                  item && (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id}
                                      index={index}
                                    >
                                      {(provided, snapshot) => (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <div
                                            className="item flex justify-between items-center bg-zinc-700 p-1 cursor-pointer rounded-md border-2 border-zinc-900 hover:border-gray-500"
                                            onClick={() =>
                                              !editingCardId &&
                                              handleEditCard(item, ind)
                                            }
                                          >
                                            {editingCardId === item.id ? (
                                              <div className="flex items-center w-full">
                                                <input
                                                  type="text"
                                                  value={editedCardTitle}
                                                  onChange={(e) =>
                                                    setEditedCardTitle(
                                                      e.target.value
                                                    )
                                                  }
                                                  onKeyDown={(e) =>
                                                    handleKeyDown(
                                                      e,
                                                      item.id,
                                                      ind
                                                    )
                                                  }
                                                  className="bg-zinc-700 text-white p-1 rounded-md border-2 border-gray-600 w-full"
                                                />
                                              </div>
                                            ) : (
                                              <span>{item.title}</span>
                                            )}
                                            <span className="flex justify-start items-start">
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleInlineEditStart(item);
                                                }}
                                                className="hover:bg-gray-600 p-1 rounded-sm"
                                              >
                                                <Edit2 size={16} />
                                              </button>
                                            </span>
                                          </div>
                                        </div>
                                      )}
                                    </Draggable>
                                  )
                              )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                      <CardAdd
                        listId={x.id}
                        boardId={bdata.id}
                        onCardAdded={(newCard) => handleCardAdded(newCard, ind)}
                      />
                    </div>
                  </div>
                );
              })}
          </DragDropContext>

          <AddList getlist={(e) => listData(e)} />
        </div>
      </div>
      {showPopup && selectedTask && (
        <TaskEditorPopup
          task={selectedTask}
          onSave={saveEditedCard}
          onDelete={(taskId) => {
            const updatedTasks = bdata.list[selectedListIndex].tasks.filter(
              (task) => task.id !== taskId
            );
            const updatedList = [...bdata.list];
            updatedList[selectedListIndex].tasks = updatedTasks;
            const updatedBoard = { ...allboard };
            updatedBoard.boards[allboard.active].list = updatedList;
            setAllBoard(updatedBoard);

            axios.put(`http://localhost:5000/api/boards/${bdata.id}`, {
              list: updatedList,
            }).catch((error) => {
              console.error("Error updating board data:", error);
            });
          }}
          onClose={() => setShowPopup(false)}
          boardId={bdata.id}
          listId={bdata.list[selectedListIndex]?.id}
        />
      )}
    </div>
  );
};

export default Main;