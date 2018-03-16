import '../themes/Header.less';
import React, {PureComponent} from 'react';
import logo from '../images/logo.jpg';
import Tabs from '../components/Tabs';
import Search from '../components/Search';
import ReceiveMsg from './ReceiveMsg';

class Header extends PureComponent {
  render() {
    const {pathname, items} = this.props;
    const activeItem = pathname.split('/')[1];
    return (
      <div className='header'>
        <div>
          <img className='header-logo' src={logo} />
          {pathname === '/' ? <Search className='header-search' /> : null}
        </div>
        <div className='header-menu'>
          {pathname === '/' ? <ReceiveMsg /> : null}
          <Tabs items={items} activeItem={'/' + activeItem} isLink />
        </div>
      </div>
    );
  }
}

export default Header;
