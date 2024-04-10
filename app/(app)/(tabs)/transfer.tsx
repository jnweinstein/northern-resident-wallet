import React, {useState} from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button } from 'tamagui';
import { Send, QrCode } from '@tamagui/lucide-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import QRCode from 'react-native-qrcode-svg';
import { db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc} from "firebase/firestore";

export default function Tab() {

  function SendScreen() {
    const [sourceWalletsList, setSourceWalletsList] = useState<any[]>([]);
    const [recipientAddress, setRecipientAddress] = useState('');
    const [sourceAddress, setSourceAddress] = useState('');
    const [amount, setAmount] = useState('');

    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          const wallets = [];
          for (const element of docSnap.data().wallets) {
            const walletDoc = await getDoc(doc(db, "wallets", element));
            if (walletDoc.exists()) {
              wallets.push(walletDoc.data())
            }
          }
          const list = wallets.map((wallet, i) => ({
            key: i,
            value: wallet.wallet_address
          }));
          setSourceWalletsList(list);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } 
    });

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
        await updateDoc(srcRef, {
          balance: currAmountSrc - parseInt(amount)
        });
        const destRef = doc(db, "wallets", recipientAddress);
        await updateDoc(destRef, {
          balance: currAmountDest + parseInt(amount)
        });
      } 
      // Add to transactions collection in db
      await addDoc(collection(db, "transactions"), {
        type: "Sent",
        date: Date(),
        to: recipientAddress,
        from: sourceAddress,
        amount: amount
      });

      /* await addDoc(collection(db, "transactions"), {
        type: "Received",
        date: Date(),
        to: sourceAddress,
        amount: amount
      }); */

      // Reset the fields after sending
      setRecipientAddress('');
      setSourceAddress('');
      setAmount('');

    };

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SelectList 
        setSelected={(val : any) => setSourceAddress(val)} 
        placeholder="Your Source Wallet Address" 
        data={sourceWalletsList} 
        search={false} 
        save="value"
        />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, marginTop: 10, padding: 5, width: '40%' }}
        placeholder="Recipient's Wallet Address"
        value={recipientAddress}
        onChangeText={text => setRecipientAddress(text)}
      />
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5, width: '40%' }}
        placeholder="Amount (BTC)"
        keyboardType="numeric"
        value={amount}
        onChangeText={text => setAmount(text)}
      />
      <Button variant="outlined" size="$5" onPress={handleSendBitcoin}>Send</Button>

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
}
