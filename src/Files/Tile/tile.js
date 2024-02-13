import { View, StyleSheet, Image, Pressable, ToastAndroid } from "react-native";
import tile from "../../Images/Tiles/tile-back-cover.png";

const cardImages = [
  { src: "../../Images/Tiles/tile-back-cover.png" },
  { src: "../../Images/Tiles/computing.png" },
  { src: "../../Images/Tiles/direct-memory-access.png" },
  { src: "../../Images/Tiles/grid.png" },
  { src: "../../Images/Tiles/micro-sd-card.png" },
  { src: "../../Images/Tiles/ram.png" },
  { src: "../../Images/Tiles/usb-stick.png" },
];

const tileClick = (num) => {
  ToastAndroid.showWithGravity(
    num.toString(),
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
  // document.getElementById("tile"). = styles.tilePressed;
  console.log("Pressed " + num);
  // let sourceImg = cardImages[num].src;
  // console.log(sourceImg);
  // document.getElementById("tile").source = { sourceImg };
  Image.style = styles.tilePressed;
};

const Tile = (props) => {
  let num = props.keyValue;
  return (
    <View>
      <Pressable onPress={() => tileClick(num)}>
        <Image source={tile} style={styles.tile} />
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
  tilePressed: {
    width: 65,
    height: 55,
    margin: 5,
    // backgroundColor: "#f00",
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
