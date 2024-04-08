import React, { useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
  Animated,
} from "react-native";
import { useState, useCallback } from "react";

const SimonSays = () => {
  const [score, setScore] = useState(0);
  const [gameSequence, setGameSequence] = useState([]);
  const [num, setNum] = useState(0);

  // Petal Attributes
  const WHITE = 125;
  const GREEN = 100;
  const RED = 100;
  const BLUE = 170;
  const INNER_CIRCULAR_BUTTON_SMALLER_BY = 35;
  const BUTTON_COLOR = "black";

  // FUNCTION to choose and add a random number to the game sequence
  const addRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    setGameSequence((prev) => [...prev, randomNumber]);
    setNum(randomNumber);
    console.log([randomNumber]);
    startAnimation();
  };

  const handleClick = (id) => {
    if (id === num) {
      setScore((prev) => prev + 1);

      addRandomNumber();
    } else {
      ToastAndroid.show("You lost with score: " + score, ToastAndroid.SHORT);
      (async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      })();
      handleNewGame();
    }
  };

  const handleNewGame = () => {
    console.log("New Game");
    setGameSequence([]);
    setScore(0);
    setNum(null);
    addRandomNumber();
  };

  useEffect(() => {
    handleNewGame();
  }, []);
  const opacityValue = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  };

  // /* UI-Components
  const CircularButton = ({ id, color, height, width, borderRadius }) => (
    <TouchableOpacity
      style={{
        backgroundColor: color,
        width,
        height,
        borderRadius,
        margin: 5,

        alignItems: "center",
        justifyContent: "center",
      }}
      onPress={() => handleClick(id)}
    ></TouchableOpacity>
  );

  const Block = ({
    id,
    alignItems,
    justifyContent,
    circleStyle,
    height,
    width,
    borderRadius,
  }) => (
    <View style={[styles.block, { alignItems, justifyContent }]}>
      <View
        style={[
          styles.circle,
          {
            height,
            width,
            borderRadius,
          },
          circleStyle,
        ]}
      >
        {/* <Animated.View
          style={{
            backgroundColor: "white",
            height: WHITE - INNER_CIRCULAR_BUTTON_SMALLER_BY,
            width: WHITE - INNER_CIRCULAR_BUTTON_SMALLER_BY,
            borderRadius: (WHITE - INNER_CIRCULAR_BUTTON_SMALLER_BY) / 2,
            opacity: opacityValue,
            // zIndex: -,
          }}
        > */}
        <CircularButton
          id={id}
          color={BUTTON_COLOR}
          height={height - INNER_CIRCULAR_BUTTON_SMALLER_BY}
          width={width - INNER_CIRCULAR_BUTTON_SMALLER_BY}
          borderRadius={(height - INNER_CIRCULAR_BUTTON_SMALLER_BY) / 2}
        />
        {/* </Animated.View> */}
      </View>
    </View>
  );
  // UI-Components */

  return (
    <View style={styles.container}>
      <View style={styles.scoreBoard}>
        <Text style={{ color: "white", fontSize: 15 }}>Score:</Text>
        <Text
          style={[
            styles.scoreBoardElem,
            { fontSize: 60, fontWeight: 800, marginTop: -10 },
          ]}
        >
          {score}
        </Text>
      </View>

      <View style={styles.simonGame}>
        <View style={styles.row}>
          <Block
            id={1}
            alignItems="flex-end"
            justifyContent="flex-end"
            height={WHITE}
            width={WHITE}
            borderRadius={WHITE / 2}
            circleStyle={styles.whiteCircle}
          />

          <Block
            id={2}
            alignItems="flex-start"
            justifyContent="flex-end"
            height={GREEN}
            width={GREEN}
            borderRadius={GREEN / 2}
            circleStyle={styles.greenCircle}
            // buttonColor=""
          />
        </View>
        <View style={styles.row}>
          <Block
            id={3}
            alignItems="flex-end"
            justifyContent="flex-start"
            height={RED}
            width={RED}
            borderRadius={RED / 2}
            circleStyle={styles.redCircle}
          />
          <Block
            id={4}
            alignItems="flex-start"
            justifyContent="flex-start"
            height={BLUE}
            width={BLUE}
            borderRadius={BLUE / 2}
            circleStyle={styles.blueCircle}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          marginTop: 20,
          backgroundColor: "red",
          height: 50,
          width: 100,
          zIndex: 1,
          borderRadius: 15,
          alignItems: "center",
          justifyContent: "center",
          bottom: 50,
          zIndex: 1,
          // right: 10,
          alignSelf: "center",
        }}
        // show text on touchable opacity
        onPress={() => handleNewGame()}
      >
        <Text style={{ color: "white", padding: 10 }}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 20,
    flexDirection: "column",
    zIndex: -1,
  },

  simonGame: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    //shifting the view a little bit left
    left: -10,
  },

  circle: {
    borderRadius: 50,
    backgroundColor: "#e9103b",
    margin: 5,
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  row: {
    flexDirection: "row",
    alignSelf: "stretch",
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },

  block: {
    // backgroundColor: "gray",
    aspectRatio: 1,
    flex: 1,
    margin: 3,
    padding: 3,
  },

  whiteCircle: {
    backgroundColor: "#FAF9F6",
    borderBottomRightRadius: 10,
  },

  greenCircle: {
    backgroundColor: "#98FB98",
    borderBottomLeftRadius: 10,
  },

  redCircle: {
    backgroundColor: "#E0115F",
    borderTopRightRadius: 10,
  },

  blueCircle: {
    backgroundColor: "#0096FF",
    borderTopLeftRadius: 10,
  },

  scoreBoard: {
    position: "absolute",
    alignItems: "center",
    top: 75,
    right: 40,
    padding: 10,

    backgroundColor: "rgba(100, 100, 100, 0.15)",
    flexDirection: "column",
    borderRadius: 10,
    borderColor: "rgba(232, 175, 255, 0.15)",
    borderWidth: 1,
  },

  scoreBoardElem: {
    color: "#fcadd8",
    fontSize: 15,
    marginTop: 5,
  },

  instruction: {
    position: "absolute",
    top: 75,
    right: 125,
    left: 80,
    backgroundColor: "rgba(100, 100, 100, 0.15)",
    padding: 10,
    borderRadius: 10,
    zIndex: -1,
  },
  // inner: {
  //   backgroundColor: "#DEE9F7",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderColor: "#E2ECFD",
  //   borderWidth: 1,
  // },
  // topShadow: {
  //   shadowOffset: {
  //     width: -6,
  //     height: -6,
  //   },
  //   shadowOpacity: 1,
  //   shadowRadius: 6,
  //   shadowColor: "#FBFFFF",
  // },
  // bottomShadow: {
  //   shadowOffset: {
  //     width: 6,
  //     height: 6,
  //   },
  //   shadowOpacity: 1,
  //   shadowRadius: 6,
  //   shadowColor: "#B7C4DD",
  // },
});

export default SimonSays;
