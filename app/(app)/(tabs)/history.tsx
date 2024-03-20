import { View, Text, FlatList } from 'react-native';

export default function Tab() {
  const transactions = [
    { type: 'sent', date: '2024-03-20', to: 'Recipient Address 1', amount: 0.5 },
    { type: 'received', date: '2024-03-19', from: 'Sender Address 1', amount: 1.0 },
    { type: 'received', date: '2024-03-18', from: 'Sender Address 1', amount: 10.0 },
    { type: 'sent', date: '2024-03-16', to: 'Recipient Address 1', amount: 2.0 },
    { type: 'received', date: '2024-03-10', from: 'Sender Address 1', amount: 1.0 },
    // Add more transactions as needed
    // This will all be in a database soon
  ];

  const renderItem = ({ item }: {item: any}) => {
    const { type, date, to, from, amount } = item;
    return (
      <View style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: 'bold'}}>{type === 'sent' ? 'Sent' : 'Received'}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text>Date: {date}</Text>
        </View>
        <View style={{ flex: 3 }}>
          <Text>{type === 'sent' ? 'To: ' + to : 'From: ' + from}</Text>
        </View>
        <View style={{ flex: 1 }}>
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
          <Text>To/From</Text>
        </View>
        <View style={{ flex: 1 }}>
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
