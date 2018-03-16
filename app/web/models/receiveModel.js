import Types from '../actions';

export default [
  {
    key: 'receive',
    action: Types.RECEIVE,
    method: 'get',
    url: () => '/api/quote/receive'
  }
];
