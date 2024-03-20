import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useColorScheme } from 'react-native'
import { SessionProvider } from '../ctx'

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Inter: require("../node_modules/@tamagui/font-inter/otf/Inter-Medium.otf"),
        InterBold: require("../node_modules/@tamagui/font-inter/otf/Inter-Bold.otf"),
    });
    if (!loaded) {
        return null;
    }
    
    return (
        // add this
        <TamaguiProvider config={tamaguiConfig}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SessionProvider>
                    <Stack screenOptions={{ headerShown: false, }}>
                        <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </SessionProvider>
            </ThemeProvider>
        </TamaguiProvider>
    )
}
