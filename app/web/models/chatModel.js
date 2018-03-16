import Types from '../actions';

export default [
  {
    key: 'chat.friend',
    action: Types.FRIEND,
    loading: (state, action) => {
      const {friend} = action.payload;
      return friend;
    }
  }
];
