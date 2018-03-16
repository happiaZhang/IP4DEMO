import '../themes/Main.less';
import React, {PureComponent} from 'react';
import QuoteList from './QuoteList';

class Main extends PureComponent {
  render() {
    return (
      <div className='main-wrap'>
        <QuoteList />
      </div>
    );
  }
}

export default Main;
