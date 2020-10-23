const GET_FOLLOWS = 'follow/GET_FOLLOWS';



export const getFollows = (follows) => {
    return {
        type: GET_FOLLOWS,
        follows
    }
}


export const fetchFollows = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/follow/${id}`)
      const data = await res.json();
      dispatch(getFollows(data.Follows))

    };
  }



  export default function followReducer(state={}, action) {
    switch(action.type) {
      case GET_FOLLOWS:
          return action.follows
      default:
        return state;
    }
  }
