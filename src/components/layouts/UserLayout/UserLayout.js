import React from 'react'

import { TopNav, BottomNav } from 'components/navs'

import './UserLayout.scss'

class UserLayout extends React.Component {
  render () {
    return (
      <div id="user-layout">
        <TopNav />

        <div className="layout-content">
          {this.props.children}
        </div>

        <div className="mobile">
          <BottomNav />
        </div>
      </div>
    )
  }
}

export default UserLayout
