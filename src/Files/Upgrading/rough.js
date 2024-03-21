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
                        style={styles.tile}
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
        onPress={handleButtonPress}
        style={styles.button}
      />
    </View>
  );
};

const GamePlot = () => (
  <View style={styles.screen}>
    <Grid />
  </View>
);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#836FFF",
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

/*
  ../../Images/Tiles/tile-back-cover.png

  ../../Images/Tiles/1.png
  ../../Images/Tiles/2.png
  ../../Images/Tiles/3.png
  ../../Images/Tiles/4.png
  ../../Images/Tiles/5.png
  ../../Images/Tiles/6.png
  ../../Images/Tiles/7.png
  ../../Images/Tiles/8.png
  
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
