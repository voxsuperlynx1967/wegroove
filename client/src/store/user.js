const GET_USER = 'user/GET_USER';
const GET_USERS = 'uswer/GET_USERS'

export const getUser = (musicianprof) => {
    return {
        type: GET_USER,
        musicianprof
    }
}

export const fetchUser = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/users/${id}`);
      debugger
      const data = await res.json();
      debugger
      dispatch(getUser(data.musicianprof))

    };
  }

export const fetchSpecificUser = (latitude, longitude) => {
    return async (dispatch) => {
      const res = await fetch(`/api/users/nearby`);
      debugger
      const data = await res.json();
      debugger
      dispatch(getUser(data.nearbyMusicians))

    };
}

  export default function userReducer(state={}, action) {
    switch(action.type) {
      case GET_USER:
          debugger
          return action.musicianprof
      default:
        return state;
    }
  }
