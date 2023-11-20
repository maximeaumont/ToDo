// src/App/App.tsx

import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import './App.css';

const App = () => {
  const [navVisible, setNavVisible] = useState(false);

  return (
    <div className="App">
      <NavBar isVisible={navVisible} toggleVisibility={() => setNavVisible(!navVisible)} />
      {/* Autres composants de l'application */}
    </div>
  );
};

export default App;
