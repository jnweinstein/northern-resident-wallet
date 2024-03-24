import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { AuthProvider } from '../ctx'

import { Stack } from 'expo-router'

import { useColorScheme } from 'react-native'

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();


  // const [fontsLoaded, fontError] = useFonts({
  //   'Inter-Bold': require('../assets/Inter-Bold.otf'),
  //   'Inter': require('../assets/Inter-Regular.otf')
  // });

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

    return (
        // add this
        <TamaguiProvider config={tamaguiConfig}>
            <ThemeProvider value={ DefaultTheme}>
                <AuthProvider>
                    <Stack screenOptions={{ headerShown: false, }} >
                        <Stack.Screen name='(outside)/login' options={{ headerShown: false }} />
                    </Stack>
                </AuthProvider>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
// import { useCallback } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

// SplashScreen.preventAutoHideAsync();

// export default function App() {
//   const [fontsLoaded, fontError] = useFonts({
//     'Inter-Bold': require('../assets/Inter-Bold.otf'),
//   });

//   const onLayoutRootView = useCallback(async () => {
//     if (fontsLoaded || fontError) {
//       await SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, fontError]);

//   if (!fontsLoaded && !fontError) {
//     return null;
//   }

//   return (
//     <View style={styles.container} onLayout={onLayoutRootView}>
//       <Text style={{ fontFamily: 'Inter-Bold', fontSize: 30 }}>Inter Black</Text>
//       <Text style={{ fontSize: 30 }}>Platform Default</Text>
//     </View>
//   );
// }
