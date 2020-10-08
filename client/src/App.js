import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './components/users/users'
import Posts from './components/posts/posts'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Users/>
      </header>
    </div>
  );
}

export default App;
