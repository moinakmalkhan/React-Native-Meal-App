import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MealNavigation from "./navigation/MealNavigation";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import mealReducer from "./store/reducers/meals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

enableScreens();

const rootReducer = combineReducers({
  meals: mealReducer,
});

const store = createStore(rootReducer);
const loadFont = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => setDataLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MealNavigation />
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
