import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { db } from "../../Firebase/Firebase";
import { ref, onValue, push, update, remove } from "firebase/database";

/* images */


export default function Water() {
  const [waterLevel, setWaterLevel] = useState([]);

  useEffect(() => {
    onValue(ref(db, "FarmCycle/WaterLevel"), (snapshot) => {
      if (snapshot !== null) {
        setWaterLevel(snapshot.val().waterlvl);
        WaterStateImage(waterLevel);
        waterStateText(waterLevel);
      }
    });
  });

  const WaterStateImage = (waterLevel) => {
    switch (waterLevel) {
      case 1:
        return  require("../../assets/imgs/GOOD.png");
      case 2:
        return  require("../../assets/imgs/WARNING.png");
        case 3:
          return  require("../../assets/imgs/DANGER.png");
    }
  };
  const waterStateText = (waterLevel) => {
    switch(waterLevel){
      case 1:
        return 'GOOD' 
      case 2:
        return 'WARNING' 
      case 3:
        return 'DANGER'
    }
  }

  return (
    <View style={styles.container}>
    <Image source={WaterStateImage(waterLevel)} style={{ width: 300, height: 300, margin:5 }} />

      {/* waterstate TEXT render */}
      <Text style={{fontWeight: "500", fontSize:20}}>{waterStateText(waterLevel)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
