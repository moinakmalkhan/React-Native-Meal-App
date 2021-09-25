import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import React from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FavoritesScreen from "../screens/FavoritesScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FiltersScreen from "../screens/FiltersScreen";

const Stack = createNativeStackNavigator();

const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={require('../assets/favicon.png')}
//     />
//   );
// }

function MealStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        // options={{ headerTitle: props => <LogoTitle {...props} /> }}

        options={{
          title: "Meal Categories",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontFamily: "open-sans-bold",
          },
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={{ title: "Category Meals" }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: "Meal Detail" }}
      />
    </Stack.Navigator>
  );
}
const FavStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Favorite"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.secondary,
        },
      }}
    >
      <Stack.Screen
        name="Favorite"
        component={FavoritesScreen}
        options={{ title: "My Favorite Meals" }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: "Meal Detail" }}
      />
    </Stack.Navigator>
  );
};
const FilterStackNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: Colors.primary,
      },
    }}
  >
    <Stack.Screen
      name="Filter Screen"
      component={FiltersScreen}
      options={{
        title: "Filter",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    />
  </Stack.Navigator>
);

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        shifting: Platform.OS === "android",
      }}
      activeColor="white"
      shifting={Platform.OS === "android"}
      barStyle={{ backgroundColor: Colors.primary }}
    >
      <Tab.Screen
        name="Meal"
        component={MealStackNavigator}
        options={{
          tabBarLabel: "Meals",

          tabBarIcon: (tabinfo) => {
            return (
              <Ionicons name="ios-restaurant" size={23} color={tabinfo.color} />
            );
          },
          tabBarColor: Colors.primary,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavStackNavigator}
        options={{
          tabBarLabel: "Favorites",
          tabBarIcon: (tabinfo) => {
            return <Ionicons name="ios-star" size={23} color={tabinfo.color} />;
          },
          tabBarColor: Colors.secondary,
        }}
      />
    </Tab.Navigator>
  );
}

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor:Colors.secondary,
        drawerLabelStyle:{
          fontFamily:"open-sans-bold"
        }
      }}
    >
      <Drawer.Screen name="Meals" component={Tabs} />
      <Drawer.Screen name="Filter" component={FilterStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
