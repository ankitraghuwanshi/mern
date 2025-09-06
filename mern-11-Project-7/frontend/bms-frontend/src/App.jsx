import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {Provider} from 'react-redux'
import store from './redux/store'
import ProtectedRoute from './pages/ProtectedRoute'
import Admin from './pages/Admin'
import Partner from './pages/Partner'

function App() {
  
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
          <Route path='/home' element={<ProtectedRoute> <Admin /> </ProtectedRoute>}/>
          <Route path='/partner' element={<ProtectedRoute> <Partner /> </ProtectedRoute>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
