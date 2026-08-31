import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Jab bhi user domain open kare (localhost:5173/), wo direct Login page par chala jaye */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login page (lowercase /login kar diya hai) */}
        <Route path="/login" element={<Login />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App