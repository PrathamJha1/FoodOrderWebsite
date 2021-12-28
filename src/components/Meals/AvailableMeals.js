import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect,useState } from 'react';


const AvailableMeals = () => {
  const[meals,setmeals]=useState([]);
  const[isLoading,setisLoading] =useState(true);
  const[httpError,sethttpError]=useState();
  useEffect(()=>{
    const fetchMeals= async()=>{
     const response= await fetch('https://learnreact-ec531-default-rtdb.firebaseio.com/meals.json');
     const responseData= await response.json();
     if(!response.ok){
       throw new Error("Something Went Wrong");
     }
     const loadedMeals =[];
     for(const key in responseData){
       loadedMeals.push({
         id:key,
         name:responseData[key].name,
         description:responseData[key].description,
         price:responseData[key].price,
       });
     }
     setmeals(loadedMeals);
     setisLoading(false);
    };
      fetchMeals().catch((error)=>{
        sethttpError(error.message);
        setisLoading(false);
      });
    },[]);
    if(isLoading){
      return(
      <section className={classes.MealsLoading}>
      <p>Loading....</p>
      </section>
      );
    }
    if(httpError){
      return (
        <section className={classes.MealsError}>
        <p>{httpError}</p>
        </section>
      )
    }
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
