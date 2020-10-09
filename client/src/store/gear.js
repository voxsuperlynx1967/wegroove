const GET_GEAR = 'gear/GET_GEAR';

export const getGear = (musiciansGear) => {
    return {
        type: GET_GEAR,
        musiciansGear
    }
}

export const fetchGear = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/gear/musician/${id}`);
      const data = await res.json();
      debugger
      dispatch(getGear(data.musiciansGear))

    };
  }

  export default function gearReducer(state={}, action) {
    switch(action.type) {
      case GET_GEAR:
          debugger
          return action.musiciansGear
      default:
        return state;
    }
  }
