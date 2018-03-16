import React, {PureComponent} from 'react';
import {Input} from 'antd';
import {friends} from '../config';
import {getTime, isEmpty} from '../utils/tool';

const Search = Input.Search;
class ChatPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sendText: ''
    };
  }

  handleClick = (friend) => {
    const {onSelectFriend} = this.props;
    onSelectFriend && onSelectFriend(friend);
  };

  renderContent = () => {
    const {msgList} = this.props;
    return (
      <div className='chat-content'>
        {
          msgList.map((msg, key) => {
            const {type, content, time} = msg;
            let classnames = 'chat-section ';
            type === 'from' ? classnames += 'chat-left' : classnames += 'chat-right';
            return (
              <div key={key} className={classnames}>
                <small>{time}</small>
                <div className='chat-msg'>{content}</div>
              </div>
            );
          })
        }
      </div>
    );
  };

  renderFriends = () => {
    const {friend} = this.props;
    return (
      <ul className='chat-friends'>
        {
          friends.map((f, key) => {
            const props = {key};
            if (f.code === friend) {
              props.className = 'selected';
            } else {
              props.onClick = this.handleClick.bind(this, f.code);
            }

            return (
              <li {...props}>
                <span className='chat-label'>{key + 1}</span>{f.name}
              </li>
            );
          })
        }
      </ul>
    );
  };

  onSend = (content) => {
    if (!isEmpty(content)) {
      this.setState({sendText: ''});
      const {onSendMsg} = this.props;
      onSendMsg && onSendMsg({
        type: 'to',
        time: getTime(),
        content
      });
    }
  };

  handleChange = (e) => {
    this.setState({sendText: e.target.value});
  };

  render() {
    const {isActive, friend} = this.props;
    if (!isActive) return null;

    const {sendText} = this.state;
    const name = friends.find(f => (f.code === friend)).name;
    return (
      <div className='chat-panel'>
        <div className='chat-room'>
          <div className='chat-heading'>{name}</div>
          {this.renderContent()}
          <div className='chat-form'>
            <Search enterButton='Send' onSearch={this.onSend} value={sendText} onChange={this.handleChange} />
          </div>
        </div>
        <div className='chat-board'>
          <h5 className='chat-title'>好友列表</h5>
          <div className='chat-body'>
            {this.renderFriends()}
          </div>
        </div>
      </div>
    );
  }
}

export default ChatPanel;
