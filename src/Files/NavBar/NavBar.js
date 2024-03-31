import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import profileIcon from "../../Icons/user.png";
import memoGameIcon from "../../../assets/MemoGameIcon-WithoutBG.png";
import musicIcon from "../../Icons/music.png";
import soundIcon from "../../Icons/audio-waves.png";
import settingIcon from "../../Icons/setting.png";
import { useState } from "react";

const NavBar = (props) => {
  const [currentTab, setCurrentTab] = useState(props.tab);
  const [music, setMusic] = useState(true);
  const [sound, setSound] = useState(true);

  const title = ["Memo-Game", "Simon-Says"];

  const handleClick = (id, tab) => {
    if (tab) {
      if (currentTab === title[id]) return;
      else {
        setCurrentTab(title[id]);
        props.onTabChange(title[id]);
      }
    } else {
      if (id === 2) {
        setMusic(!music);
      }
      if (id === 1) {
        setSound(!sound);
      }
    }
  };

  const NavElement = ({
    source,
    text,
    fontSize = 18,
    padding = 10,
    paddingRight = 20,
    id,
    element = false,
    style = {},
    size = 35,
  }) => (
    <TouchableOpacity
      style={[styles.navElem, style]}
      onPress={() => handleClick(id, element)}
    >
      <Image
        source={source}
        style={[styles.icon, { height: size, width: size }]}
      />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize, padding, paddingRight, color: "darkgray" }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navBar}>
      {/* Profile */}
      <NavElement id={0} source={profileIcon} text="Profile" />

      {/* Navbar Elements*/}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <NavElement
          element={true}
          id={0}
          source={memoGameIcon}
          // text={title[0]}
          size={110}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor:
              currentTab === title[0]
                ? "rgba(100, 100, 100, 0.25)"
                : "transparent",
            borderColor: currentTab === title[0] ? null : "white",
            borderWidth: currentTab === title[0] ? 0 : 1,
            // width: 100,
          }}
        />
        {/* <NavElement
          element={true}
          id={1}
          source={memoGameIcon}
          text={title[1]}
          style={{
            backgroundColor: currentTab === title[1] ? "#222" : "transparent",
            borderColor: currentTab === title[1] ? null : "white",
            borderWidth: currentTab === title[1] ? 0 : 1,
          }}
        /> */}
      </View>

      {/* Sound & Music */}
      <View style={{ flexDirection: "row" }}>
        <NavElement
          id={1}
          source={soundIcon}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor: sound
              ? "rgba(100, 100, 100, 0.25)"
              : "transparent",
          }}
        />
        <NavElement
          id={2}
          source={musicIcon}
          padding={0}
          paddingRight={0}
          style={{
            backgroundColor: music
              ? "rgba(100, 100, 100, 0.25)"
              : "transparent",
          }}
        />
      </View>

      {/* Settings */}
      <NavElement id={3} source={settingIcon} text="Settings" />
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 35,
    height: 35,
    // backgroundColor: "white",
    // borderRadius: 8,
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },

  navElem: {
    alignSelf: "baseline",
    flexDirection: "row",
    backgroundColor: "rgba(100, 100, 100, 0.25)",
    borderRadius: 25,
    padding: 10,
    margin: 10,
    paddingRight: 10,
  },

  navBar: {
    backgroundColor: "transparent",
    flex: 1,
    padding: 10,
    margin: 10,
    paddingBottom: 30,
  },
});

export default NavBar;
