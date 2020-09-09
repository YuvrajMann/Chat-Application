import React from "react";
import "./App.css";
import Main from "./Components/MainComponent";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Main></Main>
      </BrowserRouter>
    </div>
  );
}

export default App;
