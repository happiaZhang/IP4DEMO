import React, {PureComponent} from 'react';
import {Icon} from 'antd';

class ChatEntry extends PureComponent {
  handleClick = () => {
    const {onActive} = this.props;
    onActive && onActive();
  };

  render() {
    const {isActive} = this.props;
    return (
      <div className='chat-entry'>
        <span className='chat-badge'>5</span>
        <a className='chat-control' onClick={this.handleClick}>
          <Icon type={isActive ? 'close' : 'wechat'} />
        </a>
      </div>
    );
  }
}

export default ChatEntry;
