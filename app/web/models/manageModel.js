import Types from '../actions';
import {encode} from '../utils/tool';

export default [
  {
    key: 'manage.current',
    action: Types.CURRENT,
    method: 'get',
    url: (payload) => {
      const qs = encode(payload);
      return `/api/quote/current?${qs}`;
    }
  },
  {
    key: 'manage.history',
    action: Types.HISTORY,
    method: 'get',
    url: (payload) => {
      const qs = encode(payload);
      return `/api/quote/history?${qs}`;
    }
  },
  {
    key: 'manage.bond',
    action: Types.BOND,
    method: 'get',
    url: () => '/api/quote/bond'
  },
  {
    key: 'manage.intention',
    action: Types.INTENTION,
    method: 'get',
    url: () => '/api/quote/intention'
  },
  {
    key: 'manage.query',
    action: Types.QUERY,
    method: 'get',
    url: (payload) => {
      const qs = encode(payload);
      return `/api/quote/query?${qs}`;
    }
  }
];
