import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home'; 
import Login from './Components/Login'; 
import SignUp from './Components/SignUp'; 
import Update from './Components/Update'; 
import MainPage from './Components/MainPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/"                       element={<Home/>} />
          <Route path="/Login"                  element={<Login/>}/>
          <Route path='/Signup'                 element={<SignUp/>}/>               
          <Route path="/Update"                 element={<Update/>}/>
          <Route path="/MainPage"               element={<MainPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
