import Types from '../actions';

export default [
  {
    key: 'mine',
    action: Types.MINE,
    method: 'get',
    url: () => '/api/quote/mine'
  }
];
