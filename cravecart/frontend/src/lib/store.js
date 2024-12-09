import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import LocationReducer from "./features/LocationReducer/locationreducer";
import Orderreducer from './features/orderreducer'

const store = () => 
    configureStore({
        reducer: {
            main: LocationReducer, 
            order:Orderreducer
        },
    });

export default store;