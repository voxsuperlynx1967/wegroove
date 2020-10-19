const MAKE_ATTRIBUTE = 'attribute/MAKE_ATTRIBUTES'

export const makeAttribute = (attribute) => {
    return {
        type: MAKE_ATTRIBUTE,
        attribute

    }
}

export const postAttribute = (gearId, tag, value) => {
    return async dispatch => {
        const res = await fetch('/api/gear/attribute/new', {

          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ gearId, tag, value })

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

          dispatch(makeAttribute(data));
          res.data = data;

        // }
        return res;

      }
    }

  export default function attributeReducer(state={}, action) {
    switch(action.type) {
      case MAKE_ATTRIBUTE:
          return action.attribute
      default:
        return state;
    }
  }
