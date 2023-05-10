import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Switch,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialIcons";

//db
import { db } from "../../Firebase/Firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import { useEffect } from "react";
import { storeState, getStateCage } from "../../Components/module";
function Temperature() {
  const [isPumpOutOn, setIsPumpOutOn] = useState(false);
  const [isPumpInOn, setIsPumpInOn] = useState(false);
  const [isCageControlTempEnabled, setisCageControlTempEnabled] =
    useState(false);
  const [tankHeater, setTankHeater] = useState(false);
  const [cageHeater, setCageHeater] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("time");
  const [show, setShow] = useState(false);
  const [time, setTime] = useState("00:00");
  const [tankMinTemp, setTankMinTemp] = useState(0);
  const [tankMaxTemp, setTankMaxTemp] = useState(0);
  const [cageMinTemp, setCageMinTemp] = useState(0);
  const [cageMaxTemp, setCageMaxTemp] = useState(0);
  const [ismanualCageFan, setManualCageFan] = useState(false);
  const [manualCageLight, setManualCageLight] = useState(false);
  const [manualCoolingTank, setManualCoolingTank] = useState(false);
  const [manualHeaterTank, setManualHeaterTank] = useState(false);

  //for  temps
  const [cageTemperature, setCageTemperature] = useState(0);
  const [tankTemperature, setTankTemperature] = useState(0);

  //store time
  function storeTime(time) {
    update(ref(db, "FarmCycle/" + "Time"), {
      Time: time,
    });
  }
  //store cage temp
  function storeCageTemp(min, max) {
    // var minTemp = parseInt(min);
    // var maxTemp = parseInt(max);

    update(ref(db, "FarmCycle/" + "tCageTemp"), {
      Min: min,
      Max: max,
    });
  }
  //store Tank temp
  function storeTankTemp(min, max) {
    const tempMin = parseInt(min);
    const tempMax = parseInt(max);

    update(ref(db, "FarmCycle/" + "tTankTemp"), {
      Min: tempMin,
      Max: tempMax,
    });
  }

  function isCageCoolingOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemCage"), {
      isCageFanOn: isOn,
    });
  }

  function isTankCoolingOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemTank"), {
      isPumpInOn: isOn,
    });
  }
  function isTankHeaterOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemTank"), {
      isTankHeaterOn: isOn,
    });
  }

  function isCageHeaterOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemCage"), {
      isCageLightOn: isOn,
    });
  }
  /* manual functions */
  function isManualCageFanOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemCage"), {
      isManualFanOnCage: isOn,
    });
  }
  function isPumpOutOnFunc(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemTank"), {
      isPumpOutOn: isOn,
    });
  }
  function isLightManualOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemCage"), {
      isLightManualOn: isOn,
    });
  }

  function isManualHeaterTankOn(isOn) {
    update(ref(db, "FarmCycle/" + "CoolingSystemTank"), {
      isManualHeaterOnTank: isOn,
    });
  }

  //rendering
  useEffect(() => {
    onValue(ref(db, "FarmCycle/CoolingSystemCage"), (snapshot) => {
      if (snapshot !== null) {
        setisCageControlTempEnabled(snapshot.val().isCageFanOn);
      }
    });

  
    onValue(ref(db, "FarmCycle/CoolingSystemCage"), (snapshot) => {
      if (snapshot !== null) {
        setCageHeater(snapshot.val().isCageLightOn);
      }
    });
    onValue(ref(db, "FarmCycle/CoolingSystemTank"), (snapshot) => {
      if (snapshot !== null) {
        setTankHeater(snapshot.val().isTankHeaterOn);
      }
    });
    onValue(ref(db, "FarmCycle/CoolingSystemCage"), (snapshot) => {
      if (snapshot !== null) {
        setManualCageLight(snapshot.val().isLightManualOn);
      }
    });


    onValue(ref(db, "FarmCycle/tTankTemp"), (snapshot) => {
      /* let max = 0,min = 0 */
      if (snapshot !== null) {
        const max = snapshot.val().Max;
        const min = snapshot.val().Min;

        setTankMaxTemp(max.toString());
        setTankMinTemp(min.toString());
      }
    });
    onValue(ref(db, "FarmCycle/tCageTemp"), (snapshot) => {
      if (snapshot !== null) {
        const max = snapshot.val().Max;
        const min = snapshot.val().Min;

        setCageMaxTemp(max.toString());
        setCageMinTemp(min.toString());
      }
    });
    onValue(ref(db, "FarmCycle/tCageTemp"), (snapshot) => {
      if (snapshot !== null) {
        setCageTemperature(snapshot.val().Temp);
      }
    });
    /* change this if we have the tank temp  */
    onValue(ref(db, "FarmCycle/tTankTemp"), (snapshot) => {
      if (snapshot !== null) {
        setTankTemperature(snapshot.val().Temp);
      }
    });
    /* manuals render cage*/
    onValue(ref(db, "FarmCycle/CoolingSystemCage"), (snapshot) => {
      if (snapshot !== null) {
        setManualCageFan(snapshot.val().isManualFanOnCage);
      }
    });
    onValue(ref(db, "FarmCycle/CoolingSystemTank"), (snapshot) => {
      if (snapshot !== null) {
        setIsPumpInOn(snapshot.val().isPumpInOn);
      }
    });
   
    onValue(ref(db, "FarmCycle/CoolingSystemTank"), (snapshot) => {
      if (snapshot !== null) {
        setIsPumpOutOn(snapshot.val().isPumpOutOn);
      }
    });
    onValue(ref(db, "FarmCycle/CoolingSystemTank"), (snapshot) => {
      if (snapshot !== null) {
        setManualHeaterTank(snapshot.val().isManualHeaterOnTank);
      }
    });
  }, []);

  //onchange time will disable the switch and store to database
  const onChange = (event, selectedDate) => {
    //this will  disable
    setisTimePickerenabled(false);
    storeTime("Time", "");

    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let tempDate = new Date(currentDate);

    let hrs = tempDate.getHours();
    let min = tempDate.getMinutes();
    min = String(min).padStart(2, "0");
    const amOrPm = hrs >= 12 ? "PM" : "AM";
    setTime(`${hrs}:${min} ${amOrPm}`);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimePicker = () => {
    showMode("time");
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View
        style={{
          alignItems: "baseline",
          width: "80%",
          marginVertical: 10,
          color: "grey",
        }}
      >
        <Text>Cage Temperature</Text>
      </View>
      <View style={styles.cards}>
        {/* column */}
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={styles.tempCon}>
            <Icon name="whatshot" size={48} color="#ffcc33" />
            <Text
              style={{ fontSize: 20, fontWeight: "500" }}
            >{`${cageTemperature}°C`}</Text>
          </View>
          <View style={styles.switchCon}>
            {/* row con */}
            {/*     <View style={{ flex: 1, flexDirection: "row", backgroundColor:'black' }}> */}
            {/* firs col */}
            {/*  <View style={{ flex: 1, flexDirection: "column" ,backgroundColor:'gray'}}>
                <Text
                  style={{
                    color: "gray",
                    textAlign: "center",
                    marginRight: 12,
                  }}
                >
                  Cage Fan
                </Text>
                <Text
                  style={{
                    color: "gray",
                    textAlign: "center",
                    marginRight: 12,
                  }}
                >
                  Manual Fan
                </Text>
                <Text
                  style={{
                    color: "gray",
                    textAlign: "center",
                    marginRight: 12,
                  }}
                >
                  Cage Light
                </Text>
                <Text
                  style={{
                    color: "gray",
                    textAlign: "center",
                    marginRight: 12,
                  }}
                >
                  Light Manual
                </Text>
              </View>

              {/* seoncd */}
            <View style={styles.rowComponent}>
              <Text
                style={{ color: "gray", textAlign: "center", marginRight: 18 }}
              >
                Cage Fan
              </Text>
              <Switch
                style={{ left: 5 }}
                trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                thumbColor={isCageControlTempEnabled ? "#009EFF" : "#f4f3f4"}
                ios_backgroundColor="#009EFF"
                value={isCageControlTempEnabled}
                onValueChange={(value) => {
                  setisCageControlTempEnabled(value);
                  isCageCoolingOn(value);
                }}
              />
            </View>
            <View style={styles.rowComponent}>
              <Text
                style={{ color: "gray", textAlign: "center", marginRight: 9 }}
              >
                Manual Fan
              </Text>
              <Switch
                value={ismanualCageFan}
                trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                thumbColor={isCageControlTempEnabled ? "#009EFF" : "#f4f3f4"}
                ios_backgroundColor="#009EFF"
                onValueChange={(value) => {
                  isManualCageFanOn(value);
                  setManualCageFan(value);
                  console.log(value);
                }}
              />
            </View>
            <View style={styles.rowComponent}>
              <Text
                style={{ color: "gray", textAlign: "center", marginRight: 15 }}
              >
                Cage Light
              </Text>
              <Switch
                trackColor={{ false: "red", true: "red" }}
                thumbColor={cageHeater ? "#fff" : "#fff"}
                ios_backgroundColor="#009EFF"
                value={cageHeater}
                onValueChange={(value) => {
                  isCageHeaterOn(value);
                  storeState("isHeaterOn", value);
                  setCageHeater(value);
                }}
              />
            </View>
            <View style={styles.rowComponent}>
              <Text
                style={{ color: "gray", textAlign: "center", marginRight: 1 }}
              >
                Light Manual
              </Text>
              <Switch
                trackColor={{ false: "red", true: "red" }}
                thumbColor={cageHeater ? "#fff" : "#fff"}
                ios_backgroundColor="#009EFF"
                value={manualCageLight}
                onValueChange={(value) => {
                  isLightManualOn(value);
                  setManualCageLight(value);
                }}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-evenly",
            margin: 20,
          }}
        >
          <Text>Mininum Temp</Text>
          <TextInput
            value={cageMinTemp}
            style={styles.textInput}
            placeholder="Min Temp celcius"
            keyboardType="numeric"
            onChangeText={setCageMinTemp}
            maxLength={2}
          />
          <Text>Maximum Temp</Text>
          <TextInput
            value={cageMaxTemp}
            style={styles.textInput}
            placeholder="Max Temp celcius"
            keyboardType="numeric"
            onChangeText={setCageMaxTemp}
            maxLength={2}
          />
          <View style={{ marginTop: 2 }}>
            <Button
              title="Submit"
              onPress={() => storeCageTemp(cageMinTemp, cageMaxTemp)}
              color={"#00AD7C"}
            />
          </View>
        </View>
      </View>
      {/* tank */}
      <View
        style={{
          alignItems: "baseline",
          width: "80%",
          marginVertical: 4,
          color: "#6B728E",
        }}
      >
        <Text>Tank Temperature</Text>
      </View>

      <View style={styles.cards}>
        {/* column */}
        <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
          <View style={styles.tempCon}>
            <Icon name="whatshot" size={48} color="#ffcc33" />
            <Text
              style={{ fontSize: 20, fontWeight: "500" }}
            >{`${tankTemperature}°C`}</Text>
          </View>
          <View style={styles.switchCon}>
            <View style={styles.rowComponent}>
              <Text style={{ color: "gray", textAlign: "center", margin: 10 }}>
                Pump In
              </Text>
              <Switch
                style={{ left: 40 }}
                trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                thumbColor={isPumpInOn ? "#009EFF" : "#f4f3f4"}
                ios_backgroundColor="#009EFF"
                value={isPumpInOn}
                onValueChange={(value) => {
                  setIsPumpInOn(value);
                  storeState("isTankTempOn", value);
                  isTankCoolingOn(value);
                }}
              />
            </View>
            <View style={styles.rowComponent}>
              <Text style={{ color: "gray", textAlign: "center", margin: 10 }}>
                Pump Out
              </Text>
              <Switch
                style={{ left: 30 }}
                trackColor={{ false: "#81b0ff", true: "#81b0ff" }}
                thumbColor={isPumpOutOn ? "#009EFF" : "#f4f3f4"}
                ios_backgroundColor="#009EFF"
                value={isPumpOutOn}
                onValueChange={(value) => {
                  isPumpOutOnFunc(value);
                  setIsPumpOutOn(value);
                }}
              />
            </View>
            <View style={styles.rowComponent}>
              <Text style={{ color: "gray", textAlign: "center", margin: 7 }}>
                Heater system
              </Text>
              <Switch
                style={{ left: 8 }}
                trackColor={{ false: "red", true: "red" }}
                thumbColor={tankHeater ? "#fff" : "#fff"}
                ios_backgroundColor="#009EFF"
                value={tankHeater}
                onValueChange={(value) => {
                  setTankHeater(value);
                  storeState("heaterState", value);
                  /* store to database */
                  isTankHeaterOn(value);
                }}
              />
            </View>
            <View style={styles.rowComponent}>
              <Text style={{ color: "gray", textAlign: "center", margin: 6 }}>
                Manual Heater
              </Text>
              <Switch
                style={{ left: 8 }}
                trackColor={{ false: "red", true: "red" }}
                thumbColor={manualHeaterTank ? "#fff" : "#fff"}
                ios_backgroundColor="#009EFF"
                value={manualHeaterTank}
                onValueChange={(value) => {
                  setManualHeaterTank(value);
                  /* store to database */
                  isManualHeaterTankOn(value);
                }}
              />
            </View>
          </View>
        </View>

        <View
          /* temps */
          style={{
            backgroundColor: "white",
            margin: 20,
            flex: 1,
            alignItems: "center",
          }}
        >
          <Text>Mininum Temp</Text>
          <TextInput
            value={tankMinTemp}
            style={styles.textInput}
            placeholder="Enter min Temp"
            keyboardType="numeric"
            maxLength={2}
            onChangeText={setTankMinTemp}
          />
          <Text>Maximum Temp</Text>
          <TextInput
            value={tankMaxTemp}
            style={styles.textInput}
            placeholder="Enter max Temp"
            keyboardType="numeric"
            maxLength={2}
            onChangeText={setTankMaxTemp}
          />
          <View style={{ marginTop: 2 }}>
            <Button
              title="Submit"
              onPress={() => storeTankTemp(tankMinTemp, tankMaxTemp)}
              color={"#00AD7C"}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Temperature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  cusButton: {
    flexDirection: "row",
    height: 50,
    width: 100,
    backgroundColor: "#47B5FF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
    elevation: 3,
    borderRadius: 5,
  },
  switchCon: {
    marginHorizontal: -10,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  textInput: {
    marginBottom: 10,
    padding: 7,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
  },
  time_text: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 10,
  },
  cardsCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "35%",
  },
  cards: {
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "43%",
    width: "90%",
    borderRadius: 8,
    elevation: 20,
    shadowColor: "#52006A",
    shadowRadius: 3,
    shadowOffset: {},
    marginBottom: 5,
  },
  timeCard: {
    flex: 0.6,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    height: "70%",
    marginHorizontal: 4,
    borderRadius: 8,
    elevation: 20,
    shadowColor: "#52006A",
    shadowRadius: 3,
    shadowOffset: {},
  },
  rowComponent: {
    flexDirection: "row",
    alignItems: "center",
    left: 15,
  },
  tempCon: {
    top: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 100,
    width: 100,
  },
});
