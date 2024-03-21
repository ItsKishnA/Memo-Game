// import { StatusBar } from "expo-status-bar";
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
    // alignItems: "center",
    // justifyContent: "center",
    // margin: 0,
    // padding: 0,
  },

  gameplot: {
    padding: 0,
    margin: 0,
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    // backgroundColor: "#333",
    // top: 0,
  },

  text: {
    fontSize: 30,
    // fontSize: Dimensions.get("window").width * 0.05,
    fontFamily: "Pixelify-Sans",
    color: "aqua",
    padding: 10,
    marginTop: 50,
    textAlign: "center",
    alignContent: "center",
  },
});
