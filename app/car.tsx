import { useState } from "react";
import { TextInput, Button } from 'react-native';
import { router } from 'expo-router';

import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import appStyles from "@/constants/styles";

export default function CarPage() {
  const [teslaLogin, setTeslaLogin] = useState<string>("");
  const [teslaPassword, setTeslaPassword] = useState<string>("");
  const color = useThemeColor({}, 'text');

  return (
    <ThemedView style={{ gap: "5%", ...appStyles.columns }}>
      <TextInput
        style={{
          borderColor: color,
          color,
          paddingLeft: "3%",
          ...appStyles.input
        }}
        placeholder="Tesla Login"
        placeholderTextColor="gray"
        value={teslaLogin}
        onChangeText={value => setTeslaLogin(value)}
      />
      <TextInput
        style={{
          borderColor: color,
          color,
          paddingLeft: "3%",
          ...appStyles.input
        }}
        secureTextEntry
        placeholder="Tesla Password"
        placeholderTextColor="gray"
        value={teslaPassword}
        onChangeText={value => setTeslaPassword(value)}
      />
      <Button
        title="Add Car"
        onPress={() => {
          console.log("Car Added");
          router.back();
        }}
      />
    </ThemedView>
  );
}
