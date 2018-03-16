import '../themes/Root.less';
import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';
import Header from './Header';
import Content from './Content';
import Mine from './Mine';
import Manage from './Manage';
import Chat from './Chat';
import ModalContainer from './ModalContainer';

const ROUTES = [
  {key: '/', component: Content, exact: true, name: '报价板'},
  {key: '/mine', component: Mine, exact: true, name: '我的报价'},
  {key: '/manage', component: Manage, exact: false, name: '报价管理'}
];

class Root extends React.Component {
  renderRoutes = () => {
    const routes = [];
    ROUTES.forEach(props => {
      const {key} = props;
      routes.push(<Route path={key} {...props} />);
    });
    return routes;
  };

  render() {
    const {location} = this.props;
    const {pathname} = location;

    return (
      <div className='wrap'>
        <Header pathname={pathname} items={ROUTES} />
        {this.renderRoutes()}
        {pathname === '/' || pathname === '/manage' ? <Chat /> : null}
        <ModalContainer />
      </div>
    );
  }
}

const Routes = (
  <BrowserRouter>
    <Route path='/' component={Root} />
  </BrowserRouter>
);

export default Routes;
