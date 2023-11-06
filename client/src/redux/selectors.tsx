/* selectors take care of allowing our components to accurately get data out of the state, 
as well as occasionally doing things like transforming it */

import { createSelector } from "@reduxjs/toolkit";

export const isLoginFormOpenedSelector = (state: any) =>
  state.isLoginFormOpened;

export const isRegisterFormOpenedSelector = (state: any) =>
  state.isRegisterFormOpened;

export const isUserLoggedInSelector = (state: any) => state.isUserLoggedIn;
