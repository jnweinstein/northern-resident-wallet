import { View } from "tamagui";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoadingScreen;