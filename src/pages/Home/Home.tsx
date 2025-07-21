import React, {useState} from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import type { SidebarProps } from '../../Components/Sidebar/Sidebar';
import Feed from '../../Components/Feed/Feed'

const Home = ({sidebar}: SidebarProps) => {
  const [category, setCategory] = useState(0);
  return (
    <>
      <Sidebar sidebar = {sidebar} category = {category} setCategory = {setCategory}/>
      <div className={`container ${sidebar?"":'large-container'}`}>
        <Feed category = {category}/>
      </div>
    </>
  )
}

export default Home