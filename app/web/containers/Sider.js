import '../themes/Sider.less';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import Filter from '../components/Filter';
import FilterInput from '../components/FilterInput';
import Types from '../actions';
import {time, category, direction, industry, term, instRate, bondRate} from '../config';
import {isEmpty} from '../utils/tool';

const SIFTER = [
  {
    key: 'fTime',
    component: Filter,
    props: {
      key: 'time',
      label: '时间',
      items: time
    }
  },
  {
    component: FilterInput,
    props: {
      key: 'quote',
      items: [
        {key: 'bid', label: 'Bid'},
        {key: 'ofr', label: 'Ofr'}
      ]
    }
  },
  {
    key: 'fCategory',
    component: Filter,
    props: {
      key: 'category',
      label: '类别',
      isMulti: true,
      items: category
    }
  },
  {
    key: 'direction',
    component: Filter,
    props: {
      key: 'direction',
      isMulti: true,
      label: '方向',
      items: direction
    }
  },
  {
    key: 'fIndustry',
    component: Filter,
    props: {
      key: 'industry',
      isMulti: true,
      label: '行业',
      items: industry
    }
  },
  {
    key: 'fTerm',
    component: Filter,
    props: {
      key: 'term',
      isMulti: true,
      label: '期限',
      items: term
    }
  },
  {
    key: 'instRate',
    component: Filter,
    props: {
      key: 'instRate',
      isMulti: true,
      label: '主体',
      items: instRate
    }
  },
  {
    key: 'bondRate',
    component: Filter,
    props: {
      key: 'bondRate',
      isMulti: true,
      label: '债项',
      items: bondRate
    }
  }
];

class Sider extends PureComponent {
  constructor(props) {
    super(props);
    this.filter = {
      fTime: 1
    };
  }

  handleChange = (key) => {
    return (v) => {
      if (key) {
        isEmpty(v) ? delete this.filter[key] : this.filter[key] = v;
        this.handleFilter();
      }
    };
  };

  handleFilter = () => {
    const {dispatch} = this.props;
    dispatch({type: Types.QUOTE, payload: this.filter});
  };

  componentDidMount() {
    this.handleFilter();
  }

  render() {
    return (
      <div className='sider-wrap'>
        <div className='sider-body'>
          {
            SIFTER.map(({key, component, props}) => {
              props.onChange = this.handleChange(key);
              return React.createElement(component, props);
            })
          }
        </div>
      </div>
    );
  }
}

export default connect()(Sider);
