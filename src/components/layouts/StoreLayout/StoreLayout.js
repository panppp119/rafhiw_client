import React from 'react'
import Helmet from 'react-helmet'

import FlashMessage from 'components/FlashMessage';
import { StoreTopNav, BottomNav } from 'components/navs'

import './StoreLayout.scss'

class StoreLayout extends React.Component {
  render () {
    const { flash_message } = this.props

    return (
      <div id="store-layout">
        <StoreTopNav />

        <Helmet title='Rafhiw Store' />

        <div className="layout-content">
          {flash_message && (
            <FlashMessage
              type={flash_message.get('type')}
              content={flash_message.get('text')}
              mount={!flash_message.isEmpty()}
            />
          )}

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
