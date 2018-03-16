import '../themes/EditCell.less';
import React from 'react';
import {Input} from 'antd';

class EditCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      value: props.value
    };
  }

  handleClick = () => {
    this.setState({editing: true});
  };

  handleBlur = (e) => {
    const value = e.target.value;
    this.setState({editing: false, value});
  };

  render() {
    const {editing, value} = this.state;
    const props = {className: 'cell-wrap'};
    if (!editing) props.onClick = this.handleClick;

    return (
      <div {...props}>
        {editing
          ? <Input size='small' defaultValue={value} autoFocus onBlur={this.handleBlur} />
          : value}
      </div>
    );
  }
}

export default EditCell;
