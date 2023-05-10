import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ref, onValue, push, update, remove } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../../Firebase/Firebase";

function Plants() {
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode1, setMode1] = useState("time");
  const [mode2, setMode2] = useState("time");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [time1, setTime1] = useState("");
  const [time2, setTime2] = useState("");
  const [isLightOn, setIsLightOn] = useState(false);
  const [onOff, setOnOff] = useState("Off");
  const [isAutoOn, setIsAutoOn] = useState(false);

  useEffect(() => {
    onValue(ref(db, "FarmCycle/" + `PlantsLight`), (snapshot) => {
      if (snapshot !== null) {
        setIsLightOn(snapshot.val().isLightOn);
      }
    });
    onValue(ref(db, "FarmCycle/" + `PlantsLight`), (snapshot) => {
      if (snapshot !== null) {
        setIsAutoOn(snapshot.val().isAutoOn);
      }
    });
    onValue(ref(db, "FarmCycle/" + `PlantsLight`), (snapshot) => {
      if (snapshot !== null) {
        setTime1(snapshot.val().TimeOn);
      } else {
        setTime1("00:00");
      }
    });
    onValue(ref(db, "FarmCycle/" + `PlantsLight`), (snapshot) => {
      if (snapshot !== null) {
        setTime2(snapshot.val().TimeOff);
      } else {
        setTime2("00:00");
      }
    });
  }, []);
  //store to db
  function storeLight(isOn) {
    update(ref(db, "FarmCycle/" + "PlantsLight"), {
      isLightOn: isOn,
    });
  }

  function lightSchedOn(time1) {
    update(ref(db, "FarmCycle/" + "PlantsLight"), {
      TimeOn: time1,
    });
  }
  function lightSchedOff(time1) {
    update(ref(db, "FarmCycle/" + "PlantsLight"), {
      TimeOff: time1,
    });
  }

  function isAutoOnFunc(isOn) {
    update(ref(db, "FarmCycle/" + "PlantsLight"), {
      isAutoOn: isOn,
    });
  }

  const onChangeON = (event, selectedDate) => {
    const currentDate1 = selectedDate || date1;
    setShow1(Platform.OS === "ios");
    setDate1(currentDate1);
    console.log(currentDate1);

    let tempDate = new Date(currentDate1);
    let hrs = tempDate.getHours();
    let min = tempDate.getMinutes();
    min = String(min).padStart(2, "0");
    const amOrPm = hrs >= 12 ? "PM" : "AM";
    console.log("formated", `${hrs}:${min}`);
   // let time1Con = `${hrs}:${min}`;
    setTime1(`${hrs}:${min}`);
    //const timeOn = `${hrs}:${min}`;
   // lightSchedOn(timeOn);
  };

  const onChangeOFF = (event, selectedDate) => {
    const currentDate2 = selectedDate || date2;
    setShow2(Platform.OS === "ios");
    setDate2(currentDate2);
    let tempDate = new Date(currentDate2);

    let hrs = tempDate.getHours();
    let min = tempDate.getMinutes();
    min = String(min).padStart(2, "0");
    const amOrPm = hrs >= 12 ? "PM" : "AM";
    setTime2(`${hrs}:${min}`);
    //const timeOff = `${hrs}:${min}`;
    //lightSchedOff(timeOff);
    //console.log("formated", `${hrs}:${min}`);
  };

  //show mode whether time or date
  const showMode1 = (currentMode) => {
    setShow1(true);
    setMode1(currentMode);
  };
  const showMode2 = (currentMode) => {
    setShow2(true);
    setMode2(currentMode);
  };

  //show time picker
  const showTimePicker = () => {
    showMode1("time");
  };
  const showTimePicker2 = () => {
    showMode2("time");
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxCon}>
        <Text style={{ fontSize: 24 }}>Plant's Light</Text>

        <TouchableOpacity>
          <Image
            source={require("../../assets/imgs/lights.png")}
            style={{ height: 150, width: 250 }}
          />
        </TouchableOpacity>
        <View style={styles.switchRow}>
          <Switch
            value={isLightOn}
            onValueChange={(value) => {
              storeLight(value);
              setIsLightOn(value);
              if (value) {
                setOnOff("On");
              } else {
                setOnOff("Off");
              }
            }}
            style={{ width: 40, height: 35 }}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isLightOn ? "#009EFF" : "#f4f3f4"}
            ios_backgroundColor="#009EFF"
          />
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{onOff}</Text>
        </View>
      </View>
      <View style={styles.boxCon}>
        {/* sched/ auto */}
        <View style={styles.sched}>
          {/*  */}
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray", fontSize: 10 }}>
              Set Turn-On Time
            </Text>
            <TextInput
              onFocus={showTimePicker}
              placeholder="first Feeding hour"
              keyboardType="numeric"
              maxLength={10}
              textAlign="center"
              onChangeText={time1}
              value={time1}
              style={{
                marginVertical: 10,
                height: 40,
                width: 100,
                borderRadius: 4,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />
            {show1 && (
              <DateTimePicker
                testID="dateTimePicker1"
                value={date1}
                mode={mode1}
                dateFormat={"hh:mma"}
                is24Hour={false}
                display="default"
                onChange={onChangeON}
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray", fontSize: 10 }}>
              Set Turn-Off Time
            </Text>
            <TextInput
              onFocus={showTimePicker2}
              placeholder="first Feeding hour"
              keyboardType="numeric"
              maxLength={10}
              textAlign="center"
              onChangeText={time2}
              value={time2}
              style={{
                margin: 10,
                height: 40,
                width: 100,
                padding: 5,
                borderRadius: 6,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />
            {show2 && (
              <DateTimePicker
                testID="dateTimePicker2"
                value={date2}
                mode={mode2}
                dateFormat={"hh:mma"}
                is24Hour={false}
                display="default"
                onChange={onChangeOFF}
              />
            )}
          </View>
          <View style={{ width: 40 ,justifyContent:'center', alignItems:'center', top:"2%"}}>
            {/* auto/schedule */}
            <Switch
              trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
              thumbColor={isAutoOn ? "#009EFF" : "#f4f3f4"}
              ios_backgroundColor="#009EFF"
              value={isAutoOn}
              onChange={() => {}}
              onValueChange={(value) => {
                console.log(value)
                setIsAutoOn(value);
                /* db */
                isAutoOnFunc(value);
                if (value) {
                  lightSchedOn(time1);
                  lightSchedOff(time2);
                } else {
                  lightSchedOn("");
                  lightSchedOff("");
                }
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Plants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  boxCon: {
    height: "45%",
    width: "90%",
    backgroundColor: "#fff",
    elevation: 20,
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },

  switchRow: {
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  feedCon: {
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sched: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
