import { View, Text } from "react-native";
import React from "react";

const Category = ({ route }: any) => {
  const categoryId = route.params.categoryId;
  const { color } = route.params;
  return (
    <View>
      <Text style={{ color: color }}>MealsList -{categoryId}</Text>
    </View>
  );
};

export default Category;
