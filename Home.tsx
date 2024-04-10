import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Image } from "expo-image";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Home = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const [BMI, setBMI] = useState(0.0);

  const isDisabled = height.length === 0 || weight.length === 0;

  const blocks = [
    {
      style: styles.YellowBlock,
      imgStyle: styles.YellowImage,
      image: require("./assets/yellow.png"),
      value: "Under 18",
      note: "Under Weight",
      condition: BMI <= 18.5 && BMI >= 1,
    },
    {
      style: styles.GreenBlock,
      imgStyle: styles.GreenImage,

      image: require("./assets/green.png"),
      value: "18-25",
      note: "Healthy Weight",
      condition: BMI > 18.5 && BMI < 25,
    },
    {
      style: styles.RedBlock,
      imgStyle: styles.GreenImage,

      image: require("./assets/red.png"),
      value: "Over 25",
      note: "Overweight",
      condition: BMI >= 25,
    },
  ];

  const handlerCalcBMI = () => {
    const currentWeight = parseInt(weight);
    const currentHeight = parseInt(height);

    const heightMetrs = currentHeight / 100;
    setBMI(Number((currentWeight / (heightMetrs * heightMetrs)).toFixed(1)));
    storeData();
  };

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("height", height);
      await AsyncStorage.setItem("weight", weight);

      const jsonBMI = JSON.stringify(BMI);
      await AsyncStorage.setItem("BMI", jsonBMI);
    } catch (e) {
      throw new Error("Error saving data");
    }
  };

  const getData = async () => {
    try {
      const height = await AsyncStorage.getItem("height");
      const weight = await AsyncStorage.getItem("weight");
      const jsonBMI = await AsyncStorage.getItem("BMI");

      if (height && weight && jsonBMI) {
        setHeight(height);
        setWeight(weight);
        setBMI(Number(JSON.parse(jsonBMI)) || 0);
      }
    } catch (e) {
      throw new Error("error getting data");
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  const filterDigits = (input: string): string => {
    return input.replace(/\D/g, "");
  };

  return (
    <ScrollView
      style={{ minHeight: "100%", backgroundColor: "rgba(50,50,50,1)" }}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>BMI Calculator</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={height}
            onChangeText={(value) => {
              setHeight(filterDigits(value));
            }}
            style={styles.input}
            placeholder="Heigth-M"
            placeholderTextColor={"rgba(90,90,190,1)"}
            keyboardType="number-pad"
          />
          <TextInput
            value={weight}
            onChangeText={(value) => {
              setWeight(filterDigits(value));
            }}
            style={styles.input}
            placeholder="Weigth-KG"
            placeholderTextColor={"rgba(90,90,190,1)"}
            keyboardType="number-pad"
          />
        </View>

        <TouchableOpacity
          disabled={isDisabled}
          style={[styles.goButton, isDisabled && { opacity: 0.5 }]}
          onPress={() => {
            handlerCalcBMI();
          }}
        >
          <Text style={styles.goButtonText}>Go</Text>
        </TouchableOpacity>

        <Text style={styles.BMIText}>{BMI}</Text>

        <View style={styles.line} />

        <View style={styles.ColorContainer}>
          {blocks.map((block, index) => (
            <View
              key={index}
              style={[block.style, block.condition && { opacity: 1 }]}
            >
              <Image
                style={block.imgStyle}
                source={block.image}
                contentFit="fill"
              />
              <Text style={styles.valueText}>{block.value}</Text>
              <Text style={styles.noteText}>{block.note}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "rgba(180, 168, 45, 1)",
    fontSize: 25,
    marginTop: 40,
  },

  inputContainer: { flexDirection: "row", gap: 50, marginTop: 50 },

  input: {
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    width: 130,
    padding: 10,
    color: "white",
  },

  goButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 7,

    borderRadius: 10,

    marginTop: 30,
  },

  goButtonText: {
    fontWeight: "500",
    fontSize: 16,
  },

  BMIText: {
    color: "rgba(180, 168, 45, 1)",
    fontSize: 35,
    marginTop: 40,
  },

  line: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    height: 2,

    marginTop: 100,
  },

  ColorContainer: {
    flexDirection: "row",
    gap: 15,

    marginTop: 20,

    paddingHorizontal: 15,
  },

  YellowBlock: {
    backgroundColor: "yellow",
    borderRadius: 15,
    height: 300,
    width: 110,

    alignItems: "center",

    opacity: 0.3,
  },
  GreenBlock: {
    backgroundColor: "green",
    borderRadius: 15,
    height: 300,
    width: 110,

    alignItems: "center",

    opacity: 0.3,
  },
  RedBlock: {
    backgroundColor: "red",
    borderRadius: 15,
    height: 300,
    width: 110,

    alignItems: "center",

    opacity: 0.3,
  },
  YellowImage: {
    width: 120,
    height: 70,
    marginTop: 40,
  },
  GreenImage: {
    width: 120,
    height: 90,
    marginTop: 20,
  },
  RedImage: {
    width: 120,
    height: 90,
    marginTop: 20,
  },
  valueText: { fontSize: 15, fontWeight: "600", marginTop: 30 },
  noteText: { fontSize: 15, fontWeight: "600", marginTop: 30 },
});

export default Home;
