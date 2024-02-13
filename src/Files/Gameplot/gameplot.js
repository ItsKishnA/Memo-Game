import { Text, View, StyleSheet, ToastAndroid } from "react-native";
import Tile from "../Tile/tile.js";

const GamePlot = () => {
  let row = 2,
    column = 4;
  return (
    <View style={styles.screen}>
      {Array(row)
        .fill()
        .map((_, i) => (
          <View key={i} style={styles.eachLine}>
            {Array(column)
              .fill()
              .map((_, j) => (
                <Tile key={j} keyValue={column * i + j + 1} />
              ))}
          </View>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#836FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  tile: {
    width: 50,
    height: 50,
    margin: 5,
  },
  eachLine: {
    flexDirection: "row",
  },
});

export default GamePlot;
