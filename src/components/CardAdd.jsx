import React, { useState, useContext } from 'react';
import { X, Plus } from 'react-feather';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Import UserContext

const CardAdd = ({ boardId, listId, onCardAdded }) => {
    const port = import.meta.env.VITE_PORT;
    const baseUrl = `http://localhost:${port}`;

    const [card, setCard] = useState('');
    const [show, setShow] = useState(false);
    const { user } = useContext(UserContext); // Get the current user from context

    const saveCard = async () => {
        if (!card || !user) return;

        try {
            const response = await axios.post(`${baseUrl}/api/boards/${boardId}/lists/${listId}/cards`, 
            { 
                title: card,
                userId: user.id // Pass the userId in the request
            });
            if (response.status === 201) {
                onCardAdded(response.data); // Pass the newly created card back to the parent component
                setCard('');
                setShow(false);
            }
        } catch (error) {
            console.error('Error adding card:', error);
        }
    };

    const closeBtn = () => {
        setCard('');
        setShow(false);
    };

    return (
        <div>
            <div className="flex flex-col">
                {show && (
                    <div>
                        <textarea 
                            value={card} 
                            onChange={(e) => setCard(e.target.value)} 
                            className="p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900" 
                            placeholder="Enter Card Title..."
                        />
                        <div className="flex p-1">
                            <button onClick={saveCard} className="p-1 rounded bg-sky-600 text-white mr-2">Add Card</button>
                            <button onClick={closeBtn} className="p-1 rounded hover:bg-gray-600"><X size={16} /></button>
                        </div>
                    </div>
                )}
                {!show && (
                    <button onClick={() => setShow(true)} className="flex p-1 w-full justify-start rounded items-center mt-1 hover:bg-gray-500 h-8">
                        <Plus size={16} /> Add a card
                    </button>
                )}
            </div>
        </div>
    );
};

export default CardAdd;
