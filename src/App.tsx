import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './Register'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
