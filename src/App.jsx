import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import { Homepage } from './components/homepage'
import { Login } from './components/login'
import { Register } from './components/register'
import { Order } from './components/order'
import { UserDashboard } from './components/user-dashboard'
import { Restaurant } from './components/restaurant'
import { RestaurantDashboard } from './components/restaurant-dashboard'
import { AdminDashboard } from './components/admin-dashboard'

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Homepage />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/order/:id' element={<Order />}></Route>
        <Route path='/user/dashboard' element={ <UserDashboard /> }></Route>
        <Route path='/restaurant/:name' element={ <Restaurant /> }></Route>
        <Route path='/restaurant/dashboard' element={ <RestaurantDashboard /> }></Route>
        <Route path='/admin/dashboard' element = { <AdminDashboard /> }></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
