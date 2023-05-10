import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/Firebase";
import { ref, onValue, push, update, remove } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";
import bg from "../../assets/imgs/bg-green1.png";
import { MaterialIcons } from "@expo/vector-icons";

let clicks = false;
let timeoutId = null;

function Fish() {
  //   const [firstFeed, setFirstFeed] = useState(0);
  //   const [secondFeed, setSecondFeed] = useState(0);
  const [date1, setDate1] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [mode1, setMode1] = useState("time");
  const [mode2, setMode2] = useState("time");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [time1, setTime1] = useState("00:00");
  const [time2, setTime2] = useState("00:00");
  const [daysOfFish, setDayofFish] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);
 const [isFirstFeedingSet,setIsFirstFeedingSet] = useState(false)
  function trackClicks() {
    clicks = true;
    Feed(clicks);
    console.log(clicks);
  }
  //update the number of click to firebase
  function Feed(clicks) {
    const now = Date.now();
    const lastFeed = new Date(now).toString();
    update(ref(db, "FarmCycle/" + "FeedFish"), {
      ManualFeed: clicks,
      LastFeed: lastFeed,
    });
    
  }
  function feedTime(first, second) {
    update(ref(db, "FarmCycle/" + "FeedFish"), {
      FirstFeedTime: first,
      SecondFeedTime: second,
    });
  }

  function FirstFeed(first) {
    console.log(isFirstFeedingSet)
    update(ref(db, "FarmCycle/" + "FeedFish"), {
      FirstFeedTime: first,
    });
  }

  function DaysOfFish(days, dateStart) {
    update(ref(db, "FarmCycle/" + "DaysFish"), {
      Days: days,
      dateStart: dateStart,
    });
  }
  function FishQuantity(quantity) {
    update(ref(db, "FarmCycle/" + "FishQuantity"), {
      Quantity: parseInt(quantity),
    });
  }

  //rendering data from db
  useEffect(() => {
    onValue(ref(db, "FarmCycle/DaysFish"), (snapshot) => {
      if (snapshot !== null) {
        setDayofFish(snapshot.val().Days);
        setLastUpdated(snapshot.val().dateStart);
      }
    });
    onValue(ref(db, "FarmCycle/FishQuantity"), (snapshot) => {
      if (snapshot !== null) {
        setQuantity(snapshot.val().Quantity.toString());
      }
    });

    onValue(ref(db, "FarmCycle/FeedFish"), (snapshot) => {
      if (snapshot !== null) {
        setTime1(snapshot.val().FirstFeedTime);
      }
    });
    onValue(ref(db, "FarmCycle/FeedFish"), (snapshot) => {
      if (snapshot !== null) {
        setTime2(snapshot.val().SecondFeedTime);
      }
    });
  }, []);

  useEffect(() => {
    if (
      lastUpdated &&
      new Date() - new Date(lastUpdated) > 24 * 60 * 60 * 1000
    ) {
      setDayofFish(Number(daysOfFish) + 1);
      update(ref(db, "FarmCycle/DaysFish"), {
        Days: daysOfFish + 1,
        dateStart: new Date().toString(),
      });
    }
  }, [daysOfFish, lastUpdated]);

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow1(Platform.OS === "ios");
    setDate1(currentDate);
    let tempDate = new Date(currentDate);

    let hrs = tempDate.getHours();
    let min = tempDate.getMinutes();
    min = String(min).padStart(2, "0");
    const amOrPm = hrs >= 12 ? "PM" : "AM";
    setTime1(`${hrs}:${min} ${amOrPm}`);
    setIsFirstFeedingSet(true)
  };
  //for second feeding
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date2;
    setShow2(Platform.OS === "ios");
    setDate2(currentDate);
    let tempDate = new Date(currentDate);

    let hrs = tempDate.getHours();
    let min = tempDate.getMinutes();
    min = String(min).padStart(2, "0");
    const amOrPm = hrs >= 12 ? "PM" : "AM";
    setTime2(`${hrs}:${min} ${amOrPm}`);
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
    FirstFeed
  };
  const showTimePicker2 = () => {
    showMode2("time");
  };

  return (
    <ImageBackground
      source={bg}
      resizeMode="contain"
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.topBoxCon}>
          <Image
            source={require("../../assets/imgs/fish.png")}
            style={{ height: 100, width: 100 }}
          />
          <View style={styles.innerCard}>
            <View style={styles.fishDetail}>
              <Text  style={{fontWeight:'bold',color:'gray',right:10, top:9}}>Days of Fish</Text>
              <TextInput
                onChangeText={(text) => setDayofFish(Number(text))}
                value={daysOfFish.toString()}
                keyboardType="numeric"
                maxLength={5}
                textAlign="center"
                style={{
                  marginVertical: 10,
                  height: 40,
                  width: 100,
                  padding: 5,
                  borderRadius: 6,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              />
              <Text style={{fontWeight:'bold',color:'gray',right:20, top:9}}>Quantity</Text>
              <TextInput
                // onFocus={showTimePicker}
                value={quantity}
                onChangeText={(text) => setQuantity(text)}
                keyboardType="numeric"
                maxLength={5}
                textAlign="center"
                style={{
                  marginVertical: 10,
                  height: 40,
                  width: 100,
                  padding: 5,
                  borderRadius: 6,
                  borderColor: "gray",
                  borderWidth: 1,
                }}
              />
            </View>

            <View style={styles.feedCon}>
              <Text style={styles.text}>{"First Feeding"} </Text>
             
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  placeholder="first Feeding hour"
                  keyboardType="numeric"
                  maxLength={5}
                  textAlign="center"
                  onFocus={showTimePicker}
                  onChangeText={(newText) => {
                    setTime1(newText);
                    setIsFirstFeedingSet(false);
                  }}
                  style={{
                    marginVertical: 10,
                    height: 40,
                    width: 100,
                    padding: 5,
                    borderRadius: 6,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                  value={time1}
                />
                <TouchableOpacity
                  onPress={showTimePicker}
                  style={styles.roundButton1}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Set
                  
                  </Text>
                  
                  {/* <MaterialIcons
                      style={styles.delete}
                      name={isFirstFeedingSet ? `check` : 'close'}
                      size={20}
                      color="#fff"
                    /> */}
                </TouchableOpacity>
              </View>
              {show1 && (
                <DateTimePicker
                  testID="dateTimePicker1"
                  value={date1}
                  mode={mode1}
                  dateFormat={"hh:mma"}
                  is24Hour={false}
                  display="default"
                  onChange={onChange1}
                />
              )}

              <Text style={styles.text}>Second Feeding</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextInput
                  onFocus={showTimePicker2}
                  placeholder="first Feeding hour"
                  keyboardType="numeric"
                  maxLength={5}
                  textAlign="center"
                  onChangeText={time2}
                  style={{
                    marginVertical: 10,
                    height: 40,
                    width: 100,
                    padding: 5,
                    borderRadius: 6,
                    borderColor: "gray",
                    borderWidth: 1,
                  }}
                  value={time2}
                />
                <TouchableOpacity
                  onPress={showTimePicker2}
                  style={styles.roundButton1}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    Set
                  </Text>
                </TouchableOpacity>
              </View>
              {show2 && (
                <DateTimePicker
                  testID="dateTimePicker2"
                  value={date2}
                  mode={mode2}
                  dateFormat={"hh:mma"}
                  is24Hour={false}
                  display="default"
                  onChange={onChange2}
                />
              )}
            </View>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 20,
            }}
          >
            <View style={{ margin: 10, width: 150 }}>
              <Button
                title="Reset"
                color={"#ff5733"}
                onPress={() => {
                  feedTime(0, 0);
                  DaysOfFish(0, new Date());
                  FishQuantity(0);
                }}
              />
            </View>
            <View style={{ margin: 10, width: 150 }}>
              <Button
                title="Submit"
                color={"#00AD7C"}
                onPress={() => {
                  feedTime(time1, time2);
                  // DaysOfFish(daysOfFish, lastUpdated);
                  FishQuantity(quantity);
                  update(ref(db, "FarmCycle/DaysFish"), {
                    Days: daysOfFish,
                    dateStart: new Date().toString(),
                  });
                }}
              />
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={trackClicks}>
          <View style={styles.card}>
            <Image
              source={require("../../assets/imgs/fish-food.png")}
              style={{ height: 100, width: 100 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

export default Fish;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  roundButton1: {
    flexDirection:'row',
    width: 50,
    height: 40,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 6,
    backgroundColor: "#00AD7C",
  },
  text: {
    alignSelf: "baseline",
    right: 12,
    top: 9,
    fontWeight: "bold",
    color: "gray",
  },

  topBoxCon: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 7,
    shadowColor: "black",
    height: "65%",
    width: "90%",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 7,
    shadowColor: "black",
    height: 120,
    width: 100,
  },

  innerCard: {
    flex: 1,
    flexDirection: "row",
    width: "90%",
    height: "60%",
  },
  fishDetail: {
    flex: 1,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  feedCon: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
