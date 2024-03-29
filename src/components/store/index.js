import {legacy_createStore} from 'redux';

const initState = {
    user: null
  };
  
  const reducer = (state = initState, action) => {
    switch (action.type) {
      case 'login':
        localStorage.setItem('JWT_PAYLOAD', action.token);
        localStorage.setItem('_ID', action._id);
        return {
          ...state,
          user: action.user
        };
      case 'set_user':
        return {
          ...state,
          user: action.user
        };
      default:
        return state;
    }
  };

const store = legacy_createStore(reducer);

export default store;