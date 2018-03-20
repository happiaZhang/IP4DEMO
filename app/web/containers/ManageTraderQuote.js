import React from 'react';
import {connect} from 'react-redux';
import {Table, Icon} from 'antd';
import Filter from '../components/Filter';
import Types from '../actions';
import {handleResponse} from '../utils/tool';
import {friends} from '../config';

const FILTER_MATCHED_CURRENT = [
  {key: 0, text: '当日精确匹配'},
  {key: 1, text: '当日模糊匹配'}
];

const FILTER_MATCHED_HISTORY = [
  {key: 0, text: '历史精确匹配'},
  {key: 1, text: '历史模糊匹配'}
];

class ManageTraderQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.exact = true;
    this.columns = [
      {key: 'time', dataIndex: 'time', title: '时间', width: 70},
      {key: 'term', dataIndex: 'term', title: '期限', width: 45},
      {key: 'code', dataIndex: 'code', title: '代码', width: 50},
      {key: 'direction', dataIndex: 'direction', title: '方向', width: 40},
      {key: 'price', dataIndex: 'price', title: '价格', width: 55},
      {key: 'volume', dataIndex: 'volume', title: 'Vol.', width: 55},
      {key: 'valuation', dataIndex: 'valuation', title: '中债估值', width: 55},
      {key: 'trader', dataIndex: 'trader', title: '对手方', width: 90, render: this.renderTrader},
      {key: 'availableCredit', dataIndex: 'availableCredit', title: '剩余额度', width: 60},
      {key: 'transactions', dataIndex: 'transactions', title: '成交次数', width: 60},
      {key: 'blackList', dataIndex: 'blackList', title: '黑名单', width: 40, render: text => text ? '是' : '否'}
    ];
  }

  renderTrader = text => {
    const hasSplit = text.indexOf('-') > -1;
    const friend = hasSplit ? text.split('-')[1] : text;
    return (
      <div className='trader' onClick={this.handleClick.bind(this, friend)}>
        <Icon type='message' />
        {text}
      </div>
    );
  };

  handleClick = text => {
    const friend = friends.find(f => (f.name === text)).code;
    const {dispatch} = this.props;
    dispatch({type: Types.FRIEND, payload: {friend}});
  };

  handleChange = (exact) => {
    const {activeBond} = this.props;
    this.exact = exact === 0;
    this.onLoad(activeBond, this.exact);
  };

  onLoad = (code, exact) => {
    const {type, dispatch} = this.props;
    dispatch({
      type: type === 'current' ? Types.CURRENT : Types.HISTORY,
      payload: {code, exact}
    });
  };

  componentWillReceiveProps(nextProps) {
    const {activeBond, type, current, history} = nextProps;
    if (activeBond && activeBond !== this.props.activeBond) {
      this.onLoad(activeBond, this.exact);
    }
    if (type === 'current' && current !== this.props.current) {
      handleResponse(current, result => {
        this.setState({data: result});
      });
    }
    if (type === 'history' && history !== this.props.history) {
      handleResponse(history, (result) => {
        this.setState({data: result});
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {data} = nextState;
    return data !== this.state.data;
  }

  render() {
    const {type} = this.props;
    const {data} = this.state;

    return (
      <div className='manage-trader-quote'>
        <Filter
          className='bond-matched'
          onChange={this.handleChange}
          items={type === 'current' ? FILTER_MATCHED_CURRENT : FILTER_MATCHED_HISTORY} />
        <Table columns={this.columns} size='small' dataSource={data} pagination={false} scroll={{y: 155}} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.manage.current,
    history: state.manage.history
  };
}

export default connect(mapStateToProps)(ManageTraderQuote);
