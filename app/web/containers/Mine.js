import '../themes/Mine.less';
import React from 'react';
import {connect} from 'react-redux';
import {Table} from 'antd';
import Types from '../actions';
import {handleResponse} from '../utils/tool';
import EditCell from './EditCell';

class Mine extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {key: 'term', dataIndex: 'term', title: '剩余期限', width: 54},
      {key: 'code', dataIndex: 'code', title: '债券代码', width: 50},
      {key: 'name', dataIndex: 'name', title: '债券简称', width: 70},
      {key: 'direction', dataIndex: 'direction', title: '方向', width: 40},
      {
        key: 'price',
        dataIndex: 'price',
        title: '价格',
        width: 50,
        className: 'relative',
        render: text => <EditCell value={text} />
      },
      {
        key: 'quantity',
        dataIndex: 'quantity',
        title: '持仓量',
        width: 55,
        className: 'relative',
        render: text => <EditCell value={text} />
      },
      {key: 'valuation', dataIndex: 'valuation', title: '中债估值', width: 50},
      {key: 'duration', dataIndex: 'duration', title: '久期', width: 50},
      {key: 'rating', dataIndex: 'rating', title: '主债评级', width: 60},
      {key: 'time', dataIndex: 'time', title: '时间', width: 70},
      {key: 'source', dataIndex: 'source', title: '来源', width: 50},
      {key: 'mode', dataIndex: 'mode', title: '方式', width: 40}
    ];
    this.state = {
      quotes: []
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: Types.MINE});
  }

  componentWillReceiveProps(nextProps) {
    const {quotes} = nextProps;
    if (quotes !== this.props.quotes) {
      handleResponse(quotes, result => {
        this.setState({quotes: result});
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {quotes} = nextState;
    return quotes !== this.state.quotes;
  }

  render() {
    const {quotes} = this.state;
    return (
      <div className='content' style={{padding: '0px 8px'}}>
        <Table
          dataSource={quotes}
          columns={this.columns}
          size='middle'
          bordered />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quotes: state.mine
  };
}

export default connect(mapStateToProps)(Mine);
