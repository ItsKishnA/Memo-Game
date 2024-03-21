import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import { useFonts } from "expo-font";

export default function App() {
  let [fontsLoaded] = useFonts({
    "Pixelify-Sans": require("./src/fonts/PixelifySans-VariableFont_wght.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.gameplot}>
        <Text style={styles.text}>. . . MEMO-GAME . . .</Text>
        <GamePlot />
      </View>
      <Fingerprint />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
    flexDirection: "column",
  },

  gameplot: {
    padding: 0,
    margin: 0,
    // flex: 1,
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    // backgroundColor: "#333",
    paddingBottom: 50,
    // top: 0,
  },

  text: {
    position: "relative",
    top: 20,
    fontSize: 30,
    fontFamily: "Pixelify-Sans",
    color: "aqua",
    // padding: 10,
    // marginTop: 30,
    textAlign: "center",
  },
});
