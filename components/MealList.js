import React from "react";
import { StyleSheet, FlatList, View, Easing } from "react-native";
import Colors from "../constants/Colors";
import MealItem from "./MealItem";

const MealList = (props) => {
  const displayMealItems = (itemData) => {
    return (
      <MealItem
        key={itemData.item.id}
        title={itemData.item.title}
        image={itemData.item.imageUrl}
        complexity={itemData.item.complexity}
        duration={itemData.item.duration}
        affordability={itemData.item.affordability}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
            title: itemData.item.title,
            backgroundColor:props.backgroundColor?props.backgroundColor:Colors.secondary,
          });
        }}
      />
    );
  };
  return (
    <View style={styles.list}>
      <FlatList
        data={props.data}
        renderItem={displayMealItems}
        style={{ width: "100%" }}
      />
    </View>
  );
};

export default MealList;

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
