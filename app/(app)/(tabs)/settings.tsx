import { View, Button, XStack, Avatar,  H6 } from 'tamagui';
import { useSession } from '../../../ctx';

export default function Tab() {
  const { signOut } = useSession();
  return (
    <View style={{ justifyContent: 'left', alignItems: 'left', flex: 1, margin: '1em' }}>
      <XStack alignContent='center' alignItems='center' space>
        <Avatar circular size="$4">
          <Avatar.Fallback backgroundColor="grey" />
        </Avatar>
        <H6>(username)</H6>
      </XStack>
      <Button
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Button>
    </View>
  );
}
