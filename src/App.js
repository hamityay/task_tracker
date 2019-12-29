import React from 'react';
import './App.css';
import MainContainer from './containers/main_container'
import Nav from './containers/nav'

function App() {
  return (
    <div className="App">
      <Nav />
      <MainContainer />
    </div>
  );
}

export default App;
