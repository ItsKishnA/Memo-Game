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
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import { useFonts } from "expo-font";
// import AppLoading from "expo-app-loading";
import NavBar from "./src/Files/NavBar/NavBar.js";
import { useState } from "react";
import menuIcon from "./src/Icons/menu.png";
//TODO : Add splash screen to minmize the loading time

export default function App() {
  const [title, setTitle] = useState("Memo-Game");

  let [fontsLoaded] = useFonts({
    "Pixelify-Sans": require("./src/fonts/static/PixelifySans-Regular.ttf"),
  });

  // if (!fontsLoaded) {
  //   return <AppLoading />;
  // }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {/* <NavBar title={title}> */}
      <TouchableOpacity>
        <Image
          source={menuIcon}
          style={{
            height: 50,
            width: 50,
            position: "absolute",
            top: 5,
            left: 5,
            // backgroundColor: "rgba(100, 100, 100, 0.9)",
            margin: 10,
            padding: 10,
            opacity: 0.8,
          }}
        />
      </TouchableOpacity>
      <View style={styles.gameplot}>
        <Text style={styles.text}>. . . MEMO-GAME . . .</Text>
        <GamePlot />
      </View>
      {/* </NavBar> */}
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

// expo-app-loading Installed
// expo-font Installed
