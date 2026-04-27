import { useEffect, useState, useRef } from "react";
import { TextInput, Button, FlatList, StyleSheet } from "react-native";

import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useSQLiteContext } from "expo-sqlite";

import { ThemedView } from "@/components/themed-view";
import { LegItem, type Leg } from "@/components/leg-item";

import { useThemeColor } from "@/hooks/use-theme-color";
import appStyles from "@/constants/styles";

export default function ItemPage() {
  const { tripId, name } = useLocalSearchParams();
  const [tripName, setTripName] = useState<string>(name as string);
  const tripNameRef = useRef(tripName);
  const [legs, setLegs] = useState<Leg[]>([]);

  const db = useSQLiteContext();
  const navigate = useNavigation();
  const color = useThemeColor({}, 'text');

  useEffect(() => {
    tripNameRef.current = tripName;
  }, [tripName]);

  useEffect(() => {
    const beforeRemoveListener = navigate.addListener("beforeRemove", async (e) => {
      e.preventDefault();
      await updateTrip();
      navigate.dispatch(e.data.action);
    });

    const focusListener = navigate.addListener("focus", async () => {
      const dbLegs = await db.getAllAsync<Leg>("SELECT * FROM legs WHERE tripId = ?", tripId as unknown as number);
      setLegs(dbLegs);
    });

    return () => {
      navigate.removeListener("beforeRemove", beforeRemoveListener);
      navigate.removeListener("focus", focusListener);
    }
  }, [navigate]);

  const updateTrip = async () => {
    const updateTripName = await db.prepareAsync("UPDATE trips SET name = ? WHERE id = ?");
    const tripName = tripNameRef.current;
    if (tripName !== name) {
      try {
        await updateTripName.executeAsync(tripName, tripId as unknown as number);
      } finally {
        await updateTripName.finalizeAsync();
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ alignItems: "center" }}>
        <TextInput
          style={{
            borderColor: color,
            color,
            ...styles.input,
            ...appStyles.input
          }}
          value={tripName}
          onChangeText={value => setTripName(value)}
          onBlur={updateTrip}
        />
        <Button title="Add New Leg" onPress={() => router.navigate("/leg")} />
      </ThemedView>
      <FlatList
        style={{ marginTop: "5%" }}
        data={legs}
        renderItem={({ item }) => {
          return (
            <LegItem
              leg={item}
              onPress={() => console.log(`${item.name} pressed`)}
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
    flex: 1,
    justifyContent: "space-evenly",
  },
  input: {
    marginTop: "5%",
    marginBottom: "5%",
  },
});
