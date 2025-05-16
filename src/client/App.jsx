import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllItems from "./Components/AllItems";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<AllItems/>}/>
    </Routes>
  </div>;
}


export default App;
