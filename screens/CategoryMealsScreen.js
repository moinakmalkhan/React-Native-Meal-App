import React, { useEffect } from "react";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { Text, View } from "react-native";

const CategoryMealsScreen = (props) => {
  const catId = props.route.params.categoryId;
  const meals = useSelector((state) => state.meals.filterMeals);
  const items = meals.filter((item) => item.categoryIds.indexOf(catId) >= 0);
  
  const backgroundColor = props.route.params.backgroundColor;
  const title = props.route.params.categoryTitle;
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: title,
      headerStyle: {
        backgroundColor,
      },
    });
  }, [props.navigation]);
  if (items.length === 0 || !items) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No meal found, maybe check your filters</Text>
      </View>
    );
  }
  return (
    <MealList
      data={items}
      navigation={props.navigation}
      backgroundColor={backgroundColor}
    />
  );
};

export default CategoryMealsScreen;
