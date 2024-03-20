import { View, Text } from 'tamagui';
import { useSession } from '../../../ctx';

export default function Tab() {
  const { signOut } = useSession();
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
