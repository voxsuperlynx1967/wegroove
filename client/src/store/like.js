const GET_LIKES = 'like/GET_LIKES';



export const getLikes = (likes) => {
    return {
        type: GET_LIKES,
        likes
    }
}


export const fetchLikes = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/like/${id}`)
      const data = await res.json();
      dispatch(getLikes(data.Likes))

    };
  }



  export default function likeReducer(state={}, action) {
    switch(action.type) {
      case GET_LIKES:
          return action.likes
      default:
        return state;
    }
  }
