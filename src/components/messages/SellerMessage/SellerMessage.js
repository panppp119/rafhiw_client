import React from 'react';
import trim from 'trim';
import _ from 'lodash';
import { Icon, Grid, List } from 'semantic-ui-react';

import firebase from 'components/Firebase';

import './SellerMessage.scss';

const db = firebase.database();

class SellerMessage extends React.Component {
  state = {
    messages: [],
    msg: '',
    index: 0
  };

  componentDidMount() {
    if (!this.props.seller.isEmpty()) {
      let app = db.ref(`/chats/seller_${this.props.seller.get('id')}`);

      app.on('value', snapshot => {
        this.getData(snapshot.val());
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.seller.isEmpty() && prevProps.seller !== this.props.seller) {
      let app = db.ref(`/chats/seller_${this.props.seller.get('id')}`);

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
      messages: new_messages,
      user: new_messages[0] ? new_messages[0].key : ''
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

    const { user } = this.state;

    if (e.keyCode === 13 && trim(this.state.msg) !== '') {
      var seller_id = this.props.seller.get('id');

      let dbUser = db.ref(`/chats/${user}/seller_${seller_id}`);
      let dbSeller = db.ref(`/chats/seller_${seller_id}/${user}`);

      dbUser.push({
        message: trim(this.state.msg),
        sender: 'seller_' + this.props.seller.get('id')
      });

      dbSeller.push({
        message: trim(this.state.msg),
        sender: 'seller_' + this.props.seller.get('id')
      });

      this.setState({ msg: '' });
    }
  };

  setIndex(key, name) {
    this.setState({
      index: key,
      user: name
    });
  }

  render() {
    const { messages } = this.state;
    const { showChat, seller } = this.props;

    return showChat ? (
      <div className="chat">
        <div className="chat-name">
          <h4>
            Chat
            <Icon name="minus" onClick={this.handleClick} />
          </h4>
        </div>

        <div className="messages">
          <Grid>
            <Grid.Column width={3}>
              <List>
                {messages.map((message, i) => {
                  return (
                    <List.Item
                      key={i}
                      className={this.state.index === i && 'active'}
                      onClick={() => this.setIndex(i, message.key)}
                    >
                      {message.key}
                    </List.Item>
                  );
                })}
              </List>
            </Grid.Column>
            <Grid.Column width={13}>
              <List className="lists">
                {messages.map((message, i) => {
                  const messages = message.messages;

                  return messages.map((msg, si) => {
                    if (this.state.index === i) {
                      return (
                        <div
                          key={si}
                          className="message"
                          style={{
                            textAlign:
                              msg.sender === `seller_${seller.get('id')}` &&
                              'right'
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
              </List>

              <form>
                <textarea
                  placeholder="Type a message"
                  value={this.state.msg}
                  onChange={this.onChange}
                  onKeyUp={this.onKeyup}
                />
              </form>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    ) : (
      <div className="message-icon">
        <Icon
          circular
          inverted
          name="chat"
          size="big"
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default SellerMessage;
