import React from 'react'

// import FlashMessage from 'components/FlashMessage';
import { StoreTopNav, BottomNav } from 'components/navs'

import './StoreLayout.scss'

class StoreLayout extends React.Component {
  render () {
    return (
      <div className="store-layout">
        <StoreTopNav />
        {/* <FlashMessage /> */}

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

export default StoreLayout
