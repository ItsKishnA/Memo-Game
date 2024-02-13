import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";

const cardImages = [
  { src: "./src/Images/Tiles/computing.png" },
  { src: "./src/Images/Tiles/direct-memory-access.png" },
  { src: "./src/Images/Tiles/grid.png" },
  { src: "./src/Images/Tiles/micro-sd-card.png" },
  { src: "./src/Images/Tiles/ram.png" },
  { src: "./src/Images/Tiles/usb-stick.png" },
];

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
    // backgroundColor: "#555",
    padding: 10,
    margin: 20,
    marginTop: 30,
    textAlign: "center",
  },
});
