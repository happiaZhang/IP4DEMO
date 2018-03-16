import '../themes/QuoteList.less';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Icon} from 'antd';
import Types from '../actions';
import {friends} from '../config';

class QuoteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: []
    };
    this.columns = [
      {key: 'term', dataIndex: 'term', title: '期限'},
      {key: 'code', dataIndex: 'code', title: '代码'},
      {key: 'name', dataIndex: 'name', title: '名称'},
      {key: 'direction', dataIndex: 'direction', title: '方向', render: this.renderDirection},
      {key: 'price', dataIndex: 'price', title: '报价', render: this.renderQuote},
      {key: 'instRate', dataIndex: 'instRate', title: '主债评级', render: this.renderRate},
      {key: 'instName', dataIndex: 'instName', title: '客户机构'},
      {key: 'trader', dataIndex: 'trader', title: '客户姓名', render: this.renderTrader},
      {key: 'time', dataIndex: 'time', title: '时间'}
    ];
  }

  renderDirection = (text) => {
    return <span className={'direction ' + text.toUpperCase()}>{text}</span>;
  };

  renderQuote = (text, record) => {
    const {price, quantity} = record;
    return this.renderDichotomy(price, quantity);
  };

  renderRate = (text, record) => {
    const {instRate, bondRate} = record;
    return this.renderDichotomy(instRate, bondRate);
  };

  renderDichotomy = (left, right) => (
    <div>
      <span className='fixed-side'>{left}</span>/{right}
    </div>
  );

  renderTrader = (text) => (
    <div className='trader' onClick={this.handleClick.bind(this, text)}>
      <Icon type='message' />
      {text}
    </div>
  );

  handleClick = (text) => {
    const friend = friends.find(f => (f.name === text)).code;
    const {dispatch} = this.props;
    dispatch({type: Types.FRIEND, payload: {friend}});
  };

  setRowClass = (record) => {
    const {needFlash} = record;
    return needFlash ? 'flash' : '';
  };

  componentWillReceiveProps(nextProps) {
    const {quotes, receive} = nextProps;
    if (quotes !== this.props.quotes) {
      const {loading, success, result} = quotes;
      if (!loading && success) this.setState({quotes: result});
    }
    if (receive !== this.props.receive) {
      const {loading, success, result} = receive;
      if (!loading && success) {
        this.setState(prevState => {
          const quotes = [result].concat(prevState.quotes);
          return {quotes};
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {quotes} = nextState;
    return quotes !== this.state.quotes;
  }

  render() {
    const {quotes} = this.state;
    return <Table rowClassName={this.setRowClass} dataSource={quotes} columns={this.columns} size='middle' />;
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.quote,
    receive: state.receive
  };
}

export default connect(mapStateToProps)(QuoteList);
