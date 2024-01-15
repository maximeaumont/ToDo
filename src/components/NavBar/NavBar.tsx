import { useState } from 'react';
import EditButton from '../EditButton/EditButton'; // Assurez-vous que le chemin est correct
import DeleteButton from '../DeleteButton/DeleteButton'; // Assurez-vous que le chemin est correct
import './NavBar.css';

interface NavBarProps {
  isVisible: boolean;
  toggleVisibility: () => void;
  lists: string[];
  onSelectList: (listName: string) => void;
  onAddList: (listName: string) => void;
  onOpenEditModal: (listName: string) => void;
  onDeleteList: (listName: string) => void;
}

const NavBar = ({ isVisible, toggleVisibility, lists, onSelectList, onAddList, onOpenEditModal, onDeleteList }: NavBarProps) => {
  const [listName, setListName] = useState("");

  const addList = () => {
    if (listName) {
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
              <div key={index} className="list-item">
                <div className="list-name" onClick={() => onSelectList(list)}>
                  {list.length > 10 ? `${list.substring(0, 10)}...` : list}
                </div>
                <div className="list-controls">
                  <EditButton onClick={(e) => { e.stopPropagation(); onOpenEditModal(list); }} />
                  <DeleteButton onClick={(e) => { e.stopPropagation(); onDeleteList(list); }} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
