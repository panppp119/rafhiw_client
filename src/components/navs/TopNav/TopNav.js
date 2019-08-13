import React from 'react'
import { Link } from 'react-router-dom'
import { FaOpencart, FaCommentDots, FaBell, FaUser } from 'react-icons/fa'

import './TopNav.scss'

class TopNav extends React.Component {
  render () {
    return (
      <div id="top-nav">
        <div className="mobile">
          <ul>
            <li className='search'>ค้นหา</li>
            <li><Link to='/'><FaOpencart /></Link></li>
            <li><Link to='/'><FaCommentDots /></Link></li>
          </ul>
        </div>

        <div className="desktop">
          <div className="first">
            <ul className='container'>
              <li className='display'>การแสดงผล</li>
              <li className='empty' />
              <li><Link to='/'><FaUser /></Link></li>
              <li><Link to='/'><FaBell /></Link></li>
            </ul>
          </div>

          <div className="second">
            <ul className='container'>
              <li className='logo'><Link to='/'>โลโก้</Link></li>
              <li className='search'>ค้นหา</li>
              <li><Link to='/'><FaOpencart /></Link></li>
            </ul>
          </div>

          <div className="third">
            <ul className='container'>
              <li><Link to='/'>หน้าหลัก</Link></li>
              <li>สินค้ายอดฮิต</li>
              <li>งานลดราคา</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default TopNav
