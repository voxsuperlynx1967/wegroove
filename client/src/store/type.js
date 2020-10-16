const GET_TYPES = 'type/GET_TYPES'


export const getTypes = (gearTypes) => {
    return {
        type: GET_TYPES,
        gearTypes

    }
}

export const getGearTypes = () => {
    return async (dispatch) => {
        const res = await fetch(`/api/gear/types`);
        const data = await res.json();
        dispatch(getTypes(data.gearTypes))

      };
  }




export default function typeReducer(state={}, action) {
    switch(action.type) {
      case GET_TYPES:
        debugger
        return action.gearTypes
      default:
        return state;
    }
  }
