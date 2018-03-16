import React from 'react';
import Sider from './Sider';
import Main from './Main';

class Content extends React.Component {
  render() {
    return (
      <div className='content'>
        <Sider />
        <Main />
      </div>
    );
  }
}

export default Content;
