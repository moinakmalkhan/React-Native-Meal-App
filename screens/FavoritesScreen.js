import React from "react";
import { useSelector } from "react-redux";
import MealList from "../components/MealList";
import { Text, StyleSheet, View } from "react-native";
const FiltersScreen = (props) => {
  const meals = useSelector((state) => state.meals.favoriteMeals);
  return !meals || meals.length <= 0 ? (
    <View style={styles.textContainer}>
      <Text>No favorite found. Start adding some!</Text>
    </View>
  ) : (
    <MealList data={meals} navigation={props.navigation} />
  );
};

export default FiltersScreen;
const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
