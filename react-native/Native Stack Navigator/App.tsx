import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Category from "./src/screens/Category";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MealsCategories from "./src/screens/MealsCategories";

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="mealsCategories" component={MealsCategories} />
        <Drawer.Screen name="category" component={Category} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

{
  /* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
}); */
}
