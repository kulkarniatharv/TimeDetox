import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [value, setValue] = useState([]);
  const fetchreq = () => {
    fetch('/api/customers')
      .then(response => response.json())
      .then(json => {
        setValue(json);
        console.log(json);
      });
  };
  return (
    <div className="App">
      <button onClick={fetchreq} type="button">
        click
      </button>
    </div>
  );
}

export default App;
