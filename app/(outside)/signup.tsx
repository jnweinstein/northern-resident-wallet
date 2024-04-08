import { Redirect, router } from 'expo-router';
import { Platform, Text, View, Alert } from 'react-native';

import { useFonts } from 'expo-font'
import { useCallback, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen';
import { Button, H1, H2, Input, YStack } from 'tamagui';
import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseAuth';
import { useAuth } from '../../ctx';
import { db } from '../../firebaseConfig';
import { collection, addDoc } from "firebase/firestore"; 

//import InvalidAuthAlert from '../components/InvalidAuthAlert';
SplashScreen.preventAutoHideAsync();

type AuthErrorMsg = {
  code: string,
  message: string
}

export default function CreateAccount() {
  const { user } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [error, setError] = useState<AuthErrorMsg | null>();

  const [fontsLoaded, fontError] = useFonts({
      //Inter: require("../node_modules/@tamagui/font-inter/otf/Inter-Medium.otf"),
      //InterBold: require("../node_modules/@tamagui/font-inter/otf/Inter-Bold.otf"),
      //"Inter": require("../assets/Inter-Bold.otf"),
      "Inter": require('../../assets/Inter-Regular.otf'),
      "Inter-Bold": require("../../assets/Inter-Bold.otf")
  });
  const onLayoutRootView = useCallback(async () => {
      if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
      }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
      return null;
  }

  async function createAccount() {
    try {
      if (password !== confirm_password) {
        setError({code: "passwords don't match", message: "passwords don't match"})
        return;
      }
      const user = await createUserWithEmailAndPassword(auth, email, password)
      console.log('user', user);
      if (user?.user) {
        console.log('created account')

        try {
            const docRef = await addDoc(collection(db, "users"), {
              username: username,
              email: email,
              password: password,
              wallets: []
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        // clear out the states
        setUsername('');
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setError(null);
        router.replace('/login')
      }
    } catch (error: any) {
      console.log("received error", error.message)
      setError({code: error.code, message: error.message})
    }
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayoutRootView}>
      <YStack gap="$2">
      <H2 padding="1em">Create an Account</H2>
      <Input flex={1} size={"$4"} placeholder={`Username`} onChangeText={(text) => setUsername(text)}/>
      <Input flex={1} size={"$4"} placeholder={`Email`} onChangeText={(text) => setEmail(text)}/>
      <Input flex={1} size={"$4"} placeholder={`Password`} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
      <Input flex={1} size={"$4"} placeholder={`Confirm Password`} onChangeText={(text) => setConfirmPassword(text)} secureTextEntry={true} />
        <Button
          style={{fontFamily: "Inter-Bold"}}
          themeInverse
          onPress={createAccount}>
          Create Account
        </Button>
      </YStack>
      {/* {error?.code && <InvalidAuthAlert visible={true}/>} */}
      <Text>{error?.code && error.code}</Text>
    </View>
  );
}