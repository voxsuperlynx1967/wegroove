const GET_USER = 'user/GET_USER';


export const getUser = (musicianprof) => {
    return {
        type: GET_USER,
        musicianprof
    }
}


export const fetchUser = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/users/${id}`);

      const data = await res.json();

      dispatch(getUser(data.musicianprof))

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
