import { View, StyleSheet, Text } from "react-native";
import { useFonts } from "expo-font";

const Fingerprint = () => {
  let [fontsLoaded] = useFonts({
    "Pixelify-Sans": require("../../fonts/PixelifySans-VariableFont_wght.ttf"),
  });

  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.bullet}>{"\u2B24"}</Text>
      <Text style={styles.text}>ɛƖ.AvI.ator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "row",
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
    //positioning at the end of the screen
    position: "absolute",
    bottom: 0,
    // marginTop: 10,
  },

  line: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#0091ab",
    margin: 10,
    marginRight: 5,
  },

  text: {
    fontSize: 13,
    color: "#04d9ff",
    textAlign: "center",
    marginHorizontal: 10,
    textAlignVertical: "center",
    fontFamily: "Pixelify-Sans",

    // backgroundColor: "white",
  },
  bullet: {
    fontSize: 10,
    color: "white",
    textAlignVertical: "center",
  },
});

export default Fingerprint;
