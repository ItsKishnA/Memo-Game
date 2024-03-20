import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <View style={{ justifyContent: "center", alignContent: "center" }}>
        <View style={styles.line}></View>
        <Text style={styles.text}>. . . MEMO-GAME . . .</Text>
        <View style={styles.line}></View>
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
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },

  // line: {
  //   flex: 1,
  //   backgroundColor: "red",
  //   borderBottomWidth: StyleSheet.hairlineWidth,
  //   borderBottomColor: "#0091ab",
  //   margin: 10,
  // },

  text: {
    fontSize: 30,
    color: "#fff",
    padding: 10,
    marginTop: 50,
    textAlign: "center",
    fontWeight: "800",
    alignContent: "center",
  },
});
