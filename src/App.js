
import React, { useState } from 'react'
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

      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplit={handleSplit} />}
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

export const FriendListItem = ({ friend, onSelect, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id

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

    </li >
  );
}


export const Button = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className='button'>{children}</button>
  )
}

export const FormAddFriend = ({ onAddFriend }) => {
  const [friendName, setFriendName] = useState('')
  const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48")

  function handleSubmit(e) {
    e.preventDefault()

    if (!friendName || !friendImage) {
      return
    }

    const id = crypto.randomUUID()
    const newFriend = {
      id,
      name: friendName,
      image: `${friendImage}?=${id}`,
      balance: 0
    }
    onAddFriend(newFriend)
    setFriendName('')
    setFriendImage('https://i.pravatar.cc/48')
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit} >
      <label> Friend Name</label>
      <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />

      <label>Image URL</label>
      <input type="text" value={friendImage} onChange={(e) => setFriendImage(e.target.value)} />

      <Button>Add</Button>
    </form>
  )
}


export const FormSplitBill = ({ selectedFriend, onSplit }) => {
  const [bill, setBill] = useState('')
  const [userExpense, setUserExpense] = useState('')
  const [whoIsPaying, setWhoIsPaying] = useState('user')
  const paidByFriend = bill ? bill - userExpense : ''

  function handleSubmit(e) {
    e.preventDefault()
    if (!bill || !userExpense) {
      return
    }
    onSplit(whoIsPaying === 'user' ? paidByFriend : -userExpense)

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

      <Button >Split bill</Button>

    </form>
  )
}







