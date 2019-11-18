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
      let app = db.ref(`/chats/user_${this.props.user.get('id')}`);

      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.isEmpty() && prevProps.user !== this.props.user) {
      let app = db.ref(`/chats/user_${this.props.user.get('id')}`);

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

    let new_messages = messages.map(msg => {
      const key = msg.key;
      delete msg.key;

      const ms = msg;
      const messages = _(ms)
        .keys()
        .map(msgKey => {
          let cloned = _.clone(ms[msgKey]);
          cloned.key = msgKey;

          return cloned;
        })
        .value();

      return { key, messages };
    });

    this.setState({
      messages: new_messages
    });
  }

  handleClick = e => {
    this.props.handleClickChat(!this.props.showChat);
  };

  onChange = e => {
    this.setState({ msg: e.target.value });
  };

  onKeyup = e => {
    e.preventDefault();

    if (e.keyCode === 13 && trim(this.state.msg) !== '') {
      var user_id = this.props.user.get('id');
      var seller_id = this.props.seller.get('id');

      let dbUser = db.ref(`/chats/user_${user_id}/seller_${seller_id}`);
      let dbSeller = db.ref(`/chats/seller_${seller_id}/user_${user_id}`);

      dbUser.push({
        message: trim(this.state.msg),
        sender: 'user_' + this.props.user.get('id')
      });

      dbSeller.push({
        message: trim(this.state.msg),
        sender: 'user_' + this.props.user.get('id')
      });

      this.setState({ msg: '' });
    }
  };

  render() {
    const { messages } = this.state;
    const { showChat, seller, user } = this.props;

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
            {messages.map((message, i) => {
              const messages = message.messages;

              return messages.map((msg, si) => {
                return (
                  <div
                    className="message"
                    style={{
                      textAlign:
                        msg.sender === `user_${user.get('id')}` && 'right'
                    }}
                  >
                    {msg.message}
                  </div>
                );
              });
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
