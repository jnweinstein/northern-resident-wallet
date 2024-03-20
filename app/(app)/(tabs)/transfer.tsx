import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'tamagui'

export default function Tab() {

  function SendScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Send screen</Text>
      </View>
    );
  }
  
  function ReceiveScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Receive screen</Text>
      </View>
    );
  }
  
  function TransferHomeScreen({ navigation }: {navigation: any}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button alignSelf="center" size="$5" onPress={() => navigation.navigate('Send')}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Send</Text>
          <Text>To an external BTC address</Text>
        </Button>
        <Button alignSelf="center" size="$5" onPress={() => navigation.navigate('Receive')}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Receive</Text>
          <Text>By sharing your BTC address</Text>
        </Button>
      </View>
    );
  }

  const TransferStack = createNativeStackNavigator();


  return (
    <TransferStack.Navigator>
      <TransferStack.Screen name=" " component={TransferHomeScreen} />
      <TransferStack.Screen name="Send" component={SendScreen} />
      <TransferStack.Screen name="Receive" component={ReceiveScreen} />
    </TransferStack.Navigator>
  );



  /*
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
  */
}
