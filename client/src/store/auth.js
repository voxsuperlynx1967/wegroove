import Cookies from 'js-cookie';

const SET_USER = 'authentication/SET_USER';
const REMOVE_USER = 'authentication/REMOVE_USER';
const GET_USER = 'authentication/GET_USER';


export const setUser = (musician) => {
    return {
        type: SET_USER,
        musician
    }
}

export const removeUser = () => {
    return {
        type: REMOVE_USER
    }
}




export const login = (email, password) => {
    return async dispatch => {
      const res = await fetch('/api/users/login', {

        method: "post",
        headers: {
          "Content-Type": "application/json",
          "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: JSON.stringify({ email, password })

      });

      const data = await res.json();

      // error handling

      const { message } = data;
      console.log("this is the error message", message)
      const errorsList = document.getElementById("sign-up-errors");
      errorsList.innerHTML = '';
      if (message) {
        errorsList.style.display = "flex";
        const errorLi = document.createElement('li');
        errorLi.innerHTML = message;
        errorsList.appendChild(errorLi)
      } else {
        debugger
        dispatch(setUser(data));
        res.data = data;

      }
      return res;

    }
  }


export const logout = () => {
    return async (dispatch) => {
      const res = await fetch("/api/users/logout", {
        method: "delete",
      });
      if(res.okay){
        dispatch(removeUser());
        return "goodbye"

      }

    };
};


export const signup = (email, firstName, lastName, password, longitude, latitude, mediaLink) => {
    return async (dispatch) => {
      const res = await fetch('/api/users/signup', {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "XSRF-TOKEN": Cookies.get("XSRF-TOKEN")
        },
        body: JSON.stringify({ email, firstName, lastName, password, longitude, latitude, mediaLink })
      });
      debugger
      const data = await res.json();
      debugger

      const { message } = data;
      console.log("this is the error message", message)
      const errorsList = document.getElementById("sign-up-errors");
      errorsList.innerHTML = '';
      if (message) {
        errorsList.style.display = "flex";
        const errorLi = document.createElement('li');
        errorLi.innerHTML = message;
        errorsList.appendChild(errorLi)
      } else {
        debugger
        dispatch(setUser(data));
        res.data = data;

      }
      return res;


    }
  }


export default function authReducer(state={}, action) {
    switch(action.type) {
      case SET_USER:
        return action.musician;
      case REMOVE_USER:
        return {};
      default:
        return state;
    }
  }
