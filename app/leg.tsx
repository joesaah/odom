import { useState } from "react";
import { Button, StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { ChipSelect } from "@/components/ui/chip-select";
import { LabelTextInput } from "@/components/ui/label-text-input";

import { useThemeColor } from "@/hooks/use-theme-color";
import appStyles from "@/constants/styles";

export default function LegPage() {
  const [legName, setLegName] = useState<string>("No Leg Name");
  const [unit, setUnit] = useState<string>("mi");
  const color = useThemeColor({}, "text");

  return (
    <ThemedView style={styles.container}>
      <LabelTextInput
        labelStyle={appStyles.label}
        inputStyle={{
          ...appStyles.input,
          borderColor: color,
          color,
          paddingLeft: "3%",
        }}
        label="Name of Leg"
        value={legName}
        onChangeText={(value: string) => setLegName(value)}
      />
      <ChipSelect
        label="Unit of Distance"
        values={["mi", "km"]}
        selectedValue={unit}
        setSelectedValue={setUnit}
      />
      <ThemedView
        style={[
          appStyles.rows,
          { borderBottomWidth: 0, padding: 75 },
        ]}
      >
        {/* Using spacing around titles as a hack to make buttons desirable size */}
        <Button title="   Start   " onPress={() => console.log("Started Leg of Trip")} />
        <Button title="   Stop   " onPress={() => console.log("Ended Leg of Trip")} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
