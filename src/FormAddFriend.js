import React, { useState } from 'react';
import { Button } from './App';


export const FormAddFriend = ({ onAddFriend }) => {
    const [friendName, setFriendName] = useState('');
    const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

    function handleSubmit(e) {
        e.preventDefault();

        if (!friendName || !friendImage) {
            return;
        }

        const id = crypto.randomUUID();
        const newFriend = {
            id,
            name: friendName,
            image: `${friendImage}?=${id}`,
            balance: 0
        };
        onAddFriend(newFriend);
        setFriendName('');
        setFriendImage('https://i.pravatar.cc/48');
    }

    return (
        <form className='form-add-friend' onSubmit={handleSubmit}>
            <label> Friend Name</label>
            <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />

            <label>Image URL</label>
            <input type="text" value={friendImage} onChange={(e) => setFriendImage(e.target.value)} />

            <Button>Add</Button>
        </form>
    );
};
