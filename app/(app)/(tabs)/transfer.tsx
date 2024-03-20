import React, {useState} from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'tamagui';
import QRCode from 'react-native-qrcode-svg';

export default function Tab() {

  function SendScreen() {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSendBitcoin = () => {
      // Here you would handle the logic for sending Bitcoin
      // For this example, we'll just show an alert with the entered values
      Alert.alert('Send Bitcoin', `Please confirm: You're sending ${amount} BTC to ${recipientAddress}`);
      // Reset the fields after sending
      setRecipientAddress('');
      setAmount('');
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5, width: '80%' }}
        placeholder="Recipient's Bitcoin Address"
        value={recipientAddress}
        onChangeText={text => setRecipientAddress(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5, width: '80%' }}
        placeholder="Amount (BTC)"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <Button onPress={handleSendBitcoin}>Send Bitcoin!</Button>

    </View>
    );
  }
  
  function ReceiveScreen() {
    const bitcoinAddress = 'Jw6ZceUxp6FzdaY3OdJZYLcbeeSAR1LdQAzhHlpSZP8CtqKtDZHruL9u9Qftbq5s'; // random bitcoin address for now

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 24, marginBottom: 20 }}>Your Bitcoin Address:</Text>
        <Text style={{ marginBottom: 20 }}>{bitcoinAddress}</Text>
         <QRCode
          value={bitcoinAddress}
          size={200}
          color="black"
          backgroundColor="white"
        />
        <Button>Copy</Button>
        <Button>Share</Button>
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
