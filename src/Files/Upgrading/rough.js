class ImagePairs {
  constructor(CardImages) {
    this.CardImages = CardImages.slice(1); // Exclude the first image
  }

  getPairs() {
    // Generate 4 random indices from 0 to the size of the new array - 1
    const indices = [];
    while (indices.length < 4) {
      const randIndex = Math.floor(Math.random() * this.CardImages.length);
      if (!indices.includes(randIndex)) {
        indices.push(randIndex);
      }
    }

    // Create pairs of indices
    const pairs = indices.flatMap((index) => [index, index]);

    // Shuffle the pairs
    for (let i = pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }
    console.log(pairs);
    return pairs;
  }
}

const Grid = ({}) => {
  const [pressedImages, setPressedImages] = useState([]);
  const [imagePairs, setImagePairs] = useState([]);
  const [imagePairGenerator, setImagePairGenerator] = useState(null);
  const [visibleImages, setVisibleImages] = useState(Array(8).fill(0));

  useEffect(() => {
    const generator = new ImagePairs(CardImages);
    setImagePairGenerator(generator);
    setImagePairs(generator.getPairs());
  }, []);

  const handleClick = (index) => {
    // Add the clicked image to the pressedImages array
    setPressedImages((prev) => [...prev, imagePairs[index]]);

    // Check if two images have been pressed
    if (pressedImages.length === 2) {
      // If the two images are a pair, keep them visible
      if (pressedImages[0] === pressedImages[1]) {
        setPressedImages([]);
      } else {
        // If the two images are not a pair, hide them after a delay
        setTimeout(() => {
          setPressedImages([]);
          const newVisibleImages = [...visibleImages];
          newVisibleImages[index] = 0;
          setVisibleImages(newVisibleImages);
        }, 1000);
      }
    } else {
      const newVisibleImages = [...visibleImages];
      newVisibleImages[index] = imagePairs[index] + 1;
      setVisibleImages(newVisibleImages);
    }
  };

  const handleButtonPress = () => {
    setPressedImages([]);
    setImagePairs(imagePairGenerator.getPairs());
  };

  return (
    <View>
      {Array(2)
        .fill()
        .map((_, i) => (
          <View key={i} style={styles.eachLine}>
            {Array(4)
              .fill()
              .map((_, j) => {
                const index = 4 * i + j;
                const imagePairIndex = imagePairs[index];
                const cardImage = CardImages[imagePairIndex + 1];
                if (imagePairIndex !== undefined && cardImage !== undefined) {
                  return (
                    <Pressable onPress={() => handleClick(index)} key={index}>
                      <Image
                        source={CardImages[visibleImages[index]].image}
                        style={styles.tile}
                      />
                    </Pressable>
                  );
                } else {
                  return null;
                }
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
