import '../themes/FilterInput.less';
import React, {Component} from 'react';
import {Button, Input} from 'antd';

class FilterInput extends Component {
  constructor(props) {
    super(props);
    this.GT = 'gt';
    this.state = this.setDefaultValue(props);
  }

  setDefaultValue = (props) => {
    const result = {value: {}, operator: {}};
    const {items} = props;
    items.forEach(({key, operator}) => {
      result.value[key] = '';
      result.operator[key] = operator || 'lt';
    });
    return result;
  };

  handleClick = (key, isGT) => {
    const operator = {...this.state.operator};
    operator[key] = isGT ? 'gt' : 'lt';
    this.setState({operator});
  };

  handleChange = (key) => {
    return (e) => {
      const value = {...this.state.value};
      value[key] = e.target.value;
      this.setState({value});
    };
  };

  handleFilter = () => {
    const {value} = this.state;
    const {onChange} = this.props;
    onChange && onChange(value);
  };

  render() {
    const {items} = this.props;
    const {value, operator} = this.state;
    return (
      <div className='filter-input-wrap'>
        {
          items.map(({key, label}) => {
            const isGT = operator[key] === this.GT;
            return (
              <div key={key} className='filter-input-item'>
                <label>{label}</label>
                <Button type='primary' size='small' onClick={this.handleClick.bind(this, key, !isGT)}>{isGT ? '≥' : '≤'}</Button>
                <Input size='small' value={value[key]} onChange={this.handleChange(key)} />
              </div>
            );
          })
        }
        <div className='filter-input-btn'>
          <Button type='primary' size='small' onClick={this.handleFilter}>筛选</Button>
        </div>
      </div>
    );
  }
}

export default FilterInput;
