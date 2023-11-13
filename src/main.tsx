// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App'; // Modifiez ici pour supprimer l'extension .tsx
import './index.css'; // Assurez-vous que le chemin vers index.css est correct

// Rendu de l'application React
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
