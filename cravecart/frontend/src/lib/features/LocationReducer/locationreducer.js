"use client"
import { createSlice } from "@reduxjs/toolkit";

const initialState =  JSON.parse(localStorage.getItem('basic')) ? JSON.parse(localStorage.getItem('basic')):  {
  city: "Mumbai",
  brand:"",
  latitude:'',
  longitude:'',
  resturantDetails:{}
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.city = action.payload;
      localStorage.setItem('basic',JSON.stringify({...state}))
    },
    addBrand:(state,action) =>{
      state.brand = action.payload
      localStorage.setItem('basic',JSON.stringify({...state}))
    },
    addLocation:(state,action) => {
      state.latitude = action.payload.latitude
      state.longitude = action.payload.longitude
    },
    addResturantDetails:(state,action) => {
      state.resturantDetails = {...action.payload}
      
    }
  },

});

export const { addCity,addBrand,addLocation,addResturantDetails } = mainSlice.actions;
export default mainSlice.reducer;
