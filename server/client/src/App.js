import logo from './logo.svg';
import './App.css';
import { Main } from './main';
import React, { Component }  from 'react';
import { AllClubs } from './components/allClubs';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClubInfo from './components/clubInfo';
import { Feed } from './components/feed';
import EventInfo from './components/eventInfo';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    //<Main></Main>
<BrowserRouter>
      <Routes>
        <Route path="/" element={<Feed />}></Route>
        <Route path="/clubs" element={<AllClubs />}></Route>
        <Route path="/clubinfo" element={<ClubInfo />}></Route>
        <Route path="/eventinfo" element={<EventInfo />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
