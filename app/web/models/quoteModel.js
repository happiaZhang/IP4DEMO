import Types from '../actions';
import {encode} from '../utils/tool';

export default [
  {
    key: 'quote',
    action: Types.QUOTE,
    method: 'get',
    url: (payload) => {
      let qs = null;
      if (payload) qs = encode(payload);
      return `/api/quote/list${qs === null ? '' : '?' + qs}`;
    }
  }
];
