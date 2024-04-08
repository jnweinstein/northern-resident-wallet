import { Redirect, router } from 'expo-router';
import { Platform, Text, View, Alert } from 'react-native';

import { useFonts } from 'expo-font'
import { useCallback, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen';
import { Button, H1, H2, Input, YStack } from 'tamagui';
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseAuth';
import { useAuth } from '../../ctx';
//import InvalidAuthAlert from '../components/InvalidAuthAlert';
SplashScreen.preventAutoHideAsync();

type AuthErrorMsg = {
  code: string,
  message: string
}

export default function SignIn() {
  const { user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
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
  async function signInWithEmail() {
    setLoading(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('user', user);
      if (user?.user) {
        console.log('redirecting to (app)/(tabs)  ')
        setEmail('');
        setPassword('');
        setError(null);
        router.replace('/')
      }
    } catch (error: any) {
      console.log("received error", error.message)
      setError({code: error.code, message: error.message})
    }
    setLoading(false)
  }

  async function createAccount() {
    router.replace('/signup')
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayoutRootView}>
      <YStack gap="$2">
      <H2 padding="1em">Northern Residents</H2>
      <Input flex={1} size={"$4"} placeholder={`Username`} onChangeText={(text) => setEmail(text)}/>
      <Input flex={1} size={"$4"} placeholder={`Password`} onChangeText={(text) => setPassword(text)} secureTextEntry={true} />
        <Button
          style={{fontFamily: "Inter-Bold"}}
          themeInverse
          disabled={loading}
          onPress={signInWithEmail}>
          Sign In
        </Button>
        <Button
          style={{fontFamily: "Inter-Bold"}}
          themeInverse
          disabled={loading}
          onPress={createAccount}>
          Create an Account
        </Button>
      </YStack>
      {/* {error?.code && <InvalidAuthAlert visible={true}/>} */}
      <Text>{error?.code && error.code}</Text>
    </View>
  );
}
