import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import './App.css';

const App: React.FC = () => {
  const [todoLists, setTodoLists] = useState<string[]>([]);
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  const addTodoList = (name: string) => {
    setTodoLists((prevLists) => [...prevLists, name]);
  };

  const toggleNavBar = () => {
    setIsNavBarVisible(!isNavBarVisible);
  };

  return (
    <div className="app">
      <header className="app-header">
        <button onClick={toggleNavBar} className="toggle-navbar">Toggle NavBar</button>
      </header>
      <main className={isNavBarVisible ? 'main with-navbar' : 'main'}>
        {isNavBarVisible && <NavBar todoLists={todoLists} addTodoList={addTodoList} />}
        {/* Here, you will later add other components like TodoList and Todo */}
      </main>
    </div>
  );
};

export default App;
