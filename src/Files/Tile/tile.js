import { View, StyleSheet, Image, Pressable, ToastAndroid } from "react-native";
import tile from "../../Images/Tiles/tile-back-cover.png";

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

const tileClick = (num) => {
  ToastAndroid.showWithGravity(
    num.toString(),
    ToastAndroid.SHORT,
    ToastAndroid.TOP
  );
  console.log("Pressed " + num);
  // console.log(CardImages[num].image);
};

const Tile = (props) => {
  const num = props.keyValue;
  return (
    <View>
      <Pressable onPress={() => tileClick(num)}>
        <Image source={tile} style={styles.tile} />
        {/* <Image source={CardImages[num].image} style={styles.tile} /> */}
      </Pressable>
    </View>
  );
};

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
