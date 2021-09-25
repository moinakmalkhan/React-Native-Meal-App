import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
const ListItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.children}</Text>
  </View>
);
const OtherInfo = (props) => (
  <View
    style={{
      ...styles.listItem,
      justifyContent: "space-between",
      flexDirection: "row",
    }}
  >
    <Text>{props.text1}</Text>
    <Text style={{ fontWeight: "bold" }}>{props.text2Condition ? "Yes" : "No"}</Text>
  </View>
);
const MealDetailScreen = (props) => {
  const title = props.route.params.title;
  const { navigation } = props;
  const backgroundColor = props.route.params.backgroundColor;
  const mealId = props.route.params.mealId;
  const meals = useSelector((state) => state.meals.meals);
  const meal = meals.find((meal) => meal.id === mealId);
  const isFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const dispatch = useDispatch();
  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(mealId));
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="search"
            iconName={isFav ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavoriteHandler}
          />
        </HeaderButtons>
      ),
      headerTitle: title,
      headerStyle: {
        backgroundColor,
      },
    });
  }, [navigation, dispatch, mealId, isFav]);
  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />

      <View style={styles.detailesContainter}>
        <Text>{meal.duration}m</Text>
        <Text>{meal.complexity.toUpperCase()}</Text>
        <Text>{meal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map((text) => (
        <ListItem key={text}>{text}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {meal.steps.map((text) => (
        <ListItem key={text}>{text}</ListItem>
      ))}
      <Text style={styles.title}>Other info</Text>
      <OtherInfo text1="Gluten Free" text2Condition={meal.isGlutenFree} />
      <OtherInfo text1="Vegan" text2Condition={meal.isVegan} />
      <OtherInfo text1="Vegetarian" text2Condition={meal.isVegetarian} />
      <OtherInfo text1="Lactose Free" text2Condition={meal.isLactoseFree} />
    </ScrollView>
  );
};
export default MealDetailScreen;
const styles = StyleSheet.create({
  detailesContainter: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: 200,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  displayOtherInfo: {},
});
