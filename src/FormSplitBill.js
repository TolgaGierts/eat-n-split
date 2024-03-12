import React, { useState } from 'react';
import { Button } from './App';


export const FormSplitBill = ({ selectedFriend, onSplit }) => {
    const [bill, setBill] = useState('');
    const [userExpense, setUserExpense] = useState('');
    const [whoIsPaying, setWhoIsPaying] = useState('user');
    const paidByFriend = bill ? bill - userExpense : '';

    function handleSubmit(e) {
        e.preventDefault();
        if (!bill || !userExpense) {
            return;
        }
        onSplit(whoIsPaying === 'user' ? paidByFriend : -userExpense);

    }



    return (
        <form className='form-split-bill' onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>Bill value</label>
            <input type="text" value={bill} onChange={(e) => setBill(+e.target.value)} />

            <label>Your expense</label>
            <input type="text" value={userExpense} onChange={(e) => setUserExpense(+e.target.value > bill ? userExpense : +e.target.value)} />

            <label>{selectedFriend.name}'s expense</label>
            <input type="text" disabled value={bill ? bill - userExpense : ''} />
            <label>Who is paying the bill</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value="user" key="">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split bill</Button>

        </form>
    );
};
