
import React, { useState } from 'react'
import { FriendListItem } from './FriendListItem';
import { FormAddFriend } from './FormAddFriend';
import { FormSplitBill } from './FormSplitBill';

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export const App = () => {
  // States
  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setshowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState(null)


  //Handler Functions
  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend])
    setshowAddFriend(false)
  }

  function handleShowAddFriend() {
    setshowAddFriend((showAddFriend) => !showAddFriend)
  }

  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend)
    setSelectedFriend(cur => cur?.id === friend.id ? null : friend)
    setshowAddFriend(false)
  }

  function handleSplit(value) {
    setFriends((friends) => friends.map((friend) => {
      if (friend.id === selectedFriend.id) {
        return {
          ...friend,
          balance: friend.balance + value
        }
      }
      return friend
    }))
    setSelectedFriend(null)
  }


  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList friends={friends} onSelect={handleSelectedFriend} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : 'Add Friend'}</Button>
      </div>

      {selectedFriend && <FormSplitBill key={selectedFriend.id} selectedFriend={selectedFriend} onSplit={handleSplit} />}
    </div>
  )
}

export const FriendList = ({ friends, onSelect, selectedFriend }) => {
  return (
    <ul>
      {friends.map((friend) => (
        <FriendListItem key={friend.id} friend={friend} onSelect={onSelect} selectedFriend={selectedFriend} />
      ))}
    </ul>
  );
}

export const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className='button'>{children}</button>
  )
}


