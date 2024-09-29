import React from 'react';
import './EndGameModal.css'; // Optional CSS for styling the modal
import { useNavigate } from 'react-router-dom';

interface ModalProps {
    message: string;
    onRematch: () => void;
}

const Modal: React.FC<ModalProps> = ({ message, onRematch }) => {
  const navigate = useNavigate();

  const toMenu = () => { navigate('/'); }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Game Over!</h2>
        <p>{message}</p>
        <button onClick={toMenu}>Menu</button>
        <button onClick={onRematch}>Rematch</button>
      </div>
    </div>
  );
};

interface EndGameModalProps {
    winner: string;
    onRematch: () => void;
}

const EndGameModal: React.FC<EndGameModalProps> = ( {winner, onRematch}) => {
  return (
    <div>
      <Modal 
        message={`${winner} wins the game!`} 
        onRematch={onRematch}
      />
    </div>
  );
};

export default EndGameModal;
