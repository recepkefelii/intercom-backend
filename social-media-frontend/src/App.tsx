import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
}from "react-router-dom";
import Home from './page/Home';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    
    
  );
}

export default App;
