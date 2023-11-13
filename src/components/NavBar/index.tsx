import React, { useState, FC } from 'react';
import './NavBar.css';

interface NavBarProps {
  todoLists: string[];
  addTodoList: (name: string) => void;
}

const NavBar: FC<NavBarProps> = ({ todoLists, addTodoList }) => {
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim() !== '') {
      addTodoList(newListName);
      setNewListName(''); // Reset the input after adding
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(event.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {todoLists.map((listName, index) => (
          <div key={index} className="list-name">
            {listName}
          </div>
        ))}
      </div>
      <div className="navbar-add-list">
        <input
          type="text"
          value={newListName}
          onChange={handleInputChange}
          placeholder="New list name"
          className="input-field"
        />
        <button onClick={handleAddList} className="add-button">
          Add List
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
