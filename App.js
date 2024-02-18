import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
// import Rough from "./src/Files/Upgrading/rough";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>My Game...</Text>
      <GamePlot />
      <Fingerprint />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#836FFF",
  },
  text: {
    fontSize: 25,
    color: "#fff",
    padding: 10,
    margin: 20,
    marginTop: 30,
    textAlign: "center",
  },
});
