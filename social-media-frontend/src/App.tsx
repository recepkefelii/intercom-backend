import React from 'react';

import Home from './page/Home';
import LoginPage from './page/LoginPage';
import RegisterPage from './page/Register-Page';
import { Route, Router, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
