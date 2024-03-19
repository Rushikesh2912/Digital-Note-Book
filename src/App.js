import './App.css';
import React from "react";
import Home from "./Components/Home";
import About from "./Components/About";
import Navbar from './Components/Navbar';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './Context/notes/NoteState';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert = {alert}/>
          <Routes>
            <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
            <Route exact path="/about" element={<About showAlert={showAlert} />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<SignUp showAlert={showAlert} />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
