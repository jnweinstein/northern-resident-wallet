import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TamaguiProvider, Button } from 'tamagui';

export default function Tab() {
  const navigation = useNavigation();

  // Component for the Send Page
  const SendPage = () => {
    return (
      <div>
        <h1>Send Bitcoin</h1>
        {/* Additional content for the Send Page */}
      </div>
    );
  };

  // Component for the Receive Page
  const ReceivePage = () => {
    return (
      <div>
        <h1>Receive Bitcoin</h1>
        {/* Additional content for the Receive Page */}
      </div>
    );
  };

  /*
  const handleSendClick = () => {
    navigation.navigate('SendPage');
  };

  // Function to handle navigation to Receive Page
  const handleReceiveClick = () => {
    navigation.navigate('ReceivePage');
  };
  */

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <Button alignSelf="center" size="$5">
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Send</Text>
          <Text>To an external BTC address</Text>
        </Button>
        <Button alignSelf="center" size="$5">
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Receive</Text>
          <Text>By sharing your BTC address</Text>
      </Button>
    </View>
  );
}
