import '../themes/ManageQuery.less';
import React from 'react';
import {connect} from 'react-redux';
import {DatePicker, Radio, Table} from 'antd';
import FormGroup from '../components/FormGroup';
import Types from '../actions';
import {handleResponse} from '../utils/tool';
const RangePicker = DatePicker.RangePicker;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const STATUS = {
  all: '全部状态',
  waiting: '待我回复',
  pending: '待对方回复',
  close: '已关闭'
};

class ManageQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.columns = [
      {key: 'code', dataIndex: 'code', title: '债券代码', width: 55},
      {key: 'name', dataIndex: 'name', title: '债券名称', width: 70},
      {key: 'direction', dataIndex: 'direction', title: '方向', width: 45},
      {key: 'price', dataIndex: 'price', title: '价格', width: 50},
      {key: 'volume', dataIndex: 'volume', title: '报价量', width: 50},
      {key: 'trader', dataIndex: 'trader', title: '对手方', width: 75},
      {key: 'status', dataIndex: 'status', title: '状态', width: 70, render: text => STATUS[text]},
      {key: 'lastTime', dataIndex: 'lastTime', title: '最后对话时间', width: 75}
    ];
  }

  handleChange = (e) => {
    const status = e.target.value;
    const {dispatch} = this.props;
    dispatch({type: Types.QUERY, payload: {status}});
  };

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: Types.QUERY, payload: {status: 'all'}});
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (data !== this.props.data) {
      handleResponse(data, result => {
        this.setState({data: result});
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {data} = nextState;
    return data !== this.state.data;
  }

  renderStatus = () => {
    const result = [];
    Object.keys(STATUS).forEach(k => {
      result.push(<RadioButton key={k} value={k}>{STATUS[k]}</RadioButton>);
    });
    return result;
  };

  render() {
    return (
      <div className='manage-query'>
        <div className='manage-query-date'>
          <FormGroup label='日期' type={RangePicker} />
        </div>
        <div className='manage-query-tab'>
          <RadioGroup onChange={this.handleChange} defaultValue='all'>
            {this.renderStatus()}
          </RadioGroup>
        </div>
        <Table
          dataSource={this.state.data}
          columns={this.columns}
          size='middle'
          pagination={false}
          bordered />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.manage.query
  };
}

export default connect(mapStateToProps)(ManageQuery);
