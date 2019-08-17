import React from 'react';

import './FlashMessage.scss'

class FlashMessage extends React.Component {
  render() {
    const { content, type, mount } = this.props;

    return (
      <div
        className="flash-message container"
        style={{ marginTop: 16, display: !mount && 'none' }}
      >
        <div className={`message ${type}`}>
          <p>{content}</p>
        </div>
      </div>
    );
  }
}

export default FlashMessage;
