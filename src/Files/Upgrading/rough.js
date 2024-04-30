import { View, StyleSheet, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import DynamicallySelectedPicker from "react-native-dynamically-selected-picker";

const Upgrading = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const initialSelectedIndex = 1;
  const height = 300;

  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={styles.container}>
      <DynamicallySelectedPicker
        items={[
          {
            value: 1,
            label: "Item 1",
          },
          {
            value: 2,
            label: "Item 2",
          },
          {
            value: 3,
            label: "Item 3",
          },
          {
            value: 4,
            label: "Item 4",
            itemColor: "blue",
          },
          {
            value: 5,
            label: "Item 5",
          },
        ]}
        onScroll={({ index }) => setSelectedItemIndex(index)}
        onMomentumScrollBegin={({ index }) => setSelectedItemIndex(index)}
        onMomentumScrollEnd={({ index }) => setSelectedItemIndex(index)}
        onScrollBeginDrag={({ index }) => setSelectedItemIndex(index)}
        onScrollEndDrag={({ index }) => setSelectedItemIndex(index)}
        initialSelectedIndex={initialSelectedIndex}
        // height={height}
        // width={}
      />
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        style={{ height: 50, width: 150 }}
        testID="picker"
        enabled={true}
        mode="dropdown"
        dropdownIconColor={"#000"}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    // paddingVertical: 20,
  },
});

export default Upgrading;
