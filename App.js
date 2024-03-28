import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import GamePlot from "./src/Files/Gameplot/gameplot";
// import NewTab from "./src/Files/NewTab/NewTab";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
// import { useFonts } from "expo-font";
import NavBar from "./src/Files/NavBar/NavBar.js";
import { useState, useRef } from "react";
import menuIcon from "./src/Icons/menu.png";
//TODO : Add splash screen to minmize the loading time

export default function App() {
  const [showMenu, setShowMenu] = useState(false);

  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Initially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  // let [fontsLoaded] = useFonts({
  //   "Pixelify-Sans": require("./src/fonts/static/PixelifySans-Regular.ttf"),
  // });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="white" />

      <NavBar tab={"Memo-Game"} />
      <Animated.View
        style={[
          styles.gameplot,

          {
            borderRadius: showMenu ? 20 : 0,
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          },
        ]}
      >
        {/* Menu Icon */}
        <TouchableOpacity
          onPress={() => {
            // console.log("pressed");

            // scalinng the view
            Animated.timing(scaleValue, {
              toValue: showMenu ? 1 : 0.88,
              duration: 300,
              useNativeDriver: true,
            }).start();

            // scalinng the view
            Animated.timing(offsetValue, {
              toValue: showMenu ? 0 : 260,
              duration: 300,
              useNativeDriver: true,
            }).start();

            // scalinng the view
            Animated.timing(closeButtonOffset, {
              toValue: !showMenu ? -30 : 0,
              duration: 300,
              useNativeDriver: true,
            }).start();

            setShowMenu(!showMenu);
          }}
          style={{
            // Add these styles to the TouchableOpacity
            height: 50,
            width: 50,
            position: "absolute",
            top: 40,
            left: 15,
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

        <Text style={styles.text}>Memo-Game</Text>
        {/*if navbar is on memo game then gameplot, or if simon game then new Tab */}
        <GamePlot />
      </Animated.View>
      {/* <NewTab /> */}
      <Fingerprint />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0c0c",
    paddingVertical: 20,
    flexDirection: "column",
  },

  gameplot: {
    position: "absolute",
    flexGrow: 1,
    backgroundColor: "#222",
    paddingVertical: 35,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  text: {
    position: "relative",
    top: 20,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: "white",
    textAlign: "center",
  },
});

// expo-font Installed
