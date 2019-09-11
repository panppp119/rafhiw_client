import React from 'react'
import { FaTimes } from 'react-icons/fa'

import './Modal.scss'

class Modal extends React.Component {
  handleClick = (e) => {
    this.props.close()
  }

  render () {
    return (
      <div className="modal" onClick={this.handleClick}>
        <div className="frame" onClick={(e) => e.stopPropagation()}>
          <FaTimes className='exit' onClick={this.handleClick} />
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Modal
