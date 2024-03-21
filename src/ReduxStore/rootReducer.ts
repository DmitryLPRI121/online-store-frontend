// rootReducer
import {combineReducers} from "@reduxjs/toolkit";
import isLoadingState from "./Reducers/isLoadingState";

export const rootReducer = combineReducers({
    isLoadingState
});