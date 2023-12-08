import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem.js/MealItem';
import React from 'react';
// import axios from 'axios'; 
import {  useSelector, useDispatch } from 'react-redux';
import { mealsActionCreator } from '../../store/meals';

const AvailableMeals = () => {
  const dispatch = useDispatch();
  const {meals, loading, httpError} = useSelector(state => state.meal);
  React.useEffect(()=>{
    mealsActionCreator()(dispatch);
  },[])
    
  if(httpError){
    return(
      <section className={classes.mealsError}>
          <p>{httpError}</p>
      </section>
    )
  }

    const mealsList = meals.map( meal => 
    <MealItem key={meal.id} 
              id={meal.id}
              name={meal.name} 
              description={meal.description} 
              price={meal.price}
    />)

    return(<>
      {loading && <section className={classes.mealsLoading}><p>Loading...</p></section>}
        {!loading && <section className={classes.meals}>
          <Card>
            <ul>
              {mealsList}
            </ul>
          </Card>
        </section>}
        </>
    );
}
export default AvailableMeals;