import { useState } from 'react';
import './NavBar.css';

interface NavBarProps {
  isVisible: boolean;
  toggleVisibility: () => void;
  lists: string[];
  onSelectList: (listName: string) => void;
  onAddList: (listName: string) => void;
}

const NavBar = ({ isVisible, toggleVisibility, lists, onSelectList, onAddList }: NavBarProps) => {
  const [listName, setListName] = useState("");

  const addList = () => {
    if(listName) {
      onAddList(listName);
      setListName("");
    }
  };

  return (
    <div className={`navbar ${isVisible ? 'visible' : ''}`}>
      <button className="toggle-button" onClick={toggleVisibility}>
        {isVisible ? '×' : '≡'}
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
              <div key={index} onClick={() => onSelectList(list)}>
                {list}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
