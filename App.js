import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>. . . MEMO-GAME . . .</Text>
      <GamePlot />
      <Fingerprint />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },

  text: {
    fontSize: 30,
    color: "#fff",
    padding: 10,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "800",
  },
});
