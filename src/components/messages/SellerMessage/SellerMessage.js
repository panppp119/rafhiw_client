import React from 'react';
import trim from 'trim';
import _ from 'lodash';
import { Map } from 'immutable'
import { FaMinus, FaCommentDots } from 'react-icons/fa'

import firebase from 'components/Firebase';

import './SellerMessage.scss';

const db = firebase.database();

class SellerMessage extends React.Component {
  static defaultProps = {
    seller: Map()
  }

  state = {
    messages: [],
    msg: '',
    index: 0
  };

  componentDidMount() {
    if (this.props.seller && !this.props.seller.isEmpty()) {
      let app = db.ref(`seller/${this.props.seller.get('id')}`);

      app.on('value', snapshot => {
        this.getData(snapshot);
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seller !== this.props.seller) {
      let app = db.ref(`seller/${this.props.seller.get('id')}`);

      app.on('value', snapshot => {
        this.getData(snapshot);
      });
    }
  }

  getData(snapshot) {
    let messages = this.state.messages || []

    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();

      let msg = _(childData)
        .keys()
        .map(msgKey => {
          let cloned = _.clone(childData[msgKey]);
          cloned.key = msgKey;
          return cloned;
        })
        .value();

      if (messages.findIndex(message => message.key === childKey) !== -1) {
        const index = messages.findIndex(message => message.key === childKey)
        messages[index] = { key: childKey, data: msg, name: msg[0].sender.name}
      }
      else {
        messages.push({ key: childKey, data: msg, name: msg[0].sender.name })
      }
    })
  }

  handleClick = e => {
    this.props.handleClickChat(!this.props.showChat);
  };

  onChange = e => {
    this.setState({ msg: e.target.value });
  };

  onKeyup = e => {
    e.preventDefault();

    const { key } = this.state;

    if (e.keyCode === 13 && trim(this.state.msg) !== '') {
      var user_id = key;
      var seller_id = this.props.seller.get('id');

      let userRefs = db.ref(`users/${user_id}`);
      let sellerRefs = db.ref(`seller/${seller_id}`);

      userRefs.child(seller_id).push({
        sender: {
          id: seller_id,
          name: this.props.seller.get('first_name')
        },
        created: new Date(),
        message: trim(this.state.msg),
      });

      sellerRefs.child(user_id).push({
        sender: {
          id: seller_id,
          name: this.props.seller.get('first_name')
        },
        created: new Date(),
        message: trim(this.state.msg),
      });

      this.setState({ msg: '' });
    }
  };

  setIndex(index, key) {
    this.setState({
      index: index,
      key: key
    });
  }

  render() {
    const { messages } = this.state;
    const { showChat, seller } = this.props;

    return showChat ? (
      <div className="chat seller">
        <div className="chat-name">
          <h4>
            Chat
            <FaMinus onClick={this.handleClick} />
          </h4>
        </div>

        <div className="messages">
          <div className="customers">
            <ul>
              {messages.map((message, i) => {
                return (
                  <li
                    key={i}
                    className={this.state.index === i && 'active'}
                    onClick={() => this.setIndex(i, message.key)}
                  >
                    [{message.key}]{message.name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lists">
            {messages.map((message, i) => {
              const data = message.data || [];

              return data.map((msg, si) => {
                if (this.state.index === i) {
                  return (
                    <div
                      key={si}
                      className="message"
                      style={{
                        textAlign:
                          parseInt(msg.sender.id) === seller.get('id') && 'right'
                      }}
                    >
                      {msg.message}
                    </div>
                  );
                } else {
                  return null;
                }
              });
            })}
          </div>
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
    ) : (
      <div className="message-icon">
        <FaCommentDots onClick={this.handleClick} />
      </div>
    );
  }
}

export default SellerMessage;
