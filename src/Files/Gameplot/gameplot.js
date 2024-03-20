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

// TODO: Add more images to game
// ARRAY DATA
const CardImages = [
  { image: require(`../../Images/Tiles/tile-back-cover.png`) },
  // { image: require(`../../Images/Tiles/1.png`) },
  // { image: require(`../../Images/Tiles/2.png`) },
  // { image: require(`../../Images/Tiles/3.png`) },
  // { image: require(`../../Images/Tiles/4.png`) },
  // { image: require(`../../Images/Tiles/5.png`) },
  // { image: require(`../../Images/Tiles/6.png`) },
  // { image: require(`../../Images/Tiles/7.png`) },
  // { image: require(`../../Images/Tiles/8.png`) },
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
  const [opened, setOpened] = useState([]);
  const [paired, setPaired] = useState([]);

  //TODO: Add turns and matched states
  const [turns, setTurns] = useState(0);
  const [matched, setMatched] = useState(0);

  //FUNCTION TO HANDLE TURNS
  const handleTurnNMatches = (matched) => {
    setTurns((prevTurns) => prevTurns + 1);
    if (matched) {
      setMatched((prevMatched) => prevMatched + 1);
    }
    console.log("Turns: " + turns);
  };

  // FUNCTION TO HANDLE TILE PRESS
  const handleClick = async (tileIndex, pairNo) => {
    //CONDITION: Tile isn't opened
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
          setPaired([opened[0], tileIndex, ...paired]);
          setOpened([opened[0], tileIndex, ...paired]);
          console.log("Matched");
          handleTurnNMatches(true);
        }

        // Otherwise, close both the opened tiles after 2.5 sec delay
        else {
          const newOpened = [tileIndex, ...opened];
          setOpened(newOpened);
          console.log("Not Matched");
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
        <View style={{ margin: 10 }}>
          <Button
            title="New Game"
            style={{
              marginTop: 100,
              borderRadius: 200,
              padding: 10,
              backgroundColor: "#007BFF",
            }}
            color={"green"}
            onPress={handleButtonPress}
          />
        </View>
      </View>
      <View style={styles.scoreBoard}>
        <Text style={styles.scoreBoardElem}>Turns: </Text>
        <Text style={[styles.scoreBoardElem, { fontSize: 50 }]}>{turns}</Text>
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
    // transform: [{ translateX: -50 }, { translateY: -50 }],
  },

  scoreBoard: {
    position: "absolute",
    alignItems: "center",
    bottom: 100,
    padding: 10,
    backgroundColor: "#333",
    flexDirection: "column",
    borderRadius: 5,
  },

  scoreBoardElem: {
    color: "#E8AFFF",
    fontSize: 15,
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
  ../../Images/Tiles/tile-back-cover.png
  
  ../../Images/Tiles/Chinese/b.png
  ../../Images/Tiles/Chinese/c.png
  ../../Images/Tiles/Chinese/f.png
  ../../Images/Tiles/Chinese/g.png
  ../../Images/Tiles/Chinese/h.png
  ../../Images/Tiles/Chinese/i.png
  ../../Images/Tiles/Chinese/j.png
  ../../Images/Tiles/Chinese/k.png
  ../../Images/Tiles/Chinese/m.png
  ../../Images/Tiles/Chinese/one.png
  ../../Images/Tiles/Chinese/p.png
  ../../Images/Tiles/Chinese/q.png
  ../../Images/Tiles/Chinese/r.png
  ../../Images/Tiles/Chinese/t.png
  ../../Images/Tiles/Chinese/u.png
  ../../Images/Tiles/Chinese/v.png
  ../../Images/Tiles/Chinese/w.png
  ../../Images/Tiles/Chinese/y.png
  ../../Images/Tiles/Chinese/z.png

  ../../Images/Tiles/Food/beer.png
  ../../Images/Tiles/Food/birthday.png
  ../../Images/Tiles/Food/biryani.png
  ../../Images/Tiles/Food/burrito.png
  ../../Images/Tiles/Food/cheers.png
  ../../Images/Tiles/Food/cheese.png
  ../../Images/Tiles/Food/fast-food.png
  ../../Images/Tiles/Food/food-truck.png
  ../../Images/Tiles/Food/fried-chicken.png
  ../../Images/Tiles/Food/fruit.png
  ../../Images/Tiles/Food/hamburger.png
  ../../Images/Tiles/Food/ice-cream.png
  ../../Images/Tiles/Food/noodle.png
  ../../Images/Tiles/Food/pizza.png
  ../../Images/Tiles/Food/smoothie.png
  ../../Images/Tiles/Food/sufganiyot.png
  ../../Images/Tiles/Food/taco.png



*/
