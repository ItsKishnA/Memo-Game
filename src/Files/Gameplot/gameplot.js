import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Text,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

const rows = 2,
  columns = 4;

// ARRAY DATA
const CardImages = [
  { image: require(`../../Images/Tiles/tile-back-cover.png`) },
  { image: require(`../../Images/Tiles/1.png`) },
  { image: require(`../../Images/Tiles/2.png`) },
  { image: require(`../../Images/Tiles/3.png`) },
  { image: require(`../../Images/Tiles/4.png`) },
  { image: require(`../../Images/Tiles/5.png`) },
  { image: require(`../../Images/Tiles/6.png`) },
  { image: require(`../../Images/Tiles/7.png`) },
  { image: require(`../../Images/Tiles/8.png`) },
];

// FUNCTION TO GENERATE PAIRS OF IMAGE INDEX B/W 1 TO 8
function imagePairs() {
  const numPairs = (rows * columns) / 2;
  const indices = new Set();

  while (indices.size < numPairs) {
    indices.add(Math.floor(Math.random() * (CardImages.length - 1)));
  }

  let pairs = Array.from(indices).flatMap((index) => [index + 1, index + 1]);

  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  console.log("Pairs are : " + pairs);
  return pairs;
}
let pairs = imagePairs();

const Grid = ({}) => {
  const [pressedImages, setPressedImages] = useState([]);

  // FUNCTION TO HANDLE TILE PRESS
  const handleClick = (tileIndex) => {
    console.log("tileIndex is : " + tileIndex);
    setPressedImages((prevState) => {
      if (prevState.includes(tileIndex)) {
        // If the tile is already pressed, revert it back to the original
        return prevState.filter((index) => index !== tileIndex);
      } else {
        // If two tiles are already flipped, revert them back
        if (prevState.length === 2) {
          return [tileIndex];
        }
        // Otherwise, flip the tile
        return [...prevState, tileIndex];
      }
    });
  };

  // FUNCTION TO HANDLE BUTTON PRESS
  const handleButtonPress = () => {
    // Set all images to hidden
    setPressedImages([]);
    pairs = imagePairs();
  };

  return (
    <View>
      <View style={styles.tileContainer}>
        {Array(rows) // row=2
          .fill()
          .map((_, i) => (
            <View key={i} style={styles.eachLine}>
              {Array(columns) // column=4
                .fill()
                .map((_, j) => {
                  const tileIndex = columns * i + j;
                  const source = pressedImages.includes(tileIndex)
                    ? CardImages[pairs[tileIndex]].image
                    : CardImages[0].image;

                  return (
                    <Pressable
                      onPress={() => handleClick(tileIndex)}
                      key={tileIndex}
                    >
                      <Image
                        source={source}
                        style={[
                          styles.tile,
                          source === CardImages[0].image && styles.otherStyle,
                        ]}
                        keyValue={pairs[tileIndex]}
                      />
                    </Pressable>
                  );
                })}
            </View>
          ))}
      </View>
      <Button
        title="New Game"
        style={styles.button}
        onPress={handleButtonPress}
      />
    </View>
  );
};

const GamePlot = () => (
  <View style={styles.screen}>
    <Grid />
  </View>
);

// STYLESHEET
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },

  tileContainer: {
    margin: 10,
  },

  tile: {
    width: 65,
    height: 65,
    margin: 5,
  },

  eachLine: {
    flexDirection: "row",
  },

  otherStyle: {
    tintColor: "aqua",
    opacity: 0.8,
  },

  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    marginTop: 40,
    borderRadius: 10,
  },
});

export default GamePlot;

// #E8AFFF neon purple for bg of opened tiles

/*
computing.png
direct-memory-access.png
grid.png
micro-sd-card.png
ram.png
usb-stick.png
hacker.png
cloud.png
*/
