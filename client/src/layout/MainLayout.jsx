import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import React from 'react'

const MainLayout = () => {
  return (
    <div>
        <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout