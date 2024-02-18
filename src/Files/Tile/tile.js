import { View, StyleSheet, Image, Pressable, ToastAndroid } from "react-native";
import React, { useState } from "react";

// ARRAY DATA
const CardImages = [
  { image: require(`../../Images/Tiles/tile-back-cover.png`) },
  { image: require(`../../Images/Tiles/computing.png`) },
  { image: require(`../../Images/Tiles/direct-memory-access.png`) },
  { image: require(`../../Images/Tiles/grid.png`) },
  { image: require(`../../Images/Tiles/micro-sd-card.png`) },
  { image: require(`../../Images/Tiles/ram.png`) },
  { image: require(`../../Images/Tiles/usb-stick.png`) },
  { image: require(`../../Images/Tiles/computing.png`) },
  { image: require(`../../Images/Tiles/direct-memory-access.png`) },
];

const Tile = (props) => {
  const num = props.keyValue;
  const [shown, setShown] = useState(0);
  const [choiceOne, setChoiceOne] = useState(false);
  const [choiceTwo, setChoiceTwo] = useState(false);

  // FUNCTION
  const tileClick = (num) => {
    ToastAndroid.showWithGravity(
      num.toString(),
      ToastAndroid.SHORT,
      ToastAndroid.TOP
    );
    console.log("Pressed " + num);

    // FUNCTION for choice 1
    choiceOne ? setShown(0) : setShown(num);
    setChoiceOne(!choiceOne);

    // FUNCTION for choice 2
    // choiceTwo ? setShown(0) : setShown(num);
    // console.log(CardImages[num].image);
  };

  // RETURN
  return (
    <View>
      <Pressable onPress={() => tileClick(num)}>
        <Image source={CardImages[shown].image} style={styles.tile} />
        {/* <Image source={CardImages[num].image} style={styles.tile} /> */}
      </Pressable>
    </View>
  );
};

// FUNCTION
const styles = StyleSheet.create({
  tile: {
    width: 65,
    height: 65,
    margin: 5,
    // backgroundColor: "#fff",
  },
});

export default Tile;

/*
computing.png
direct-memory-access.png
grid.png
micro-sd-card.png
ram.png
usb-stick.png
*/