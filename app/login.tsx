import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useFonts } from 'expo-font'
import { useCallback } from 'react'

import { useSession } from '../ctx';

import * as SplashScreen from 'expo-splash-screen';
import { Button, H1, H2, Input, YStack } from 'tamagui';
import React from 'react';
SplashScreen.preventAutoHideAsync();

export default function SignIn() {
  const { signIn } = useSession();

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
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onLayout={onLayoutRootView}>
      <YStack gap="$2">
      <H2 padding="1em">Northern Residents</H2>
      <Input flex={1} size={"$4"} placeholder={`Username`} />
      <Input flex={1} size={"$4"} placeholder={`Password`} />
        <Button
          style={{fontFamily: "Inter-Bold"}}
          themeInverse
          onPress={() => {
            signIn();
            // Add checks for successful sign-ins
            router.replace('/');
          }}>
          Sign In
        </Button>
      </YStack>
    </View>
  );
}
