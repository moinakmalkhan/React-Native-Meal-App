import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const CategoryGridTiles = (props) => {
  let TouchConponent = TouchableOpacity;
  if(Platform.OS==="android" && Platform.Version >=21){
    TouchConponent = TouchableNativeFeedback
  }
  return (
    <View style={styles.gridItem}>
    <TouchConponent onPress={props.onSelect}  style={{flex:1}}>
      <View style={{ backgroundColor: props.color, ...styles.container }}>
        <Text style={styles.title} numberOfLines={2}>
          {props.title}
        </Text>
      </View>
    </TouchConponent>
    </View>
  );
};

export default CategoryGridTiles;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius:10,
    overflow: Platform.OS==="android" ? "hidden":"visible",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 10,
    elevation: 10,
  },
  container: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-end",
    borderRadius: 10,
    padding: 15,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    textAlign: "right",
  },
});
