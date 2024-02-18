import { View, StyleSheet, Image, Pressable, ToastAndroid } from "react-native";
import tile from "../../Images/Tiles/tile-back-cover.png";

const cardImages = [
  "../../Images/Tiles/tile-back-cover.png",
  "../../Images/Tiles/computing.png",
  "../../Images/Tiles/direct-memory-access.png",
  "../../Images/Tiles/grid.png",
  "../../Images/Tiles/micro-sd-card.png",
  "../../Images/Tiles/ram.png",
  "../../Images/Tiles/usb-stick.png",
  "../../Images/Tiles/computing.png",
  "../../Images/Tiles/direct-memory-access.png",
];

const tileClick = (num) => {
  ToastAndroid.showWithGravity(
    num.toString(),
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
  console.log("Pressed " + num);
};

const Tile = (props) => {
  let num = props.keyValue;
  return (
    <View>
      <Pressable onPress={() => tileClick(num)}>
        <Image source={tile} style={styles.tile} />
        <Image source={cardImages[num]} style={styles.tile} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  tile: {
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: "#fff",
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
