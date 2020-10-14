const GET_GEAR = 'gear/GET_GEAR';
const GET_TYPES = 'gear/GET_TYPES'
const SET_GEAR = 'gear/SET_GEAR'

export const getGear = (musiciansGear) => {
    return {
        type: GET_GEAR,
        musiciansGear
    }
}

export const getTypes = (gearTypes) => {
    return {
        type: GET_TYPES,
        gearTypes

    }
}

// export const makeGear = (gearTypes) => {
//     return {
//         type: GET_TYPES,
//         gearTypes

//     }
// }



export const fetchGear = (id) => {
    return async (dispatch) => {
      const res = await fetch(`/api/gear/musician/${id}`);
      const data = await res.json();
      debugger
      dispatch(getGear(data.musiciansGear))

    };
  }

  export const getGearTypes = () => {
    return async (dispatch) => {
        const res = await fetch(`/api/gear/types`);
        const data = await res.json();
        dispatch(getTypes(data.gearTypes))

      };
  }


  export default function gearReducer(state={}, action) {
    switch(action.type) {
      case GET_GEAR:
          debugger
          return action.musiciansGear
      case GET_TYPES:
          debugger
          return action.gearTypes
      default:
        return state;
    }
  }
