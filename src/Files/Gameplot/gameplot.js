import {
  View,
  StyleSheet,
  Image,
  Pressable,
  // ToastAndroid,
  // Text,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

const rows = 2,
  columns = 4;

// TODO: Add more images to game
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

  // Generate random indices
  while (indices.size < numPairs) {
    indices.add(Math.floor(Math.random() * (CardImages.length - 1)));
  }

  // Duplicate the indices and shuffle them
  let pairs = Array.from(indices).flatMap((index) => [index + 1, index + 1]);

  // Shuffle the pairs
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  console.log("Pairs are : " + pairs);
  return pairs;
}

let pairs = imagePairs();

const Grid = ({}) => {
  const [opened, setOpened] = useState([]);
  const [paired, setPaired] = useState([]);

  //TODO: Add turns and matched states
  // const [turns, setTurns] = useState(0);
  // const [matched, setMatched] = useState(0);

  // FUNCTION TO HANDLE TILE PRESS
  const handleClick = async (tileIndex, pairNo) => {
    // As soon as a tile is clicked, increase the turns
    // setTurns((prevTurns) => prevTurns + 1);

    //CONDITION: Tile isn't opened
    // If no tile is opened other than paired ones, open the tile
    if (!opened.includes(tileIndex)) {
      // If no tile is opened
      if (opened.length === paired.length) {
        setOpened([tileIndex, ...paired]);
      }

      // If one tile is already opened
      else if (opened.length === paired.length + 1) {
        // If matches the opened tile, add to paired
        if (pairNo === pairs[opened[0]]) {
          setPaired([opened[0], tileIndex, ...paired]);
          setOpened([opened[0], tileIndex, ...paired]);
          console.log("Matched");
        }

        // Otherwise, close both the opened tiles after 2.5 sec delay
        else {
          const newOpened = [tileIndex, ...opened];
          setOpened(newOpened);
          console.log("Not Matched");
          await new Promise((resolve) => setTimeout(resolve, 800));
          setOpened((prevOpened) =>
            prevOpened.filter(
              (index) => index !== tileIndex && index !== newOpened[1]
            )
          );
        }
      }
    }
  };

  // FUNCTION TO HANDLE NEW GAME BUTTON PRESS
  const handleButtonPress = () => {
    // Set all images to hidden
    setOpened([]);
    setPaired([]);
    // setTurns(0);
    // setMatched(0);
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
                  const tileIndex = columns * i + j; // column=4 * i + j
                  const source = opened.includes(tileIndex)
                    ? CardImages[pairs[tileIndex]].image
                    : CardImages[0].image;

                  return (
                    <Pressable
                      onPress={() => handleClick(tileIndex, pairs[tileIndex])}
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

  // button: {
  //   backgroundColor: "#007BFF",
  //   padding: 10,
  //   marginTop: 40,
  //   borderRadius: 10,
  // },
});

export default GamePlot;

// #E8AFFF neon purple for bg of opened tiles
