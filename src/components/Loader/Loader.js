import React from 'react'

import './Loader.scss'

class Loader extends React.Component {
  static defaultProps = {
    size: 30
  }
  
  render () {
    const { loading, size } = this.props

    if (loading) {
      return (
        <div className="loader" style={{
          width: size,
          height: size
        }} />
      )
    }
    else {
      return null
    }
  }
}

export default Loader
