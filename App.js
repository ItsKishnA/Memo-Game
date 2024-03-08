import { StatusBar } from "expo-status-bar";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import Bluish from "./src/Images/BG-Gradient-Spots/bluish.png";
// import Whitish from "./src/Images/BG-Gradient-Spots/whitish.png";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.text}>. . . MEMO-GAME . . .</Text>
      {/* <ImageBackground
        source={Bluish}
        imageStyle={styles.bluish}
        style={styles.container}
      > */}
      <GamePlot />
      {/* </ImageBackground> */}
      <Fingerprint />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
  },
  bluish: {
    opacity: 0.35,
    resizeMode: "contain",
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
