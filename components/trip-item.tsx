import { MaterialIcons } from '@expo/vector-icons';

import { Pressable } from 'react-native';

import { ThemedView } from "@/components/themed-view";
import { ThemedText } from "@/components/themed-text";
import appStyles from '@/constants/styles';

type Trip = {
  id: number;
  name: string;
  legs: number;
  distance: string;
};

type TripItemProps = {
  trip: Trip;
  onPress: () => void;
};

const TripItem = (props: TripItemProps) => {
  const { trip, onPress } = props;
  return (
    <ThemedView style={appStyles.rows}>
      <Pressable style={{ flexShrink: 1, width: '50%' }} onPress={onPress}>
        <ThemedText
          type='link'
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {trip.name}
        </ThemedText>
      </Pressable>
      <ThemedText>{trip.legs} Legs</ThemedText>
      <ThemedText>{trip.distance}</ThemedText>
      <MaterialIcons.Button
        backgroundColor={'transparent'}
        name={'delete-forever'}
        onPress={() => console.log("Delete Pressed")}
      />
    </ThemedView>
  );
};

export { Trip, TripItem };
