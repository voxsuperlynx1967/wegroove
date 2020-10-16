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

export const makeGear = (gear) => {
    return {
        type: SET_GEAR,
        gear

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

  export const getGearTypes = () => {
    return async (dispatch) => {
        const res = await fetch(`/api/gear/types`);
        const data = await res.json();
        dispatch(getTypes(data.gearTypes))

      };
  }

  export const postGear = (name, gearTypeId, musicianId, mediaLink) => {
    return async dispatch => {
        const res = await fetch('/api/gear/new', {

          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, gearTypeId, musicianId, mediaLink})

        });

        const data = await res.json();

        // error handling

        // const { message } = data;
        // console.log("this is the error message", message)
        // const errorsList = document.getElementById("sign-up-errors");
        // errorsList.innerHTML = '';
        // if (message) {
        //   errorsList.style.display = "flex";
        //   const errorLi = document.createElement('li');
        //   errorLi.innerHTML = message;
        //   errorsList.appendChild(errorLi)
        // } else {

          dispatch(makeGear(data));
          res.data = data;

        // }
        return res;

      }
    }



  export default function gearReducer(state={}, action) {
    switch(action.type) {
      case GET_GEAR:
          debugger
          return action.musiciansGear
      case GET_TYPES:
          debugger
          return action.gearTypes
        case SET_GEAR:
          debugger
          return action.gear
      default:
        return state;
    }
  }
