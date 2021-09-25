import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/actions/meals";

const FilterSwitch = (props) => (
  <View style={styles.filterContainter}>
    <Text>{props.label}</Text>
    <Switch
      value={props.state}
      onValueChange={props.onChange}
      trackColor={{ true: Colors.primary }}
      thumbColor={Colors.secondary}
    />
  </View>
);
const FiltersScreen = (props) => {
  const [isGultenFree, setIsGultenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();
  const setFilteHandler = (filters) => {
    dispatch(setFilter(filters));
  };
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="save"
            iconName="ios-save"
            onPress={setFilteHandler.bind(this, {
              gultenFree: isGultenFree,
              lactoseFree: isLactoseFree,
              vegetarian: isVegetarian,
              vegan: isVegan,
            })}
          />
        </HeaderButtons>
      ),
    });
  }, [
    navigation,
    dispatch,
    isGultenFree,
    isLactoseFree,
    isVegan,
    isVegetarian,
  ]);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filter / Restrictions</Text>
      <FilterSwitch
        state={isGultenFree}
        label="Gulten-free"
        onChange={(newValue) => setIsGultenFree(newValue)}
      />
      <FilterSwitch
        state={isLactoseFree}
        label="Lactose-free"
        onChange={(newValue) => setIsLactoseFree(newValue)}
      />
      <FilterSwitch
        state={isVegan}
        label="Vegan"
        onChange={(newValue) => setIsVegan(newValue)}
      />
      <FilterSwitch
        state={isVegetarian}
        label="Vegetarian"
        onChange={(newValue) => setIsVegetarian(newValue)}
      />
    </View>
  );
};

export default FiltersScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "open-sans-bold",
    margin: 20,
    textAlign: "center",
  },
  filterContainter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
});
