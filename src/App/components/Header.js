import React from 'react';
import logo from '../assets/logo.svg';


const Header = () => {
  return (
    <header className="App-header">
      <div className="App-title App-space">Welcome to Schedule App</div>
      <div className="App-space">Created by Magic, Powered by<img src={logo} className="App-logo" alt="logo" /></div>
    </header>
  );
}

export default Header;

