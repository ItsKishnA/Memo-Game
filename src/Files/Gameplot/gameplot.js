import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Text,
} from "react-native";
import Tile from "../Tile/tile.js";
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

const RenderedGamePlot = ({ row, column }) => {
  const [choiceOne, setChoiceOne] = useState(false);
  const [flipped, setFlipped] = useState(0);

  // FUNCTION
  const handleClick = (num) => {
    choiceOne ? setFlipped(0) : setFlipped(num);
    setChoiceOne(!choiceOne);
    console.log("Pressed " + num);
  };

  // FUNCTION
  const tile = () => {
    return (
      <View>
        <Image source={CardImages[0].image} style={styles.tile} />
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {Array(row)
        .fill()
        .map((_, i) => (
          <View key={i} style={styles.eachLine}>
            {Array(column)
              .fill()
              .map((_, j) => (
                <Pressable
                  key={j}
                  onPress={() => handleClick(column * i + j + 1)}
                >
                  {tile(j, (keyValue = column * i + j + 1))}
                  {/* <Tile key={j} keyValue={column * i + j + 1} /> */}
                </Pressable>
              ))}
          </View>
        ))}
    </View>
  );
};

const GamePlot = () => {
  let row = 2;
  let column = 4;

  // {/*below */
  // // Function to shuffle an array using Fisher-Yates algorithm
  // function shuffle(array) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }

  // // let originalArray = [1, 2, 3, 4, 5];

  // // Create a new array by excluding the first element and then concatenating it with itself
  // let newArray = CardImages.slice(1).map((obj) => ({ ...obj }));

  // // Shuffle the elements of the new array
  // // newArray = shuffle(newArray);

  // // Map over the shuffled array to assign unique IDs to each element
  // // newArray = newArray.map((element, index) => ({ id: index, value: element }));

  // console.log(newArray);

  // /*above */}
  console.log("GamePlot.js");
  return (
    <View style={styles.screen}>
      <RenderedGamePlot row={row} column={column} />
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
