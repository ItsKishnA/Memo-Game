import {
  View,
  StyleSheet,
  Image,
  Pressable,
  ToastAndroid,
  Text,
} from "react-native";
import tile from "../../Images/Tiles/tile-back-cover.png";
import React, { useState } from "react";

const Rough = (props) => {
  let num = props.keyValue;

  const [state, setstate] = useState(0);
  const tileClick = () => {
    console.log("Pressed ");
    setstate(state + 1);
  };

  return (
    <View>
      <Pressable onPress={() => tileClick(num)}>
        <Image source={tile} style={styles.tile} />
        <Text>{state}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    margin: 5,
    // backgroundColor: "#fff",
  },
});

export default Rough;

/*
computing.png
direct-memory-access.png
grid.png
micro-sd-card.png
ram.png
usb-stick.png
*/
