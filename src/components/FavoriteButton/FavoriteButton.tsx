// FavoriteButton.tsx
import React from 'react';
import './FavoriteButton.css';

interface FavoriteButtonProps {
  onClick: (e: React.MouseEvent) => void;
  isFavorite: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ onClick, isFavorite }) => {
  const buttonClass = `favorite-button ${isFavorite ? 'is-favorite' : ''}`;

  return (
    <button className={buttonClass} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
        {isFavorite ? (
          // Icône d'étoile pleine pour les favoris
          <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.6 8.5-50.8-17.7-54.6l-146.1-21.3L316.7 17.8c-11.7-23.6-45.6-23.6-57.4 0z" />
        ) : (
          // Icône d'étoile vide pour non-favoris
          <path d="M528.1 171.5l-146.1-21.3L316.7 17.8c-11.7-23.6-45.6-23.6-57.4 0l-65.3 132.4L47.9 171.5c-26.2 3.8-36.7 36-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.6 8.5-50.8-17.7-54.6z" />
          )}
          </svg>
          </button>
          );
          };
          
          export default FavoriteButton;
