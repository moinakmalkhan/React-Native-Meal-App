import { MEALS } from "../../data/dummy-data";
import { SET_FILTER, TOGGLE_FAVORITE } from "../actions/meals";

const initialState = {
  meals: MEALS,
  filterMeals: MEALS,
  favoriteMeals: [],
};

const mealReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_FAVORITE:
        const existingIndex = state.favoriteMeals.findIndex(
          (meal) => (meal.id === action.mealId)
        );
        if (existingIndex>=0) {

          let favMeals = [...state.favoriteMeals];
          favMeals.splice(existingIndex, 1);
          return { ...state, favoriteMeals: favMeals };
        } else {
          const meal=state.meals.find((meal) => meal.id === action.mealId)
          return {
            ...state,
            favoriteMeals: state.favoriteMeals.concat(meal),
          };
        }
      case SET_FILTER:
        const filters = action.filters;
        const filteredMeals = state.meals.filter(meal=>{
          if (filters.gultenFree && !meal.isGlutenFree){
            return false;
          }
          if (filters.vegan && !meal.isVegan){
            return false;
          }
          if (filters.vegetarian && !meal.isVegetarian){
            return false;
          }
          if (filters.lactoseFree && !meal.isLactoseFree){
            return false;
          }
          return true;
        })
        return {...state,filterMeals:filteredMeals}
      default:
        return state;
    }

};

export default mealReducer;
