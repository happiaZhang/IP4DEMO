import React from 'react';
import {connect} from 'react-redux';
import {Modal} from 'antd';

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentWillReceiveProps(nextProps) {
    const {data} = nextProps;
    const {visible} = data;
    if (visible !== this.state.visible) {
      this.setState({visible});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {visible} = nextState;
    return visible !== this.state.visible;
  }

  handleCancel = () => {
    this.setState({visible: false});
  };

  render() {
    const {visible} = this.state;
    const {data} = this.props;
    const {component, title, props, footer} = data;
    const modalProps = {
      visible,
      title,
      onCancel: this.handleCancel,
      onOk: this.handleCancel
    };

    if (footer) modalProps.footer = footer;

    return (
      <Modal {...modalProps}>
        {component ? React.createElement(component, props) : null}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.modal
  };
}

export default connect(mapStateToProps)(ModalContainer);
