import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout = () => {
  return (
	<>
	<Navbar/>
	<ScrollToTop/>
	<Outlet/>
	</>
  )
}

export default MainLayout
