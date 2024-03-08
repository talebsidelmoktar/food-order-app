import classes from "./AvailaibleMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./mealItem/MealItem";
import { useEffect, useState } from "react";

// const DUMMY_MEALS = [
//     {
//       id: "m1",
//       name: "Sushi",
//       description: "Finest fish and veggies",
//       price: 22.99,
//     },
//     {
//       id: "m2",
//       name: "Schnitzel",
//       description: "A german specialty!",
//       price: 16.5,
//     },
//     {
//       id: "m3",
//       name: "Barbecue Burger",
//       description: "American, raw, meaty",
//       price: 12.99,
//     },
//     {
//       id: "m4",
//       name: "Green Bowl",
//       description: "Healthy...and green...",
//       price: 18.99,
//     },
//   ];

const AvailiableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");
  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://push-d6d89-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error('Somethin went wrong ');
      }
      const responseData = await response.json();
      const loadMeals = [];
      for (const key in responseData) {
        loadMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
        setMeals(loadMeals);
        setIsLoading(false);
      }
    };

    //adding a ctach block for the function to hanlde eroor
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  if (isLoading) {
    return (
      <section className={classes.isLoading}>
        <p>Loading....</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.errorHandling}>
        <p>{httpError}</p>
      </section>
    );
  }
  const mealsList = meals.map((meal) => (
    <MealItem
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

export default AvailiableMeals;
