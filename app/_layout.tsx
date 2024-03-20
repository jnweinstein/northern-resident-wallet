import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { SessionProvider } from '../ctx'

import { TamaguiProvider } from 'tamagui'
import tamaguiConfig from '../tamagui.config'
export default function RootLayout() {

    const colorScheme = useColorScheme()
    return (
        // add this
        <TamaguiProvider config={tamaguiConfig}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <SessionProvider>
                    <Stack screenOptions={{ headerShown: false, }}>
                        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    </Stack>
                </SessionProvider>
            </ThemeProvider>
        </TamaguiProvider>

    )

}
