import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaFlag, FaList, FaBell, FaUser } from 'react-icons/fa'

import './BottomNav.scss'

class BottomNav extends React.Component {
  render () {
    return (
      <div id="bottom-nav">
        <div className="mobile">
          <ul>
            <li><Link to='/'><FaHome /></Link></li>
            <li><Link to='/events'><FaFlag /></Link></li>
            <li><Link to='/products'><FaList /></Link></li>
            <li><FaBell /></li>
            <li><Link to='/account'><FaUser /></Link></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default BottomNav
