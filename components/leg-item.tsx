import { MaterialIcons } from '@expo/vector-icons';

import { Pressable } from 'react-native';

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import appStyles from '@/constants/styles';

type Leg = {
  id: number;
  name: string;
  distance: string;
};

type LegItemProps = {
  leg: Leg;
  onPress: () => void;
};

const LegItem = (props: LegItemProps) => {
  const { leg, onPress } = props;
  return (
    <ThemedView style={appStyles.rows}>
      <Pressable style={{ flexShrink: 1, width: '50%' }} onPress={onPress}>
        <ThemedText
          type='link'
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {leg.name}
        </ThemedText>
      </Pressable>
      <ThemedText>{leg.distance}</ThemedText>
      <MaterialIcons.Button
        backgroundColor={'transparent'}
        name={'delete-forever'}
        onPress={() => console.log("Delete Pressed")}
      />
    </ThemedView>
  );
};

export { Leg, LegItem };
