import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
import NewTab from "./src/Files/NewTab/NewTab";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import { useFonts } from "expo-font";
import NavBar from "./src/Files/NavBar/NavBar.js";
import { useState } from "react";
import menuIcon from "./src/Icons/menu.png";
//TODO : Add splash screen to minmize the loading time

export default function App() {
  let [fontsLoaded] = useFonts({
    "Pixelify-Sans": require("./src/fonts/static/PixelifySans-Regular.ttf"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      <NavBar tab={"Memo-Game"} />

      {/* Menu Icon */}
      {/* <View style={styles.gameplot}>
        <TouchableOpacity
          onPress={() => {
            console.log("pressed");
          }}
          style={{
            // Add these styles to the TouchableOpacity
            height: 50,
            width: 50,
            position: "absolute",
            top: 5,
            left: 10,
            margin: 10,
            padding: 10,
            zIndex: 1,
          }}
        >
          <Image
            source={menuIcon}
            style={{
              // Remove these styles from the Image
              height: "100%",
              width: "100%",
              opacity: 0.8,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.text}>. . . MEMO-GAME . . .</Text>
        <GamePlot />
      </View> */}
      <NewTab />
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
    position: "absolute",
    padding: 0,
    margin: 0,
    // flex: 1,
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "#333",
    paddingBottom: 50,
    // top: 0,
    left: 0,
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

// expo-font Installed
