import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import profileIcon from "../../Icons/user.png";
import memoGameIcon from "../../Icons/mahjong.png";
import musicIcon from "../../Icons/music.png";
import soundIcon from "../../Icons/audio-waves.png";
import settingIcon from "../../Icons/setting.png";

const NavBar = (props) => {
  const NavElement = ({
    source,
    text,
    fontSize = 18,
    padding = 10,
    paddingRight = 20,
  }) => (
    <TouchableOpacity style={styles.navElem}>
      <Image source={source} style={styles.icon} />
      <View style={{ justifyContent: "center" }}>
        <Text style={{ fontSize, padding, paddingRight }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navBar}>
      {/* Profile */}
      <NavElement source={profileIcon} text="Profile" />

      {/* Navbar Elements*/}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <NavElement source={memoGameIcon} text={props.title} />
        <NavElement source={memoGameIcon} text={props.title} />
      </View>

      {/* Sound & Music */}
      <View style={{ flexDirection: "row" }}>
        <NavElement source={soundIcon} padding={0} paddingRight={0} />
        <NavElement source={musicIcon} padding={0} paddingRight={0} />
      </View>

      {/* Settings */}
      <NavElement source={settingIcon} text="Settings" />
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
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    paddingRight: 10,
  },

  navBar: {
    backgroundColor: "black",
    flex: 1,
    padding: 10,
    margin: 10,
  },
});

export default NavBar;
