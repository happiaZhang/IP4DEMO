import '../themes/FormGroup.less';
import React from 'react';

class FormGroup extends React.Component {
  render() {
    const {label, type, props, children} = this.props;
    return (
      <div className='form-group'>
        <label>{label + '：'}</label>
        {React.createElement(type, props, children)}
      </div>
    );
  }
}

export default FormGroup;
