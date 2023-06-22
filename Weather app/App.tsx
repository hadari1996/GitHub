
import { StyleSheet, Text, View } from "react-native";
import Weather from "./screens/Weather";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import SearchCity from "./screens/SearchCity";

export default function App() {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="weather" component={Weather} />
        <Drawer.Screen name="Search City" component={SearchCity} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
