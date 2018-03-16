import '../themes/Filter.less';
import React, {Component} from 'react';

class Filter extends Component {
  static defaultProps = {
    isMulti: false
  };

  constructor(props) {
    super(props);
    this.all = 'ALL';
    this.setFinalItems(props);
    this.state = {
      value: this.setDefaultValue(props)
    };
  }

  componentWillReceiveProps(nextProps) {
    const {isMulti, value} = nextProps;
    if (!isMulti && value && value.length > 0 && value[0] !== this.state.value[0]) {
      this.setState({value: [...value]});
    }
  }

  setFinalItems = (props) => {
    const {isMulti, items, value} = props;
    if (isMulti) {
      if (items.findIndex(item => item.key === this.all) === -1) items.unshift({key: this.all, text: '全部'});
      if (!value) this.currentIsAll = true;
    }
  };

  setDefaultValue = (props) => {
    const {items, value} = props;
    if (items.length === 0) return [];
    return value ? [...value] : [items[0].key];
  };

  handleClick = (key, isActive) => {
    const {isMulti} = this.props;
    isMulti ? this.handleMulti(key, isActive) : this.handleSingle(key, isActive);
  };

  handleSingle = (key, isActive) => {
    if (isActive) {
      const {onChange} = this.props;
      this.setState({value: [key]});
      onChange && onChange(key);
    }
  };

  handleMulti = (key, isActive) => {
    let nextIsAll = null;
    const value = [...this.state.value];

    if (isActive && key === this.all) {
      nextIsAll = true;
      value.length = 0;
      value.push(this.all);
    } else if (isActive && key !== this.all) {
      nextIsAll = false;
      if (this.currentIsAll) value.length = 0;
      value.push(key);
    } else {
      const idx = value.findIndex(v => (v === key));
      value.splice(idx, 1);
      nextIsAll = value.length === 0;
      nextIsAll && value.push(this.all);
    }

    if (!this.currentIsAll || this.currentIsAll !== nextIsAll) {
      this.currentIsAll = nextIsAll;
      this.setState({value});
      const {onChange} = this.props;
      onChange && onChange(this.currentIsAll ? [] : value);
    }
  };

  shouldComponentUpdate(nextProps, nextState) {
    const {value} = nextState;
    return value !== this.state.value;
  }

  render() {
    const {items, label, className} = this.props;
    const {value} = this.state;
    let classNames = 'filter-wrap';
    if (className) classNames += ' ' + className;
    return (
      <div className={classNames}>
        {label ? <label>{label + ':'}</label> : null}
        <ul>
          {
            items.map(item => {
              const {key, text} = item;
              const isActive = value.indexOf(key) > -1;
              let classNames = 'filter-item';
              if (isActive) classNames += ' active';
              const props = {
                key,
                className: classNames,
                onClick: this.handleClick.bind(this, key, !isActive)
              };
              return <li {...props}>{text}</li>;
            })
          }
        </ul>
      </div>
    );
  }
}

export default Filter;
