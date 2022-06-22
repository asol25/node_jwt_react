import React, { useEffect } from 'react'
import { Main } from './components/MainlLayout/Main';
import { Register } from './components/MainlLayout/Register';
import { Routes, Route, Link } from "react-router-dom";
const App: React.FC = () => {

  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
