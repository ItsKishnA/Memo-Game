import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Text,
  Button,
} from "react-native";
import { useState } from "react";

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
  };

  const handleButtonPress = () => {
    // Set all images to hidden
    const allIndices = Array.from(
      { length: CardImages.length },
      (_, i) => i + 1
    );
    setPressedImages([]);
  };

  return (
    <View>
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
      <Button
        title="New Game"
        onPress={handleButtonPress}
        style={styles.button}
      />
    </View>
  );
};

const GamePlot = () => {
  console.log("GamePlot.js");
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
