import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Text,
  Button,
} from "react-native";
<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
>>>>>>> d98e54fdbbf33aa5b1ede5dc9c605faf5edac52c

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

<<<<<<< HEAD
// FUNCTION TO GENERATE PAIRS OF IMAGE INDEX B/W 1 TO 8
function imagePairs() {
  //total num of images required
  const numPairs = 4;

  // Create an array of indices
  const indices = Array.from(
    { length: CardImages.length - 1 },
    (_, i) => i + 1
  );

  // Generate 4 random indices from 0 to the size of the new array - 1
  const randomIndices = [];
  while (randomIndices.length < numPairs) {
    const randIndex = Math.floor(Math.random() * indices.length);
    if (!randomIndices.includes(randIndex)) {
      randomIndices.push(randIndex);
    }
  }

  // Create pairs of indices
  const pairs = randomIndices.flatMap((index) => [index + 1, index + 1]);

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
  const [pressedImages, setPressedImages] = useState([]);

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
    // setPressedImages([...pressedImages, tileIndex]);
=======
const Grid = ({}) => {
  const [pressedImages, setPressedImages] = useState([]);

  const handleClick = (num) => {
    setPressedImages((prevState) => {
      if (prevState.includes(num)) {
        // If the image is already pressed, revert it back to the original
        return prevState.filter((index) => index !== num);
      } else {
        // If two images are already flipped, revert them back
        if (prevState.length === 2) {
          return [num];
        }
        // Otherwise, flip the image
        return [...prevState, num];
      }
    });
>>>>>>> d98e54fdbbf33aa5b1ede5dc9c605faf5edac52c
  };

  const handleButtonPress = () => {
    // Set all images to hidden
<<<<<<< HEAD
    setPressedImages([]);
    pairs = imagePairs();
=======
    const allIndices = Array.from(
      { length: CardImages.length },
      (_, i) => i + 1
    );
    setPressedImages([]);
>>>>>>> d98e54fdbbf33aa5b1ede5dc9c605faf5edac52c
  };

  return (
    <View>
<<<<<<< HEAD
      {/* {console.log("rendering")} */}
      <View style={styles.tileContainer}>
        {Array(2) // row=2
          .fill()
          .map((_, i) => (
            <View key={i} style={styles.eachLine}>
              {Array(4) // column=4
                .fill()
                .map((_, j) => {
                  let index = pairs[4 * i + j];
                  const source = pressedImages.includes(4 * i + j)
                    ? CardImages[index].image
                    : CardImages[0].image;

                  return (
                    <Pressable
                      onPress={() => handleClick(4 * i + j)}
                      key={4 * i + j}
                    >
                      <Image
                        source={source}
                        style={styles.tile}
                        keyValue={index}
                      />
                    </Pressable>
                  );
                })}
            </View>
          ))}
      </View>
=======
      {Array(2) // row=2
        .fill()
        .map((_, i) => (
          <View key={i} style={styles.eachLine}>
            {Array(4) // column=4
              .fill()
              .map((_, j) => {
                const index = 4 * i + j + 1;
                const source = pressedImages.includes(index)
                  ? CardImages[index].image
                  : CardImages[0].image;
                return (
                  <Pressable onPress={() => handleClick(index)}>
                    <Image
                      source={source}
                      style={styles.tile}
                      key={j}
                      keyValue={index}
                    />
                  </Pressable>
                );
              })}
          </View>
        ))}
>>>>>>> d98e54fdbbf33aa5b1ede5dc9c605faf5edac52c
      <Button
        title="New Game"
        onPress={handleButtonPress}
        style={styles.button}
      />
    </View>
  );
};

const GamePlot = () => {
<<<<<<< HEAD
  console.log("*************GamePlot.js*************");

=======
  console.log("GamePlot.js");
>>>>>>> d98e54fdbbf33aa5b1ede5dc9c605faf5edac52c
  return (
    <View style={styles.screen}>
      <Grid />
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

<<<<<<< HEAD
  tileContainer: {
    margin: 10,
  },

=======
>>>>>>> d98e54fdbbf33aa5b1ede5dc9c605faf5edac52c
  tile: {
    width: 65,
    height: 65,
    margin: 5,
  },

  eachLine: {
    flexDirection: "row",
  },

  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginTop: 40,
    borderRadius: 10,
  },
});

export default GamePlot;

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
