import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'; 


export const mealsSlice = createSlice({
    name: 'meal',
    initialState: {
        meals: [],
        loading: true,
        httpError: null
    },
    reducers: {
        getAllMeals: (state, action) => {
            state.meals = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setHttpError: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const mealsActionCreator = () =>{
    return async (dispatch) => {
        const mealList=[];
        try{
            const response = await axios.get('https://food-order-app-433bf-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json');
            // const data = await response.json();
            for(const key in response.data){
                mealList.push({
                id: key,
                name: response.data[key].name,
                description: response.data[key].description,
                price: response.data[key].price,
                })
            }
            if(!response){
                    throw new Error('Something Went Wrong!')
            }
            dispatch(mealsSlice.actions.getAllMeals(mealList));
            dispatch(mealsSlice.actions.setLoading(false));
        }catch(err){
            dispatch(mealsSlice.actions.setLoading(false));
            dispatch(mealsSlice.actions.setHttpError(err.message));
        }
    }
}

export const mealsActions = mealsSlice.actions;
export default mealsSlice;