import React, {useState} from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'tamagui';
import { Send, QrCode } from '@tamagui/lucide-icons'
import QRCode from 'react-native-qrcode-svg';
import { db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export default function Tab() {

  function SendScreen() {
    const [recipientAddress, setRecipientAddress] = useState('');
    const [sourceAddress, setSourceAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSendBitcoin = async () => {
      // Here you would handle the logic for sending Bitcoin
      // For this example, we'll just show an alert with the entered values
      Alert.alert('Send Bitcoin', `Please confirm: You're sending ${amount} BTC to ${recipientAddress} from ${sourceAddress}`);
      const sourceAddressDoc = await getDoc(doc(db, "wallets", sourceAddress));
      const recipientAddressDoc = await getDoc(doc(db, "wallets", recipientAddress));
      if (sourceAddressDoc.exists() && recipientAddressDoc.exists()) {
        const currAmountSrc = sourceAddressDoc.data().balance;
        const currAmountDest = recipientAddressDoc.data().balance;

        const srcRef = doc(db, "wallets", sourceAddress);
        const srcbalance = currAmountSrc - currAmountDest
        await updateDoc(srcRef, {
          balance: srcbalance
        });
        const destRef = doc(db, "wallets", recipientAddress);
        const destbalance = currAmountDest + currAmountSrc
        await updateDoc(destRef, {
          balance: destbalance
        });
        
      } 

      // Reset the fields after sending
      setRecipientAddress('');
      setSourceAddress('');
      setAmount('');
    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5, width: '80%' }}
        placeholder="Your Source Wallet's Address"
        value={sourceAddress}
        onChangeText={text => setSourceAddress(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5, width: '80%' }}
        placeholder="Recipient's Wallet Address"
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
      <Button onPress={handleSendBitcoin}>Send</Button>

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
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Button variant="outlined" size="$8" onPress={() => navigation.navigate('Send')} style={{ marginRight: 20 }} icon={Send}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                Send {'\n'} <Text style={{ fontSize: 12, textAlign: 'center' }}>To an external address</Text>
            </Text>
          </Button>
          <Button variant="outlined" size="$8" onPress={() => navigation.navigate('Receive')} style={{ marginRight: 20 }} icon={QrCode}>
            <Text style={{ fontWeight: 'bold', fontSize: 24, textAlign: 'center' }}>
                Receive {'\n'} <Text style={{ fontSize: 12, textAlign: 'center' }}>By sharing your address</Text>
            </Text>
          </Button>
        </View>
      </View>

    );
  }

  const TransferStack = createNativeStackNavigator();


  return (
    <TransferStack.Navigator screenOptions={{ headerShown: false }}>
      <TransferStack.Screen name="Transfer" component={TransferHomeScreen} />
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
