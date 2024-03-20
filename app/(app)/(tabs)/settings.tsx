import { View, Text, Button } from 'tamagui';
import { useSession } from '../../../ctx';

export default function Tab() {
  const { signOut } = useSession();
  return (
    <View style={{ justifyContent: 'left', alignItems: 'left', flex: 1, margin: '1em' }}>
      <Button
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Button>
    </View>
  );
}
