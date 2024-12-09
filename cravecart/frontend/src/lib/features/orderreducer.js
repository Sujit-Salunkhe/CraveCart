import { createSlice } from "@reduxjs/toolkit";

// const initialState = JSON.parse(localStorage.getItem("order"))
//   ? JSON.parse(localStorage.getItem("order"))
//   : {
//       order: [],
//       isOrder: false,
//       totalPrice:"",
//     };
const initialState = {
  order:[],
  isOrder:false,
  totalPrice:''
}

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      if (state.order.length === 0) {
        state.order = [action.payload];
        state.totalPrice = action.payload.price;
      }else {
        const placeOrder = state.order.filter(
          (order) => action.payload._id !== order._id
        );
        state.order = [action.payload, ...placeOrder];
        state.totalPrice = state.order.reduce((accumulator, order) => {
          return order.price * order.quantity + accumulator;
        }, 0);

      }
      // localStorage.setItem('order',JSON.stringify({...state}))
    },
    removeOrder:(state,action) => {
            console.log(action)
            state.order = state.order.filter(order => order._id !== action.payload)
    },
    handleOrderDisplay: (state, action) => {
      state.isOrder = action.payload;
    },
    handlePrice:(state,action) => {
        const placeOrder = state.order.filter(
            (order) => action.payload._id !== order._id
          );
          state.order = [...placeOrder]
        let price = state.order.reduce((accumulator, order) => {
            return (order.price * order.quantity) + accumulator;
          }, 0);
          state.totalPrice = price ? Number(price) : "";
    }
  },
});

export const { addOrder, handleOrderDisplay,handlePrice,removeOrder } = orderSlice.actions;
export default orderSlice.reducer;
