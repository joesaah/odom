import { TextInput, type TextStyle, type TextInputProps } from "react-native";


import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";

type LabelTextInputProps = TextInputProps & {
  label: string;
  labelStyle: TextStyle;
  inputStyle: TextStyle;
};

export function LabelTextInput(props: LabelTextInputProps) {
  const {
    label,
    labelStyle,
    inputStyle,
    ...inputProps
  } = props;

  return (
    <ThemedView style={{ alignItems: "center", paddingBottom: "5%" }}>
      <ThemedText style={labelStyle}>{label}</ThemedText>
      <TextInput style={inputStyle} {...inputProps} />
    </ThemedView>
  );
}
