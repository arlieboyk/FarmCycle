import { View, Text, Button, StyleSheet, Switch, Image } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import { db } from "../../Firebase/Firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { water } from "../../assets/imgs/fish.png";

export default function Phlvl() {
  const [waterLvl, setWaterLvl] = useState(0);
  const [ph, setPH] = useState(1);

  // function getRandomPh() {
  //   return Math.floor(Math.random() * 14) + 1;
  // }
  useEffect(() => {
    onValue(ref(db, "FarmCycle/Phlevel"), (snapshot) => {
      if (snapshot !== null) {
        setPH(snapshot.val().level);
      }
    });
  }, []);
  console.log(ph);

  //const [isEnabled, setIsEnabled] = useState(false)
  // const indicatorTop =  useMemo(() => getIndicatorTop(ph), [ph]);
  // = useMemo(() => getIndicatorTop(ph), [ph]);

  const indicatorTop =  getIndicatorTop(ph)

  function getIndicatorTop(ph) {
    switch (ph) {
      case 1:
        return 21;
      case 2:
        return 25;
      case 3:
        return 29;
      case 4:
        return 33;
      case 5:
        return 37;
      case 6:
        return 41;
      case 7:
        return 45;
      case 8:
        return 49;
      case 9:
        return 54;
      case 10:
        return 58;
      case 11:
        return 62;
      case 12:
        return 66;
      case 13:
        return 70;
      case 14:
        return 74;
   
      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          width: "90%",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View style={styles.card}>
          <Text>Ph Level</Text>
          <Text style={{ fontSize: 40 }}>{ph}</Text>
        </View>

        {/* div for arrow and ph */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            height: "100%",
            width: "100%",
            justifyContent: "center",
          }}
        >
          {/* black arrow */}
          <View
            style={{
              position: "absolute",
              left: "15%",
              top: `${indicatorTop}%`,
              width: "13%",
              height: "5%",
            }}
          >
            <Image
              source={require("../../assets/imgs/play.png")}
              style={{ width: "100%", height: "100%" }}
            />
          </View>
          <View style={styles.phCard}>
            <View style={styles.level1}>
              <Text style={styles.text}>1</Text>
            </View>
            <View style={styles.level2}>
              <Text style={styles.text}>2</Text>
            </View>
            <View style={styles.level3}>
              <Text style={styles.text}>3</Text>
            </View>
            <View style={styles.level4}>
              <Text style={styles.text}>4</Text>
            </View>
            <View style={styles.level5}>
              <Text style={styles.text}>5</Text>
            </View>

            <View style={styles.level6}>
              <Text style={styles.text}>6</Text>
            </View>
            <View style={styles.level7}>
              <Text style={styles.text}>7</Text>
            </View>
            <View style={styles.level8}>
              <Text style={styles.text}>8</Text>
            </View>
            <View style={styles.level9}>
              <Text style={styles.text}>9</Text>
            </View>
            <View style={styles.level10}>
              <Text style={styles.text}>10</Text>
            </View>
            <View style={styles.level11}>
              <Text style={styles.text}>11</Text>
            </View>

            <View style={styles.level12}>
              <Text style={styles.text}>12</Text>
            </View>
            <View style={styles.level13}>
              <Text style={styles.text}>13</Text>
            </View>
            <View style={styles.level14}>
              <Text style={styles.text}>14</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundColor: "white",
  },

  card: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 20,
    shadowColor: "black",
    borderRadius: 7,
    width: "30%",
    height: "15%",
    padding: 5,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  card2: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  phCard: {
    width: "25%",
    height: "60%",
    elevation: 20,
    backgroundColor: "#ffffff",
    borderRadius: 7,
    justifyContent: "space-evenly",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 10,
  },
  waterLvl: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    elevation: 20,
    borderRadius: 7,
    shadowColor: "fff",
    padding: 10,
    height: "auto",
    backgroundColor: "#ffffff",
    color: "#ffffff",
  },
  text: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "bold",
  },
  level1: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "red",
  },
  level2: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "orange",
  },
  level3: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#F5D30A",
  },
  level4: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#F3E10C",
  },
  level5: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#4CCB0C",
  },
  level6: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#328508",
  },
  level7: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#215905",
  },
  level8: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#2B6E51",
  },
  level9: {
    marginBottom: 1,
    fontSize: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#52AD9B",
  },
  level10: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#3468CB",
  },
  level11: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#1E3C75",
  },
  level12: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#672172",
  },
  level13: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#43274E",
  },
  level14: {
    marginBottom: 1,
    width: 40,
    height: 25,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    backgroundColor: "#550245",
  },
});
