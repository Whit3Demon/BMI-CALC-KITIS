import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

import { Image } from "expo-image";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>BMI Calculator</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Heigth-M"
          placeholderTextColor={"rgba(90,90,190,1)"}
          keyboardType="number-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Weigth-KG"
          placeholderTextColor={"rgba(90,90,190,1)"}
          keyboardType="number-pad"
        />
      </View>

      <TouchableOpacity
        style={styles.goButton}
        onPress={() => {
          console.log("GO");
        }}
      >
        <Text style={styles.goButtonText}>Go</Text>
      </TouchableOpacity>

      <Text style={styles.BMIText}>0.00</Text>

      <View style={styles.line} />

      <View style={styles.ColorContainer}>
        <View style={styles.YellowBlock}>
          <Image
            style={styles.YellowImage}
            source={require("./assets/yellow.png")}
            contentFit="fill"
          />
          <Text style={styles.valueText}>Under 18</Text>
          <Text style={styles.noteText}>Under Weight</Text>
        </View>

        <View style={styles.GreenBlock}>
          <Image
            style={styles.GreenImage}
            source={require("./assets/green.png")}
            contentFit="fill"
          />
          <Text style={styles.valueText}>Under 18</Text>
          <Text style={styles.noteText}>Under Weight</Text>
        </View>

        <View style={styles.RedBlock}>
          <Image
            style={styles.RedImage}
            source={require("./assets/red.png")}
            contentFit="fill"
          />
          <Text style={styles.valueText}>Under 18</Text>
          <Text style={styles.noteText}>Under Weight</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(50,50,50,1)",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "rgba(180, 168, 45, 1)",
    fontSize: 25,
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
  },
  GreenBlock: {
    backgroundColor: "green",
    borderRadius: 15,
    height: 300,
    width: 110,

    alignItems: "center",
  },
  RedBlock: {
    backgroundColor: "red",
    borderRadius: 15,
    height: 300,
    width: 110,

    alignItems: "center",
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
