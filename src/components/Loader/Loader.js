import React from 'react'

import './Loader.scss'

class Loader extends React.Component {
  static defaultProps = {
    size: 30
  }

  render () {
    const { loading, size } = this.props

    return (
      <div className='loader'>
        {
          loading && (
            <div className="load" style={{
              width: size,
              height: size
            }} />
          )
        }

        {
          !loading && (
            this.props.children
          )
        }
      </div>
    )
  }
}

export default Loader
