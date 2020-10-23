const GET_NEARBY = 'nearby/GET_NEARBY'

export const getNearby = (nearbyMusicians) => {
    return {
        type: GET_NEARBY,
        nearbyMusicians
    }
}

export const fetchUsersNearby = (latitude, longitude, radius, filtz) => {
    return async (dispatch) => {
      const res = await fetch(`/api/users/nearby`, {
        method: "put",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ latitude, longitude, radius, filtz })
      });
      debugger
      const data = await res.json();
      debugger
      dispatch(getNearby(data.nearbyMusicians))

    };
}


export default function userReducer(state={}, action) {
    switch(action.type) {
    case GET_NEARBY:
          return action.nearbyMusicians
      default:
        return state;
    }
  }
