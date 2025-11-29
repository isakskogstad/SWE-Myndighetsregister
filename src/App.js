import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Mina React-komponenter</h1>
        <p>Detta är en enkel komponent som visas på GitHub Pages!</p>
        <button onClick={() => alert('Hej från React!')}>Klicka mig</button>
      </header>
    </div>
  );
}

export default App;