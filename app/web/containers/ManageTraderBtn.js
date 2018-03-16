import React from 'react';
import {Button, Modal, Table, Checkbox} from 'antd';

class ManageTraderBtn extends React.Component {
  static defaultProps = {
    title: '参数设置'
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      data: [
        {key: 0, item: '交易方向', current: false, history: false},
        {key: 1, item: '投资偏好', current: false, history: false},
        {key: 2, item: '销售能力', current: false, history: false},
        {key: 3, item: '交易记录', current: false, history: false},
        {key: 4, item: '流动性', current: false, history: false},
        {key: 5, item: '期限', current: false, history: false},
        {key: 6, item: '评级', current: false, history: false}
      ]
    };
    this.columns = [
      {key: 'item', dataIndex: 'item', title: '', className: 'strong'},
      {key: 'current', dataIndex: 'current', title: '当日', className: 'center', render: this.renderCurrent},
      {key: 'history', dataIndex: 'history', title: '历史', className: 'center', render: this.renderHistory}
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    const stateKey = Object.keys(nextState).find(k => nextState[k] !== this.state[k]);
    return stateKey !== undefined;
  }

  renderCurrent = (text, record, index) => <Checkbox checked={text} onChange={this.handleChange('current', index)} />;

  renderHistory = (text, record, index) => <Checkbox checked={text} onChange={this.handleChange('history', index)} />;

  handleChange = (key, index) => {
    return e => {
      const data = [...this.state.data];
      data[index][key] = e.target.checked;
      this.setState({data});
    };
  };

  handleClick = () => {
    this.setState({open: true});
  };

  handleOk = () => {
    this.setState({open: false});
  };

  render() {
    const {title} = this.props;
    const {open, data} = this.state;
    const props = {
      title,
      visible: open,
      onCancel: this.handleOk,
      footer: [<Button key='submit' type='primary' onClick={this.handleOk}>OK</Button>]
    };

    return (
      <div className='manage-trader-btn'>
        <Button type='primary' onClick={this.handleClick}>{title}</Button>
        <Modal {...props}>
          <Table
            dataSource={data}
            columns={this.columns}
            bordered
            size='small'
            pagination={false} />
        </Modal>
      </div>
    );
  }
}

export default ManageTraderBtn;
