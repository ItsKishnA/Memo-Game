import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";

const NewTab = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <TouchableOpacity style={[styles.quarter, styles.topLeft]} />
        <TouchableOpacity style={[styles.quarter, styles.topRight]} />
        <TouchableOpacity style={[styles.quarter, styles.bottomLeft]} />
        <TouchableOpacity style={[styles.quarter, styles.bottomRight]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  circle: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    // backgroundColor: "",
  },
  quarter: {
    width: "50%",
    height: "50%",
    // borderWidth: 1,
  },
  topLeft: {
    backgroundColor: "blue",
  },
  topRight: {
    backgroundColor: "pink",
  },
  bottomLeft: {
    backgroundColor: "yellow",
  },
  bottomRight: {
    backgroundColor: "red",
  },
});

export default NewTab;
