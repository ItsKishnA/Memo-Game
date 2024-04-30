import {
  View,
  StyleSheet,
  Image,
  ToastAndroid,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
// import { useFonts } from "expo-font";

const rows = 3,
  columns = 4;

// TODO: Add more images to game

// ARRAY DATA
// { image: require(`../../Images/Tiles/1.png`) },
// { image: require(`../../Images/Tiles/2.png`) },
// { image: require(`../../Images/Tiles/3.png`) },
// { image: require(`../../Images/Tiles/4.png`) },
// { image: require(`../../Images/Tiles/5.png`) },
// { image: require(`../../Images/Tiles/6.png`) },
// { image: require(`../../Images/Tiles/7.png`) },
// { image: require(`../../Images/Tiles/8.png`) },

const CardImages = [
  { image: require(`../../Images/Tiles/tile-back-cover.png`) },

  { image: require(`../../Images/Tiles/Chinese/b.png`) },
  { image: require(`../../Images/Tiles/Chinese/c.png`) },
  { image: require(`../../Images/Tiles/Chinese/f.png`) },
  { image: require(`../../Images/Tiles/Chinese/g.png`) },

  { image: require(`../../Images/Tiles/Chinese/h.png`) },
  { image: require(`../../Images/Tiles/Chinese/i.png`) },
  { image: require(`../../Images/Tiles/Chinese/j.png`) },
  { image: require(`../../Images/Tiles/Chinese/k.png`) },

  { image: require(`../../Images/Tiles/Chinese/m.png`) },
  { image: require(`../../Images/Tiles/Chinese/one.png`) },
  { image: require(`../../Images/Tiles/Chinese/p.png`) },
  { image: require(`../../Images/Tiles/Chinese/q.png`) },

  { image: require(`../../Images/Tiles/Chinese/r.png`) },
  { image: require(`../../Images/Tiles/Chinese/t.png`) },
  { image: require(`../../Images/Tiles/Chinese/u.png`) },
  { image: require(`../../Images/Tiles/Chinese/v.png`) },

  { image: require(`../../Images/Tiles/Chinese/w.png`) },
  { image: require(`../../Images/Tiles/Chinese/y.png`) },
  { image: require(`../../Images/Tiles/Chinese/z.png`) },
];

// FUNCTION TO GENERATE PAIRS OF IMAGE INDEX B/W 1 TO 8
const generateImagePairs = () => {
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
};

// FUNCTION TO LOAD SOUND
const loadSound = async () => {
  const { sound } = await Audio.Sound.createAsync(
    require("../../Sounds/tile flip.wav")
  );
  return sound;
};

// GENERATE PAIRS
let pairs = generateImagePairs();

const MemoGame = (props) => {
  // STATE TO KEEP TRACK OF SOUND OBJECT
  const [soundObject, setSoundObject] = useState();
  // STATE TO KEEP TRACK OF OPENED AND PAIRED TILES
  const [opened, setOpened] = useState([]);
  const [paired, setPaired] = useState([]);
  // STATE TO KEEP TRACK OF TURNS AND MATCHES
  const [turns, setTurns] = useState(0);
  const [matched, setMatched] = useState(0);

  useEffect(() => {
    // Load sound
    loadSound().then(setSoundObject);
  }, []);

  //FUNCTION TO HANDLE TURNS AND MATCHES
  const handleTurnNMatches = (isMatched) => {
    setTurns((prevTurns) => prevTurns + 1);

    if (isMatched) {
      setMatched((prevMatched) => prevMatched + 1);
    }

    if (matched === (rows * columns) / 2 - 1 && turns % 2 !== 0) {
      ToastAndroid.show("You Won!", ToastAndroid.SHORT);
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleNewGame();
      })();
    }
  };

  // FUNCTION TO HANDLE TILE PRESS
  const handleTileClick = async (tileIndex, pairNo) => {
    // If no tile is opened other than paired ones, open the tile
    if (!opened.includes(tileIndex)) {
      // If no tile is opened
      if (opened.length === paired.length) {
        setOpened([tileIndex, ...paired]);
        handleTurnNMatches(false);
        // Play sound
        if (props.playSound)
          soundObject.replayAsync().catch((error) => console.log(error));
      }

      // If one tile is already opened
      else if (opened.length === paired.length + 1) {
        // If matches the opened tile, add to paired
        if (pairNo === pairs[opened[0]]) {
          setPaired([tileIndex, opened[0], ...paired]);
          setOpened([tileIndex, opened[0], ...paired]);
          handleTurnNMatches(true);
          // play sound with single line code
          if (props.playSound)
            soundObject.replayAsync().catch((error) => console.log(error));
        }

        // Otherwise, close both the opened tiles after 2.5 sec delay
        else {
          const newOpened = [tileIndex, ...opened];
          setOpened(newOpened);
          handleTurnNMatches(false);
          // Play sound
          if (props.playSound)
            soundObject.replayAsync().catch((error) => console.log(error));
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
  const handleNewGame = () => {
    // Set all images to hidden
    setOpened([]);
    setPaired([]);
    //reset turns and matches
    setTurns(0);
    setMatched(0);
    // Generate new pairs
    pairs = generateImagePairs();
  };

  return (
    <View style={styles.Container}>
      {/* Title */}
      <Text style={styles.gameHeader}>Memo-Game</Text>

      {/* MemoGame */}
      <View style={styles.tileContainer}>
        {Array(rows) // row=2
          .fill()
          .map((_, i) => (
            <View key={i} style={styles.eachLineOfTileContainer}>
              {Array(columns) // column=4
                .fill()
                .map((_, j) => {
                  const tileIndex = columns * i + j; // column=4 * i + j
                  const source = opened.includes(tileIndex)
                    ? CardImages[pairs[tileIndex]].image
                    : CardImages[0].image;

                  return (
                    <TouchableOpacity
                      onPress={() =>
                        handleTileClick(tileIndex, pairs[tileIndex])
                      }
                      key={tileIndex}
                    >
                      <Image
                        source={source}
                        style={[
                          styles.tile,
                          source === CardImages[0].image &&
                            styles.tileClosedStyle,
                        ]}
                        keyValue={pairs[tileIndex]}
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
          ))}
      </View>

      {/* //New Game Button */}
      <TouchableOpacity
        style={styles.newGameButtonContainer}
        onPress={handleNewGame}
      >
        <Text
          style={{
            color: "white",
            fontSize: 14,
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          New Game
        </Text>
      </TouchableOpacity>

      {/* //Score Board */}
      <View style={styles.scoreBoardPosition}>
        <View style={[styles.scoreBoardElem]}>
          <Text style={styles.innerScore}>Turns: </Text>
          <Text
            style={[
              styles.innerScore,
              { fontSize: 55, fontWeight: 800, marginTop: -10 },
            ]}
          >
            {turns}
          </Text>
        </View>
        <View style={[styles.scoreBoardElem]}>
          <Text style={styles.innerScore}>Matches: </Text>
          <Text
            style={[
              styles.innerScore,
              {
                fontSize: 55,
                fontWeight: 800,
                marginTop: -10,
              },
            ]}
          >
            {matched}
          </Text>
        </View>
      </View>
    </View>
  );
};

// STYLESHEET
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    // backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1,
    flexDirection: "column",
  },

  tileContainer: {
    position: "absolute",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(100, 100, 100, 0.15)",
    // backgroundColor: "rgba(5, 238, 255, 0.15)",
    borderColor: "rgba(255, 255, 255, 0.09)",
    borderWidth: 1,
    // opacity:
    borderRadius: 10,
    padding: 20,
    // margin: 10,
  },

  gameHeader: {
    position: "absolute",
    top: 20,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: 0.8,
    color: "white",
    textAlign: "center",
  },

  scoreBoardPosition: {
    position: "absolute",
    right: 18,
    bottom: 5,
    padding: 10,
    flexDirection: "row",
  },

  scoreBoardElem: {
    borderColor: "rgba(232, 175, 255, 0.3)",
    borderRadius: 10,
    borderWidth: 1,
    margin: 5,
    backgroundColor: "rgba(100, 100, 100, 0.25)",
    padding: 5,
  },

  innerScore: {
    textAlign: "center",
    color: "#fcadd8",
  },

  newGameButtonContainer: {
    //styling
    position: "absolute",
    height: 50,
    padding: 10,
    paddingHorizontal: 30,

    //border
    borderRadius: 25,
    borderColor: "#05eeff",
    borderWidth: 2,

    //positiion
    bottom: 15,
    left: 25,
    justifyContent: "center",
    alignItems: "center",
  },

  tile: {
    width: 60,
    height: 60,
    margin: 8,
  },

  eachLineOfTileContainer: {
    flexDirection: "row",
  },

  tileClosedStyle: {
    tintColor: "rgba(211, 227, 253, 0.9)",
    // tintColor: "white",
    tintColor: "#EEEEEE",
    opacity: 1,
  },
});

export default MemoGame;

// #E8AFFF neon purple for bg of opened tiles
