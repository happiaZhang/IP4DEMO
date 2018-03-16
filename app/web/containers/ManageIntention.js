import '../themes/ManageIntention.less';
import React from 'react';
import {connect} from 'react-redux';
import {Button, Table, Checkbox, Input, Upload} from 'antd';
import NewQuote from './NewQuote';
import {handleResponse} from '../utils/tool';
import Types from '../actions';

const {TextArea} = Input;
class ManageIntention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.columns = [
      {key: 'term', dataIndex: 'term', title: '期限', width: 54},
      {key: 'code', dataIndex: 'code', title: '代码', width: 55},
      {key: 'name', dataIndex: 'name', title: '名称', width: 70},
      {key: 'direction', dataIndex: 'direction', title: '方向', width: 40},
      {key: 'price', dataIndex: 'price', title: '价格', width: 50},
      {key: 'volume', dataIndex: 'volume', title: '持仓量', width: 55},
      {key: 'rating', dataIndex: 'rating', title: '主债评级', width: 60},
      {key: 'duration', dataIndex: 'duration', title: '久期', width: 50},
      {key: 'valuation', dataIndex: 'valuation', title: '中债估值', width: 50},
      {key: 'trader', dataIndex: 'trader', title: '对手方数量', width: 60},
      {key: 'real', dataIndex: 'real', title: '实名', width: 40, render: this.renderReal}
    ];
  }

  renderReal = text => <Checkbox defaultChecked={text} />;

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    if (data !== this.props.data) {
      handleResponse(data, result => {
        this.setState({data: result});
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey !== undefined;
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: Types.INTENTION});
  }

  handleNew = () => {
    const {dispatch} = this.props;
    dispatch({
      type: Types.MODAL,
      payload: {
        component: NewQuote,
        title: '新增报价',
        visible: true
      }
    });
  };

  handleText = () => {
    const {dispatch} = this.props;
    dispatch({
      type: Types.MODAL,
      payload: {
        component: TextArea,
        props: {
          placeholder: '请将需要识别的文本粘贴至此处',
          rows: 8
        },
        title: '文本识别',
        visible: true,
        footer: [<Button key='submit' type='primary' onClick={this.onRead}>识别</Button>]
      }
    });
  };

  onRead = () => {
    const {dispatch} = this.props;
    dispatch({
      type: Types.MODAL,
      payload: {
        visible: false
      }
    });
  };

  render() {
    return (
      <div className='manage-intention'>
        <div className='manage-intention-tool'>
          <Button type='primary' onClick={this.handleNew}>新增</Button>
          <Button type='primary' onClick={this.handleText}>文本识别</Button>
          <Upload><Button type='primary'>Excel导入</Button></Upload>
        </div>
        <div className='manage-intention-quote'>
          <Table
            size='middle'
            dataSource={this.state.data}
            columns={this.columns}
            pagination={false}
            bordered />
        </div>
        <div className='manage-intention-footer'>
          <Button type='primary'>一键发布</Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.manage.intention
  };
}

export default connect(mapStateToProps)(ManageIntention);
