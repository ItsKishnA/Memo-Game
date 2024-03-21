import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Text,
  Button,
  TouchableOpacity,
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

const GamePlot = ({}) => {
  // STATE TO KEEP TRACK OF OPENED AND PAIRED TILES
  const [opened, setOpened] = useState([]);
  const [paired, setPaired] = useState([]);

  // STATE TO KEEP TRACK OF TURNS AND MATCHES
  const [turns, setTurns] = useState(0);
  const [matched, setMatched] = useState(0);

  //FUNCTION TO HANDLE TURNS AND MATCHES
  const handleTurnNMatches = (isMatched) => {
    setTurns((prevTurns) => prevTurns + 1);
    if (isMatched) {
      setMatched((prevMatched) => prevMatched + 1);
    }
    if (matched === 3 && turns % 2 !== 0) {
      ToastAndroid.show("You Won!", ToastAndroid.SHORT);
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleButtonPress();
      })();
    }
  };

  // FUNCTION TO HANDLE TILE PRESS
  const handleClick = async (tileIndex, pairNo) => {
    // If no tile is opened other than paired ones, open the tile
    if (!opened.includes(tileIndex)) {
      // If no tile is opened
      if (opened.length === paired.length) {
        setOpened([tileIndex, ...paired]);
        handleTurnNMatches(false);
      }

      // If one tile is already opened
      else if (opened.length === paired.length + 1) {
        // If matches the opened tile, add to paired
        if (pairNo === pairs[opened[0]]) {
          setPaired([tileIndex, opened[0], ...paired]);
          setOpened([tileIndex, opened[0], ...paired]);
          handleTurnNMatches(true);
        }

        // Otherwise, close both the opened tiles after 2.5 sec delay
        else {
          const newOpened = [tileIndex, ...opened];
          setOpened(newOpened);
          handleTurnNMatches(false);
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
    //reset turns and matches
    setTurns(0);
    setMatched(0);
    // Generate new pairs
    pairs = imagePairs();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.gridContainer}>
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
                      <TouchableOpacity
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
                      </TouchableOpacity>
                    );
                  })}
              </View>
            ))}
        </View>
      </View>

      {/* //New Game Button */}
      <TouchableOpacity
        style={[styles.newGameButtonContainer, styles.newGameButton]}
        onPress={handleButtonPress}
      >
        <Text style={{ color: "white" }}>New Game</Text>
      </TouchableOpacity>

      {/* //Score Board */}
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreBoardElem}>Turns: </Text>
        <Text
          style={[
            styles.scoreBoardElem,
            { fontSize: 60, fontWeight: 800, marginTop: -5 },
          ]}
        >
          {turns}
        </Text>
      </View>
    </View>
  );
};

// STYLESHEET
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },

  gridContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(200, 200, 200, 0.15)",
    borderRadius: 5,
    padding: 10,
  },

  scoreBoard: {
    position: "absolute",
    alignItems: "center",
    bottom: 125,
    padding: 10,
    backgroundColor: "rgba(100, 100, 100, 0.4)",
    flexDirection: "column",
    borderRadius: 5,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: "rgba(232, 175, 255, 0.3)",
  },

  scoreBoardElem: {
    color: "#E8AFFF",
    fontSize: 15,
    marginTop: 5,
  },

  newGameButtonContainer: {
    position: "absolute",
    bottom: 35,
    right: 10,
  },

  newGameButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
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
