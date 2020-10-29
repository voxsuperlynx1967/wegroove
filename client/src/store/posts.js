const GET_POSTS = 'post/GET_POSTS';



export const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}


export const fetchPostsFollowing = (following) => {
    return async (dispatch) => {
      const res = await fetch(`/api/post/following`, {
          method: "put",
            headers: {
            "Content-Type": "application/json"
      },
      body: JSON.stringify({ following })

    });
      const data = await res.json();
      dispatch(getPosts(data.Posts))

    };
  }



  export default function postReducer(state={}, action) {
    switch(action.type) {
      case GET_POSTS:
          return action.posts
      default:
        return state;
    }
  }
