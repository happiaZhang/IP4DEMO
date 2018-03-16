import '../themes/Manage.less';
import React from 'react';
import {Route} from 'react-router-dom';
import ManageIntention from './ManageIntention';
import ManageTrader from './ManageTrader';
import ManageQuery from './ManageQuery';
import Tabs from '../components/Tabs';

const ITEMS = [
  {key: '/manage/intention', name: '意向披露', component: ManageIntention},
  {key: '/manage', name: '对手方管理', component: ManageTrader},
  {key: '/manage/query', name: '状态查询', component: ManageQuery}
];

class Manage extends React.Component {
  renderRoutes = () => {
    const routes = [];
    ITEMS.forEach(props => {
      const {key} = props;
      routes.push(<Route path={key} exact {...props} />);
    });
    return routes;
  };

  render() {
    const {location} = this.props;
    const {pathname} = location;
    return (
      <div className='content'>
        <div className='manage-nav'>
          <Tabs className='manage' items={ITEMS} activeItem={pathname} isLink />
        </div>
        <div className='manage-section'>
          {this.renderRoutes()}
        </div>
      </div>
    );
  }
}

export default Manage;
