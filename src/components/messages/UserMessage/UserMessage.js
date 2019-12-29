import React from 'react';
import trim from 'trim';
import _ from 'lodash';
import { FaMinus, FaCommentDots } from 'react-icons/fa'

import firebase from 'components/Firebase';

import './UserMessage.scss';

const db = firebase.database();

class UserMessage extends React.Component {
  state = {
    messages: [],
    msg: '',
    index: 0
  };

  componentDidMount() {
    if (!this.props.user.isEmpty()) {
      const user_id = this.props.user.get('id')
      const seller_id = this.props.seller && this.props.seller.get('id')
      const app = db.ref(`users/${user_id}/${seller_id}`);

      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seller !== this.props.seller) {
      const user_id = this.props.user.get('id')
      const seller_id = this.props.seller.get('id')
      const app = db.ref(`users/${user_id}/${seller_id}`);

      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });
    }
  }

  getData(values) {
    let messagesVal = values;
    let messages = _(messagesVal)
      .keys()
      .map(msgKey => {
        let cloned = _.clone(messagesVal[msgKey]);
        cloned.key = msgKey;
        return cloned;
      })
      .value();

    this.setState({
      messages: messages
    });
  }

  handleClick = e => {
    this.props.handleClickChat(!this.props.showChat)
  };

  onChange = e => {
    this.setState({ msg: e.target.value });
  };

  onKeyup = e => {
    e.preventDefault();

    if (e.keyCode === 13 && trim(this.state.msg) !== '') {
      var user_id = this.props.user.get('id');
      var seller_id = this.props.seller.get('id');

      let userRefs = db.ref(`users/${user_id}`);
      let sellerRefs = db.ref(`seller/${seller_id}`);

      userRefs.child(seller_id).push({
        sender: {
          id: user_id,
          name: this.props.user.get('first_name')
        },
        created: new Date(),
        message: trim(this.state.msg),
      });

      sellerRefs.child(user_id).push({
        sender: {
          id: user_id,
          name: this.props.user.get('first_name')
        },
        created: new Date(),
        message: trim(this.state.msg),
      });

      this.setState({ msg: '' });
    }
  };

  render() {
    const { messages } = this.state;
    const { showChat, seller, user } = this.props;

    console.log(showChat)

    return showChat ? (
      <div className="chat">
        <div className="chat-name">
          <h4>
            {seller.get('first_name')}{' '}
            <FaMinus onClick={this.handleClick} />
          </h4>
        </div>

        <div className="messages">
          <div className="lists">
            {messages.sort((a, b) => b.date - a.date).map((message, i) => {
              return (
                <div key={i}
                  className="message"
                  style={{
                    textAlign:
                      message.sender.id === user.get('id') && 'right'
                  }}
                >
                  {message.message}
                </div>
              );
            })}
          </div>

          <form>
            <textarea
              placeholder="Type a message"
              value={this.state.msg}
              onChange={this.onChange}
              onKeyUp={this.onKeyup}
            />
          </form>
        </div>
      </div>
    ) : (
      <div className="message-icon">
        <FaCommentDots
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default UserMessage;
