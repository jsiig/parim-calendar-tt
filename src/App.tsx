import React from 'react';
import Header from "./layout/Header";
import Body from "./layout/Body";
import './App.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Body>
        Here we go
      </Body>
    </div>
  );
}

export default App;
