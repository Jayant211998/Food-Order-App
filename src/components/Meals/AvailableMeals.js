import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem.js/MealItem';
import React, { useState } from 'react';
import axios from 'axios'; 

const AvailableMeals = () => {
  React.useEffect(()=>{
    const getMeals=async()=>{
        const resp = await axios.get('https://food-order-app-433bf-default-rtdb.asia-southeast1.firebasedatabase.app/Meals.json');
       const mealList=[];
       for(const key in resp.data){
        mealList.push({
          id: key,
          name: resp.data[key].name,
          description: resp.data[key].description,
          price: resp.data[key].price,
        })
       }
       if(!resp){
        throw new Error('Something Went Wrong!')
       }
        
        setMeals(mealList);
        setLoading(false);
      }
      getMeals().catch(error=>{
        setLoading(false);
        setHttpError(error.message);
      });
      
  },[])
    const [loading,setLoading] = React.useState(true);
    const [httpError,setHttpError]=useState();
    const [meals,setMeals] = React.useState([]);

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