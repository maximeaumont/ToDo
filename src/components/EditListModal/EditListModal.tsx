import React, { useState, useEffect } from 'react';
import './EditListModal.css';

interface EditListModalProps {
  isOpen: boolean;
  onClose: () => void;
  listName: string;
  onSave: (updatedListName: string) => void;
}

const EditListModal: React.FC<EditListModalProps> = ({ isOpen, onClose, listName, onSave }) => {
  const [updatedListName, setUpdatedListName] = useState(listName);

  useEffect(() => {
    setUpdatedListName(listName);
  }, [listName]);

  const handleSave = () => {
    onSave(updatedListName);
    onClose();
  };

  return (
    <div className={`edit-task-modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span onClick={onClose} className="close-button">&times;</span>
        <h2>Modifier le nom de la liste</h2>
        <div className="label-container">
          <label>Nouveau nom de la liste:</label>
        </div>
        <div className="input-container">
          <input
            type="text"
            value={updatedListName}
            onChange={(e) => setUpdatedListName(e.target.value)}
          />
        </div>
        <div className="button-container">
          <button onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default EditListModal;
