import React from 'react';
import './App.css';
import ReactPlayer from "react-player"


function App() {
  const videoId = 'ug50zmP9I7s'
  return (
    <div className="App">
      <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} 
      onProgress={(arg) => console.log(arg)}/>
    </div>
  );
}

export default App;
