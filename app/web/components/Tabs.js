import '../themes/Tabs.less';
import React from 'react';
import {Link} from 'react-router-dom';

class Tabs extends React.Component {
  static defaultProps = {
    isLink: false
  };

  constructor(props) {
    super(props);
    this.state = {
      activeItem: props.activeItem
    };
  }

  componentWillReceiveProps(nextProps) {
    const {activeItem} = nextProps;
    if (activeItem !== this.state.activeItem) {
      this.setState({activeItem});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {activeItem} = nextState;
    return activeItem !== this.state.activeItem;
  }

  render() {
    const {className, items, isLink} = this.props;
    const {activeItem} = this.state;

    let classNames = 'tabs-wrap';
    if (className) classNames += ' ' + className;

    return (
      <ul className={classNames}>
        {
          items.map(({key, name}) => {
            const isActive = key === activeItem;
            return (
              <li key={key} className={isActive ? 'active' : ''}>
                {isLink ? <Link to={key}>{name}</Link> : <a>{name}</a>}
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default Tabs;
