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
    backgroundColor: "black",
    flexDirection: "row",
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
  },

  text: {
    fontSize: 10,
    color: "#04d9ff",
    textAlign: "center",
    marginHorizontal: 10,
    textAlignVertical: "center",
  },
  bullet: {
    fontSize: 10,
    color: "white",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Fingerprint;
