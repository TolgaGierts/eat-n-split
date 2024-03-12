import React from 'react';
import { Button } from './App';


export const FriendListItem = ({ friend, onSelect, selectedFriend }) => {
    const isSelected = selectedFriend?.id === friend.id;

    return (
        <li className={isSelected ? 'selected' : ''}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance > 0 && (
                <p className="green">{friend.name} has to give ${friend.balance}</p>
            )}
            {friend.balance < 0 && (
                <p className="red">You have to pay {friend.name} ${Math.abs(friend.balance)}</p>
            )}
            {friend.balance === 0 && (
                <p>You and {friend.name} are even</p>
            )}

            <Button onClick={() => onSelect(friend)}>{isSelected ? 'Close' : 'Select'}</Button>

        </li>
    );
};
