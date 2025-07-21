import React from 'react'
import './video.css'
import PlayVideo from '../../../Components/PlayVideo/PlayVideo'
import Recommended from '../../../Components/Recommended/Recommended'

const video = () => {
  return (
    <div className='play-container'>
      <PlayVideo/>
      <Recommended/>
    </div>
  )
}

export default video