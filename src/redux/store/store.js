import {configureStore} from '@reduxjs/toolkit';
import weatherReducer from "../slices/Action";

const store = configureStore({
    reducer: weatherReducer,

});

export default store;