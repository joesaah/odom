import { TouchableOpacity, StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

import appStyles from "@/constants/styles";

export type ChipSelectProps = {
  label: string
  values: string[]
  selectedValue: string
  setSelectedValue: (value: string) => void
};

export function ChipSelect(props: ChipSelectProps) {
  const { label, values, selectedValue, setSelectedValue } = props;
  return (
    <ThemedView style={{ padding: 10, }}>
      <ThemedText style={appStyles.label}>{label}</ThemedText>
      <ThemedView style={styles.row}>
        {values.map(value => (
          <TouchableOpacity
            key={value}
            onPress={() => setSelectedValue(value)}
            style={[styles.button, selectedValue === value && styles.selected]}>
            <ThemedText
              style={[
                styles.buttonLabel,
                selectedValue === value && styles.selectedLabel,
              ]}>
              {value}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "white",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "30%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "#007AFF",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#007AFF",
    textAlign: "center",
  },
  selectedLabel: {
    color: "white",
  },
});
