import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import Rough from "./src/Files/Upgrading/rough";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Text style={styles.text}>My Game...</Text>
      <GamePlot />
      {/* <Rough /> */}
      <Fingerprint />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 50,
    backgroundColor: "#836FFF",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    // backgroundColor: "#555",
    padding: 10,
    margin: 20,
    marginTop: 30,
    textAlign: "center",
  },
});
