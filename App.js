import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  View,
} from "react-native";
import MemoGame from "./src/Files/MemoGame/MemoGame.js";
import SimonSays from "./src/Files/SimonSays/SimonSays.js";
import Fingerprint from "./src/Files/FingerPrint/Fingerprint";
import NavBar from "./src/Files/NavBar/NavBar.js";
import { useState, useRef } from "react";
import menuIcon from "./src/Icons/menu.png";
import closeIcon from "./src/Icons/close.png";
import Upgrading from "./src/Files/Upgrading/rough.js";
//TODO : Add splash screen to minmize the loading time of fonts

export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [currentTab, setCurrentTab] = useState("Memo-Game");

  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const createAnimation = (value, toValue) => {
    return Animated.timing(value, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    });
  };

  const navBarOpen = () => {
    Animated.parallel([
      createAnimation(scaleValue, showMenu ? 1 : 0.88),
      createAnimation(offsetValue, showMenu ? 0 : 260),
      createAnimation(closeButtonOffset, !showMenu ? 0 : 0),
    ]).start();

    setShowMenu(!showMenu);
  };

  return (
    <View style={styles.fullScreen}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="transparent" style="light" hidden={false} />
        <NavBar
          tab={"Memo-Game"}
          onTabChange={(tab) => setCurrentTab(tab)}
          onSoundDisabling={(prev) => setIsSoundEnabled(prev)}
        />
        <Animated.View
          style={[
            styles.memogame,
            {
              borderRadius: showMenu ? 20 : 0,
              transform: [{ scale: scaleValue }, { translateX: offsetValue }],
            },
          ]}
        >
          {/* NavBar Icon */}
          <Animated.View>
            <TouchableOpacity
              onPress={() => navBarOpen()}
              style={styles.NavBarIcon}
            >
              <Image
                source={showMenu ? closeIcon : menuIcon} // TODO : Add close icon too { showMenu ? closeIcon : menuIcon}
                style={styles.menuOrCloseImage}
              />
            </TouchableOpacity>
          </Animated.View>

          {/* <View> */}
          {/*if navbar is on memo game then memogame, or if simon game then new Tab */}
          {currentTab === "Memo-Game" ? <MemoGame /> : <SimonSays />}
          {/* <Upgrading /> */}
        </Animated.View>
        <Fingerprint />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#151515",
  },

  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    flexDirection: "column",
  },

  memogame: {
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
    // rgb(138,180,248)
    backgroundColor: "#76ABAE",
    backgroundColor: "#03c6e3",
    borderRadius: 50,
  },

  menuOrCloseImage: {
    height: "100%",
    width: "100%",
  },
});

// installed expo-av
// installed react-native-av

// import { useFonts } from "expo-font";

// let [fontsLoaded] = useFonts({
//   "Pixelify-Sans": require("./src/fonts/static/PixelifySans-Regular.ttf"),
// });

// font-family: 'Pixelify-Sans', sans-serif;
