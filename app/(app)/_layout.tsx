import { useAuth } from "../../ctx";
import LoadingScreen from "../../components/LoadingScreen";
import { Redirect, Tabs } from "expo-router";

const Layout = () => {
    const { user, loading } = useAuth();
    if (loading) {
      return <LoadingScreen />
    }
    if (!user) {
      return <Redirect href="/login" />
    }
    return <Tabs />
}

export default Layout;
