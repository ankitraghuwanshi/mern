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
import Loader from './pages/Loader'
import SingleMovie from './pages/SingleMovie'
import BookShow from './pages/BookShow'

function App() {
  
  return (
    <Provider store={store}>
      <Loader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
          <Route path='/home' element={<ProtectedRoute> <Admin /> </ProtectedRoute>}/>
          <Route path='/partner' element={<ProtectedRoute> <Partner /> </ProtectedRoute>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path="/movie/:id" element={<ProtectedRoute><SingleMovie/></ProtectedRoute>} />
          <Route path="/book-show/:id" element={<ProtectedRoute><BookShow /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
