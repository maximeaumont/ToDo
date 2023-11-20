// src/components/NavBar/NavBar.tsx

import React, { useState } from 'react';
import './NavBar.css';

interface NavBarProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

const NavBar = ({ isVisible, toggleVisibility }: NavBarProps) => {
  const [lists, setLists] = useState<string[]>([]);
  const [listName, setListName] = useState("");

  const addList = () => {
    if(listName) {
      setLists([...lists, listName]);
      setListName("");
    }
  };

  return (
    <div className={`navbar ${isVisible ? 'visible' : ''}`}>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? '×' : '≡'} {/* Remplacer par des icônes si nécessaire */}
      </button>
      {isVisible && (
        <>
          <input 
            type="text" 
            value={listName} 
            onChange={(e) => setListName(e.target.value)} 
            placeholder="Nom de la liste" 
          />
          <button onClick={addList}>Ajouter la liste</button>
          <div className="lists">
            {lists.map((list, index) => (
              <div key={index}>{list}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
