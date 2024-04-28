// home screen
import React, { useState, useEffect, useMemo } from 'react';
import type { CardProps, FontSizeTokens, SelectProps } from 'tamagui'
import { View, ScrollView, Text, H5, Button, Card, XStack, Separator, H4, Paragraph, Adapt, Select, Sheet, YStack, getFontSize, Label, Input, styled } from 'tamagui';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons'
import { SelectList } from 'react-native-dropdown-select-list'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc, updateDoc, deleteDoc, arrayUnion, arrayRemove } from "firebase/firestore";

type BalanceProps = {
    name: string,
    balance: number
}

function generateToken(n : any) {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var token = '';
  for(var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
  }
  return token;
}

export default function Tab() {
  const [uid, setUID] = useState('');
  const [user, setUser] = useState('');
  const [userWallets, setUserWallets] = useState<any[]>([]);
  const [addWalletName, setAddWalletName] = useState("");
  const [deleteWalletAddress, setDeleteWalletAddress] = useState("");
  const [selected, setSelected] = useState(""); // for the edit wallet dropdown (add or delete a wallet)

  const data = [
    {key:'1', value:'Add a Wallet'},
    {key:'2', value:'Delete a Wallet'},
  ]

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const docSnap = await getDoc(doc(db, "users", user.uid));

        if (docSnap.exists()) {
          setUID(user.uid);
          setUser(docSnap.data().username);
          const wallets = [];
          for (const element of docSnap.data().wallets) {
            const walletDoc = await getDoc(doc(db, "wallets", element));
            if (walletDoc.exists()) {
              wallets.push(walletDoc.data())
            }
          }
          setUserWallets(wallets);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } 
    });
  }, []);

  const handleAddFormSubmit = async () => {
    const token = generateToken(10);
    const walletDocRef = await setDoc(doc(db, "wallets", token), {
      user_id: uid,
      wallet_name: addWalletName,
      wallet_address: token,
      balance: 100
    });
    // Add reference to user's wallets field
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
        wallets: arrayUnion(token)
    });
    setSelected("");
    setAddWalletName("");
  };

  const handleDeleteFormSubmit = async () => {
    await deleteDoc(doc(db, "wallets", deleteWalletAddress));
    // Delete the reference in user's wallets field
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
        wallets: arrayRemove(deleteWalletAddress)
    });
    setSelected("");
    setDeleteWalletAddress("");
  };

  return (
    <ScrollView>
    <View style={{ justifyContent: 'left', alignItems: 'left', flex: 1, margin: '1em' }}>
      <H4>Hello, {user}</H4>
      <Separator marginVertical={15} style={{ width: '80%' }} maxWidth={800} borderColor={'midnightblue'} />
      <BalanceCard size="$5" style={{ width: '80%' }} maxWidth={800}/>
      <YStack gap="$4" padding="$3">
      <XStack ai="center" gap="$4">
        <Label htmlFor="select-coin" f={1} miw={80} >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Wallets</Text>
        </Label>
        <SelectDemoItem id="select-coin" />
        <SelectList setSelected={(val : any) => setSelected(val)} placeholder="Edit Wallets" data={data} search={false} save="value"/>
      </XStack>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Address</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Name</Text>
        <Text style={{ fontSize: 14, fontWeight: 'bold'}}>Balance</Text>
      </View>

      {userWallets.map((wallet : any) => (
          <View key={wallet.wallet_address} style={{ flexDirection: 'row' , justifyContent: 'space-between' }}>
              <Label selectable={true}>{wallet.wallet_address}</Label>
              <Label>{wallet.wallet_name}</Label>
              <Label>{wallet.balance}</Label>
              {/* You can add more details or actions related to each wallet here */}
          </View>
      ))}
      {selected=="Add a Wallet" && (
        <View>
            <Input size={"$1"} marginBottom={"$3"} placeholder={`Wallet Name`} onChangeText={(text) => setAddWalletName(text)}/>
            <Button onPress={handleAddFormSubmit}>Add Wallet</Button>
        </View>
      )}
      {selected=="Delete a Wallet" && (
        <View>
            <Input size={"$1"} marginBottom={"$3"} placeholder={`Wallet Address`} onChangeText={(text) => setDeleteWalletAddress(text)}/>
            <Button onPress={handleDeleteFormSubmit}>Delete Wallet</Button>
        </View>
      )}
    </YStack>

    </View>
    </ScrollView>
  );
}

export function BalanceCard(props: CardProps) {
  return (
    <Card elevate size="$5" bordered {...props}>
      <Card.Header padded>
        <H5>Your Balance</H5>
      </Card.Header>

      <Paragraph fontSize={30} paddingLeft={25} paddingBottom={10}>
        0 BTC
      </Paragraph>
      <Text fontSize={15} color="$blue" paddingLeft={25}>
        $0.00
      </Text>

      <Card.Footer padded>
        <XStack flex={1} />
        <Button borderRadius="$10">Purchase</Button>
      </Card.Footer>

      <Card.Background>
      </Card.Background>
    </Card>
  )
}

export function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState('bitcoin')

  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger width={120} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="sm" platform="touch">
        <Sheet
          native={!!props.native}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
        </Select.ScrollUpButton>

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={100}
        >
          <Select.Group>
            <Select.Label>Coins</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                coins.map((item, i) => {
                  return (
                    <Select.Item
                      index={i}
                      key={item.name}
                      value={item.name.toLowerCase()}
                    >
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        <Check size={16} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  )
                }),
              [coins]
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {props.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width={'$4'}
              pointerEvents="none"
            >
              <ChevronDown
                size={getFontSize((props.size as FontSizeTokens) ?? '$true')}
              />
            </YStack>
          )}
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  )
}

const coins = [
  { name: 'Bitcoin' },
]