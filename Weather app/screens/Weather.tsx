import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { OPEN_WEATHER_KEY } from "../util/app.config";

const Weather = ({ navigation }: any) => {
  const [iconWeather, setIconWeather] = useState<String>("");
  const [refreshing, setRefreshing] = useState(false);
  const [descrition, setDescription] = useState("");
  const [loc, setLoc] = useState<Location.LocationGeocodedAddress[]>();
  const [temp, setTemp] = useState<String>("");
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [awaitingPermissions, setAwaitingPermission] = useState(true);

  const loadForecast = async () => {
    setRefreshing(true);
    const permissions = await Location.getForegroundPermissionsAsync();
    if (permissions.status === "granted") {
      setHasPermission(true);
      setAwaitingPermission(false);
    } else {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasPermission(true);
        setAwaitingPermission(false);
      } else {
        Alert.alert("Permission to access Location was denied");
        setAwaitingPermission(false);
        return;
      }
    }

    let location: Location.LocationObject =
      await Location.getCurrentPositionAsync({});

    let address = await Location.reverseGeocodeAsync(location.coords);
    setLoc(address);

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=${OPEN_WEATHER_KEY}&units=metric`
    );

    const data = await response.json();

    if (!response.ok) {
      Alert.alert("Error", "Something went wrong");
      return (
        <SafeAreaView style={styles.loading}>
          <ActivityIndicator size="large" />
        </SafeAreaView>
      );
    } else {
      setIconWeather(data.weather[0].icon);
      setTemp(data.main.temp);
      setDescription(data.weather[0].description);
    }
    setRefreshing(false);
  };
  useEffect(() => {
    loadForecast();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {hasPermission && !awaitingPermissions ? (
        <>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadForecast()}
              />
            }
            style={{ marginTop: 80, flex: 1 }}
          >
            <Text style={styles.title}>Current Weather</Text>
            <Text style={{ alignItems: "center", textAlign: "center" }}>
              {loc ? (
                <Text>
                  {loc![0].city},{loc![0].country}
                </Text>
              ) : (
                <RefreshControl refreshing={refreshing} />
              )}
            </Text>
          </ScrollView>
          <View style={styles.current}>
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
      ) : null}
      {!hasPermission && !awaitingPermissions ? (
        <View>
          <Text>
            This app must use Location to continue. Please Grant permissions in
            settings.
          </Text>
        </View>
      ) : null}
      {awaitingPermissions ? <ActivityIndicator size="large" /> : null}
    </SafeAreaView>
  );
};

export default Weather;

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
});
