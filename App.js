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
import MemoGame from "./src/Files/Gameplot/gameplot";
import SimonSays from "./src/Files/NewTab/NewTab";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import NavBar from "./src/Files/NavBar/NavBar.js";
import { useState, useRef } from "react";
import menuIcon from "./src/Icons/menu.png";
import closeIcon from "./src/Icons/close.png";
//TODO : Add splash screen to minmize the loading time

export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentTab, setCurrentTab] = useState("Memo-Game"); // ["Memo-Game", "Simon-Game"

  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Initially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const navBarOpen = () => {
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
      toValue: !showMenu ? 0 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setShowMenu(!showMenu);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="white" />

      <NavBar tab={"Memo-Game"} onTabChange={(tab) => setCurrentTab(tab)} />
      <Animated.View
        style={[
          styles.gameplot,
          {
            borderRadius: showMenu ? 20 : 0,
            transform: [{ scale: scaleValue }, { translateX: offsetValue }],
          },
        ]}
        pointerEvents="box-none"
      >
        {/* Menu Icon */}
        <Animated.View
          style={{ transform: [{ translateY: closeButtonOffset }] }}
        >
          <TouchableOpacity
            onPress={() => navBarOpen()}
            style={styles.NavBarIcon}
          >
            <Image
              source={showMenu ? closeIcon : menuIcon} // TODO : Add close icon too { showMenu ? closeIcon : menuIcon}
              style={{
                // Remove these styles from the Image
                height: "100%",
                width: "100%",
              }}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* <View> */}
        {/*if navbar is on memo game then gameplot, or if simon game then new Tab */}
        {/* {currentTab === "Memo-Game" ? <MemoGame /> : <SimonSays />} */}
        <MemoGame />
        {/* <SimonSays /> */}
      </Animated.View>
      <Fingerprint />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    flexDirection: "column",
  },

  gameplot: {
    position: "absolute",
    flexGrow: 1,
    backgroundColor: "#151515",
    paddingVertical: 35,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  NavBarIcon: {
    height: 45,
    width: 45,
    position: "absolute",
    top: 9,
    left: 15,
    margin: 10,
    padding: 10,
    zIndex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    //
    // rgb(138,180,248)
    backgroundColor: "#76ABAE",
    backgroundColor: "#03c6e3",
    borderRadius: 50,
  },
});

// expo-font Installed
// react-native-sound Installed

// import { useFonts } from "expo-font";

// let [fontsLoaded] = useFonts({
//   "Pixelify-Sans": require("./src/fonts/static/PixelifySans-Regular.ttf"),
// });

// font-family: 'Pixelify-Sans', sans-serif;
