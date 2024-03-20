import { View, Button, XStack, Avatar,  H6, H4, Card } from 'tamagui';
import { useSession } from '../../../ctx';
import EditableButton from '../../components/EditField';

export default function Tab() {
  const { signOut } = useSession();
  return (
    <View style={{ justifyContent: 'left', alignItems: 'left', flex: 1, margin: '1em' }}>
      <XStack alignContent='center' alignItems='center' space>
        <Avatar circular size="$4">
            <Avatar.Image src="http://picsum.photos/200/300" />
          <Avatar.Fallback backgroundColor="grey" />
        </Avatar>

        <H6><EditableButton title={"Username"} onSubmit={() => {}} /></H6>
      </XStack>
      <Button
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Button>
        <Card>
            <Card.Header>
                <H4>Edit Profile</H4>
            </Card.Header>
            
            <EditableButton title={"gargoyle6283@gmail.com"} label="Email" onSubmit={() => {}} />
            <EditableButton title={"DeepBlue"} label="Handle" onSubmit={() => {}} />
            <EditableButton title={"3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5"} label="Address" onSubmit={() => {}} />
        
            <Card.Footer />
            {/* any other components */}
            <Card.Background />
        </Card>
    </View>
  );
}
