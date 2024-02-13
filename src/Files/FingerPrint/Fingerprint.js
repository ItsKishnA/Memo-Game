import { View, StyleSheet, Text } from "react-native";

const Fingerprint = () => {
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
    // flex: 1,
    backgroundColor: "black",
    flexDirection: "row",
    // borderRadius: 10,
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
  },

  line: {
    flex: 1,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#0091ab",
    margin: 10,
    marginRight: 5,
    // marginBottom: 20,
  },

  text: {
    fontSize: 10,
    // backgroundColor: "red",
    color: "#04d9ff",
    textAlign: "center",
    marginHorizontal: 10,
    textAlignVertical: "center",
  },
  bullet: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    // marginHorizontal: 10,
    textAlignVertical: "center",
  },
});

export default Fingerprint;
