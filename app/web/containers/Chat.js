import '../themes/Chat.less';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ChatPanel from './ChatPanel';
import ChatEntry from './ChatEntry';
import {friends} from '../config';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      friend: friends[0].code,
      msgList: [...friends[0].msgList]
    };
  }

  onSelectFriend = (friend) => {
    const msgList = friends.find(f => (f.code === friend)).msgList;
    this.setState({friend, msgList: [...msgList]});
  };

  onSendMsg = (msg) => {
    const {friend} = this.state;
    const msgList = friends.find(f => (f.code === friend)).msgList;
    msgList.push(msg);
    this.setState({msgList: [...msgList]});
  };

  onActive = () => {
    const {isActive} = this.state;
    this.setState({isActive: !isActive});
  };

  componentWillReceiveProps(nextProps) {
    const {friend} = nextProps;
    if (friend !== this.state.friend) {
      this.setState({friend});
    }
    if (!this.state.isActive) {
      this.setState({isActive: true});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey != null;
  }

  render() {
    const {isActive, friend, msgList} = this.state;
    const panelProps = {
      isActive,
      friend,
      msgList,
      onSelectFriend: this.onSelectFriend,
      onSendMsg: this.onSendMsg
    };

    return (
      <div className='chat-box'>
        <ChatPanel {...panelProps} />
        <ChatEntry isActive={isActive} onActive={this.onActive} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friend: state.chat.friend
  };
}

export default connect(mapStateToProps)(Chat);
