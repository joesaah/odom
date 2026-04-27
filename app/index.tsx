import { useState, useEffect } from 'react';
import { Button, FlatList, StyleSheet } from "react-native";

import { router, useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import { TripItem, type Trip } from "@/components/trip-item";
import appStyles from "@/constants/styles";

export default function IndexPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const db = useSQLiteContext();
  const navigate = useNavigation();

  const DEFAULT_TRIP_NAME = "No Trip Name";
  const addNewTrip = async (): Promise<void> => {
    const newTrip = await db.runAsync("INSERT INTO trips (name) VALUES (?)", DEFAULT_TRIP_NAME);
    router.navigate({
      pathname: "/[tripId]",
      params: { tripId: newTrip.lastInsertRowId, name: DEFAULT_TRIP_NAME }
    });
  };

  useEffect(() => {
    const focusListener = navigate.addListener("focus", async () => {
      const dbTrips = await db.getAllAsync<Trip>("SELECT * FROM trips");
      setTrips(dbTrips);
    });

    return () => navigate.removeListener("focus", focusListener);
  }, [navigate]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ ...appStyles.rows, borderBottomWidth: 0 }}>
        <Button title="Add Car" onPress={() => router.navigate("/car")} />
        <Button title="New Trip" onPress={addNewTrip} />
      </ThemedView>
      <ThemedView style={styles.title}>
        <ThemedText type="title">Trips</ThemedText>
      </ThemedView>
      <FlatList
        data={trips}
        renderItem={({ item }) => {
          return (
            <TripItem
              trip={item}
              onPress={() =>
                router.navigate({
                  pathname: "/[tripId]",
                  params: { tripId: item.id, name: item.name },
                })
              }
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    marginTop: "5%",
    marginBottom: "5%",
    marginLeft: "10%",
  },
});
