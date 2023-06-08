import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { CATEGORIES } from '../data/data'
import CategoryGridTile from '../CategoryGridTile'

const mealsCategories = ({navigation}:any) => {

  function renderItem(itemData:any){
      function pressHandler(){
        navigation.navigate("category", {categoryId:itemData.item.id,
        color: itemData.item.color,})
      }

    return <CategoryGridTile item={itemData.item}  onPress={pressHandler} />
  }


  return (
    <View style={styles.container}>
      <FlatList keyExtractor={(item)=>item.id}
       data={CATEGORIES}
       renderItem={renderItem}
       numColumns={2}
      />
    </View>
  )
}

export default mealsCategories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});