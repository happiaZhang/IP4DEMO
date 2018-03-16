import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'antd';
import Types from '../actions';

class ReceiveMsg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  handleClick = () => {
    this.setState({loading: true});
    this.timer && clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      const {dispatch} = this.props;
      dispatch({type: Types.RECEIVE});
    }, 2000);
  };

  componentWillReceiveProps(nextProps) {
    const {receive} = nextProps;
    if (receive !== this.props.receive) {
      const {loading} = receive;
      if (!loading) this.setState({loading});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {loading} = nextState;
    return loading !== this.state.loading;
  }

  render() {
    const {loading} = this.state;
    return <Button
      loading={loading}
      onClick={this.handleClick}
      style={{marginRight: 16}}>模拟新消息</Button>;
  }
}

function mapStateToProps(state) {
  return {
    receive: state.receive
  };
}

export default connect(mapStateToProps)(ReceiveMsg);
