import { useAuth } from "../../ctx";
import LoadingScreen from "../../components/LoadingScreen";
import { Redirect, Stack } from "expo-router";

const Layout = () => {
    const { user, loading } = useAuth();
    if (loading) {
      return <LoadingScreen />
    }
    if (!user) {
      return <Redirect href="/login" />
    }
    return <Stack screenOptions={{ headerShown: false }}/>
}

export default Layout;
