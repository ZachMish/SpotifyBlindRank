import React, {useState} from "react";
import ListGroup from "./components/ListGroup";
import Spotify from "./components/Spotify";
import "./App.css"

function App(){
  const [numberSelected, setSelectedNumber] = useState(null);

  return(
    <div style={{display: "flex", justifyContent: "space-between", padding: "20px"}}>
      <div style={{width: "40%"}}>
      <h1>Rankings</h1>
      <ListGroup
      numberSelected = {numberSelected}
      onNumberClick = {setSelectedNumber}
      />
      </div>
      <div style={{width: "50%"}}>
      <h1>Search for your Artist</h1>
      <Spotify/>
      </div>
    </div>
  );
}

export default App;
