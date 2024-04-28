import React, {useState, useEffect} from 'react';
import { View, Text, FlatList } from 'react-native';
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { collection, getDocs } from "firebase/firestore";
import { db } from '../../../firebaseConfig';

export default function Tab() {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const querySnapshot = await getDocs(collection(db, "transactions"));
        const list: any[] = [];
        querySnapshot.forEach((doc) => {
            list.push(doc.data());
        });
        setTransactions(list);
      } 
    });
  }, []);



  const renderItem = ({ item }: {item: any}) => {
    const { type, date, to, from, amount } = item;
    return (
      <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold'}}>{type}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Date: {date}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>To: {to}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>From: {from}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Amount: {amount} BTC</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <View style={{ flex: 1 }}>
          <Text>Type</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Date</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>To</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>From</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Amount</Text>
        </View>
      </View>
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
