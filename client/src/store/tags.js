const GET_TAGS = 'tags/GET_TAGS'

export const getTypeTags = (gearTypeTags) => {
    return {
        type: GET_TAGS,
        gearTypeTags

    }
}

export const getGearTypeTags = () => {
    return async (dispatch) => {
        const res = await fetch(`/api/gear/typetags`);
        const data = await res.json();
        dispatch(getTypeTags(data.gearTypeTags))

      };
  }

  export default function tagReducer(state={}, action) {
    switch(action.type) {
      case GET_TAGS:
          return action.gearTypeTags
      default:
        return state;
    }
  }
