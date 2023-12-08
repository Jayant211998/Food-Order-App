import { createSlice } from '@reduxjs/toolkit';

export const cart = createSlice({
    name: 'cart',
    initialState: {items:[], totalAmount:0},
    reducers: {
        addItem:(state, action)=>{
            const selectedItem = state.items.find(item=>item.id === action.payload.id);
            return selectedItem? {
                items:state.items.map(item=>{
                    if(item.id === action.payload.id){
                        return {
                           ...item,
                            amount:item.amount + 1
                        }
                    }
                    return item;
                }),
                totalAmount:state.totalAmount + action.payload.price
            }
            : {
                items:[...state.items, action.payload],
                totalAmount:state.totalAmount + action.payload.price
            }
        },  
        removeItem:(state, action)=>{
            const selectedItem = state.items.find(item=>item.id === action.payload);
            if(selectedItem.amount === 1){
                return {
                    items:state.items.filter(item=>item.id!== action.payload),
                    totalAmount:state.totalAmount - selectedItem.price
                }
            }else{
                return {
                    items:state.items.map(item=>{
                        if(item.id === action.payload){
                            return {
                               ...item,
                                amount:item.amount - 1
                            }
                        }
                        return item;
                    }),
                    totalAmount:state.totalAmount - selectedItem.price
                }
            }            
        },
        clearCart:() =>{return {items:[], totalAmount:0}}
    }
});

export const postOrder = async(userData)=>{

    
}

export const cartActions = cart.actions;