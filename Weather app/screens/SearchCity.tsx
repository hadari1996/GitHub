import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
  TextInput,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { OPEN_WEATHER_KEY } from "../util/app.config";

const SearchCity = ({ navigation }: any) => {
  const [iconWeather, setIconWeather] = useState<String>("");
  const [refreshing, setRefreshing] = useState(false);
  const [descrition, setDescription] = useState("");
  const [loc, setLoc] = useState<String>();
  const [temp, setTemp] = useState<String>("");
  const [city, setCity] = useState("");
  const [Loading, setLoading] = useState(false);
  const handleSearch = async () => {
    //true
    setRefreshing(true);
    setLoading(true);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );

    const data = await response.json();

    if (data.cod === "404") {
      setCity("");
      Alert.alert("Error", "City not found");

      setLoading(false);
    } else {
      setIconWeather(data.weather[0].icon);
      setTemp(data.main.temp);
      setDescription(data.weather[0].description);
      setLoc(data.name);
      setLoading(false);
      setCity("");
    }
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} />}
        style={{ marginTop: 80, flex: 1 }}
      >
        {Loading ? (
          <SafeAreaView style={styles.loading}>
            <ActivityIndicator size="large" hidesWhenStopped={true} />
          </SafeAreaView>
        ) : (
          <View style={styles.search}>
            <TextInput
              placeholder="Type City..."
              onChangeText={setCity}
              style={styles.TextInputSearch}
              value={city}
            />

            <Button title="Search" onPress={handleSearch} />
            <RefreshControl refreshing={refreshing} />
          </View>
        )}

        <Text style={styles.title}>Search Weather</Text>
        <Text style={{ alignItems: "center", textAlign: "center" }}>
          {loc ? (
            <>
              <View style={styles.current}>
                <Text>{loc}</Text>
                <Image
                  style={styles.largeIcon}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${iconWeather}@4x.png`,
                  }}
                />
                <Text style={styles.currentTemp}>{temp}°C</Text>
                <Text style={styles.currentDescription}>{descrition}</Text>
              </View>
            </>
          ) : (
            <></>
          )}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchCity;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C6E8FB",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    fontSize: 36,
    fontWeight: "bold",
    color: "#0E62B0",
  },
  current: {
    flex: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  largeIcon: {
    width: 100,
    height: 100,
  },
  currentTemp: {
    flex: 1,
    fontSize: 60,
    fontWeight: "bold",
    textAlign: "center",
  },
  currentDescription: {
    flex: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "200",
    fontSize: 24,
    marginBottom: 25,
  },
  search: {
    flex: 3,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  TextInputSearch: {
    borderColor: "#0E62B0",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 30,
    paddingTop: 5,
    paddingBottom: 5,
  },
});
