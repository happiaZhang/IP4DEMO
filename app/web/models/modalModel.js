import Types from '../actions';

export default [
  {
    key: 'modal',
    action: Types.MODAL,
    method: 'get',
    loading: (state, action) => {
      return action.payload;
    }
  }
];
