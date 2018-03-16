import '../themes/Search.less';
import React from 'react';
import {Icon, Input} from 'antd';

class Search extends React.Component {
  static defaultProps = {
    placeholder: '关键词搜索'
  };

  render() {
    const {className, placeholder} = this.props;
    let classNames = 'search-wrap';
    if (className) classNames += ' ' + className;
    return (
      <div className={classNames}>
        <Icon type='search' />
        <Input placeholder={placeholder} />
      </div>
    );
  }
}

export default Search;
