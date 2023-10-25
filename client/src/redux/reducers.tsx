/*Basically, reducers tell redux, how the state of our application should change whenever a given action occurs.*/

export const loginFormOpenedReducer = (state = false, action: any) => {
  switch (action.type) {
    case "LOGIN_BUTTON_CLICKED":
      return !state;
    default:
      return state;
  }
};
