import { router } from 'expo-router';
import { Text, View, Alert } from 'react-native';

import { useFonts } from 'expo-font'
import { useCallback, useState } from 'react'

import * as SplashScreen from 'expo-splash-screen';
import { Button, H1, H2, Input, YStack } from 'tamagui';
import React from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseAuth';
import { FirebaseError } from 'firebase/app';
SplashScreen.preventAutoHideAsync();

export default function SignIn() {
  //const { signIn } = useSession();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [fontsLoaded, fontError] = useFonts({
      //Inter: require("../node_modules/@tamagui/font-inter/otf/Inter-Medium.otf"),
      //InterBold: require("../node_modules/@tamagui/font-inter/otf/Inter-Bold.otf"),
      //"Inter": require("../assets/Inter-Bold.otf"),
      "Inter": require('../assets/Inter-Regular.otf'),
      "Inter-Bold": require("../assets/Inter-Bold.otf")
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
      const user = signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      Alert.alert(error.message)
    }
    setLoading(false)
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayoutRootView}>
      <YStack gap="$2">
      <H2 padding="1em">Northern Residents</H2>
      <Input flex={1} size={"$4"} placeholder={`Username`} onChange={(text) => setEmail(text.toString())}/>
      <Input flex={1} size={"$4"} placeholder={`Password`} onChange={(text) => setPassword(text.toString())} secureTextEntry={true} />
        <Button
          style={{fontFamily: "Inter-Bold"}}
          themeInverse
          disabled={loading}
          onPress={() => signInWithEmail()}>
          Sign In
        </Button>
      </YStack>
    </View>
  );
}
