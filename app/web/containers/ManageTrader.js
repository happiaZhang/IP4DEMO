import '../themes/ManageTrader.less';
import React from 'react';
import {connect} from 'react-redux';
import ManageTraderBtn from './ManageTraderBtn';
import Search from '../components/Search';
import Filter from '../components/Filter';
import ManageTraderQuote from './ManageTraderQuote';
import Types from '../actions';
import {handleResponse} from '../utils/tool';

class ManageTrader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBond: null
    };
    this.bonds = [];
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({type: Types.BOND});
  }

  componentWillReceiveProps(nextProps) {
    const {bonds} = nextProps;
    if (bonds !== this.props.bonds) {
      handleResponse(bonds, result => {
        this.bonds = result;
        this.setState({activeBond: result[0].code});
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {activeBond} = nextState;
    return activeBond !== this.state.activeBond;
  }

  setItems = () => {
    const result = [];
    this.bonds.forEach(({code}) => {
      result.push({key: code, text: code});
    });
    return result;
  };

  setValue = () => {
    const {activeBond} = this.state;
    return activeBond ? [activeBond] : [];
  };

  setPriceInfo = () => {
    const {activeBond} = this.state;
    return activeBond ? this.bonds.find(bond => bond.code === activeBond).price : '--';
  };

  handleChange = (activeBond) => {
    this.setState({activeBond});
  };

  render() {
    const {activeBond} = this.state;
    return (
      <div className='manage-trader'>
        <div className='manage-trader-setting'>
          <Search placeholder='搜索债券代码' />
          <ManageTraderBtn />
        </div>
        <div className='manage-trader-filter'>
          <Filter
            className='manage-bonds'
            items={this.setItems()}
            label='债券代码'
            onChange={this.handleChange}
            value={this.setValue()} />
          <div className='manage-bond'>
            <span className='bond-price'>My Price：</span>
            <span className='bond-price-info'>{this.setPriceInfo()}</span>
          </div>
        </div>
        <ManageTraderQuote activeBond={activeBond} type='current' />
        <ManageTraderQuote activeBond={activeBond} type='history' />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    bonds: state.manage.bond
  };
}

export default connect(mapStateToProps)(ManageTrader);
