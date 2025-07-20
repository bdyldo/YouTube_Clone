import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import type { SidebarProps } from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed'

const Home = ({sidebar}: SidebarProps) => {
  return (
    <>
      <Sidebar sidebar = {sidebar}/>
      <div className={`container ${sidebar?"":'large-container'}`}>
        <Feed/>
      </div>
    </>
  )
}

export default Home