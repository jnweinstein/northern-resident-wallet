import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useFonts } from 'expo-font'
import { useCallback } from 'react'

import { useSession } from '../ctx';

import * as SplashScreen from 'expo-splash-screen';
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
      <Text
        style={{fontFamily: "Inter-Bold"}}
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/');
        }}>
        Sign In
      </Text>
      <Text>Normal</Text>
    </View>
  );
}
