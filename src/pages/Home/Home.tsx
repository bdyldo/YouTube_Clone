import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import type { SidebarProps } from '../../Components/Sidebar/Sidebar';

const Home = ({sidebar}: SidebarProps) => {
  return (
    <>
      <Sidebar sidebar = {sidebar}/>
    </>
  )
}

export default Home