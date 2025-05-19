import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllItems from "./Components/AllItems";
import SingleItem from "./Components/SingleItem";

function App() {
  return <div className="App">
    <Routes>
      <Route path="/" element={<AllItems/>}/>
      <Route path="/:id" element={<SingleItem/>}/>
    </Routes>
  </div>;
}


export default App;
