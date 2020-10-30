const GET_POSTS = 'post/GET_POSTS';
const MAKE_POST = 'post/MAKE_POST';



export const getPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

export const makePost = (post) => {
    return {
        type: MAKE_POST,
        post
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

  export const fetchPosts = (id) => {
    return async (dispatch) => {
        const res = await fetch(`/api/post/${id}`);
        const data = await res.json();
        debugger
        dispatch(getPosts(data.Posts))

      };
    }

  export const createPost = (musicianId, postType, mediaLink, caption) => {
    return async (dispatch) => {
      const res = await fetch(`/api/post/`, {
          method: "post",
            headers: {
            "Content-Type": "application/json"
      },
      body: JSON.stringify({ musicianId, postType, mediaLink, caption })

    });
      const data = await res.json();
      dispatch(makePost(data.Post))

    };
  }





  export default function postReducer(state={}, action) {
    switch(action.type) {
      case GET_POSTS:
          return action.posts
      case MAKE_POST:
          return action.post
      default:
        return state;
    }
  }
