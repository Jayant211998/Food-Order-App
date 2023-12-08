import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { cartActions } from './cart';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: "",
        street:"",
        city:"",
        postalCode:"",
        order: {items:[], totalAmount:0}
    },
    reducers: {
        submitOrder: (state, action) => {
            state.name = action.payload.name;
            state.street = action.payload.street;
            state.city = action.payload.city;
            state.postalCode = action.payload.postalCode;
            state.order = action.payload.cartData;
        }
    }
})

export const submitOrderAction = (userData, cartData) =>{
    return async (dispatch) => {
        try{
            await axios.post('https://food-order-app-433bf-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',{
            user: userData,
            orderedItems: cartData
        });
            dispatch(userSlice.actions.submitOrder({...userData,cartData}));
            dispatch(cartActions.clearCart());
        }catch(err){ 
            console.log(err);
        }        
    }
}

export const { submitOrder } = userSlice.actions;

export default userSlice;