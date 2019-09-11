import React from 'react'

import './Modal.scss'

class Modal extends React.Component {
  render () {
    return (
      <div className="modal">
        <div className="frame">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
