import { useAuth } from '../../ctx';
import { Redirect, Stack, router } from 'expo-router';

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    console.log("found user!")
    router.replace('/')
    //return <Redirect href={'(app)/(tabs)'} />;
  }

  return <Stack />;
}