import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/Firebase";
import { ref, onValue, push, update, remove, set } from "firebase/database";
import DateTimePicker from "@react-native-community/datetimepicker";
let clicks = false;
let timeoutId = null;

function Chicken() {
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
  const [quantity, setQuantity] = useState(0);
  const [daysOfChicken, setDaysOfChicken] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(null);

  function trackClicks() {
    clicks = true;
    Feed(clicks);
    console.log(clicks);
  }
  //update the number of click to firebase
  function Feed(clicks) {
    update(ref(db, "FarmCycle/" + "FeedChicken"), {
      ManualFeed: clicks,
    });
  }

  function feedTime(first, second) {
    update(ref(db, "FarmCycle/" + "FeedChicken"), {
      FirstFeedTime: first,
      SecondFeedTime: second,
    });
  }

  function DaysOfChicken(days, date) {
    update(ref(db, "FarmCycle/" + "DaysChicken"), {
      Days: days,
      dateStart: date,
    });
  }
  function ChickenQuantity(quantity) {
    update(ref(db, "FarmCycle/" + "ChickenQuantity"), {
      Quantity: quantity,
    });
  }

  //rendering data from db
  useEffect(() => {
    //render days
    onValue(ref(db, "FarmCycle/DaysChicken"), (snapshot) => {
      if (snapshot !== null) {
        setDaysOfChicken(snapshot.val().Days);
        setLastUpdated(snapshot.val().dateStart);
      }
    });

    onValue(ref(db, "FarmCycle/ChickenQuantity"), (snapshot) => {
      if (snapshot !== null) {
        setQuantity(snapshot.val().Quantity);
      }
    });
    onValue(ref(db, "FarmCycle/FeedChicken"), (snapshot) => {
      if (snapshot !== null) {
        setTime1(snapshot.val().FirstFeedTime);
      }
    });
    onValue(ref(db, "FarmCycle/FeedChicken"), (snapshot) => {
      if (snapshot !== null) {
        setTime2(snapshot.val().SecondFeedTime);
      }
    });
  }, []);

  /* checks if 24hhrs has passed if true increment */
  useEffect(() => {
    if (
      lastUpdated &&
      new Date() - new Date(lastUpdated) > 24 * 60 * 60 * 1000
    ) {
      setDaysOfChicken(Number(daysOfChicken) + 1);
      update(ref(db, "FarmCycle/DaysChicken"), {
        Days: daysOfChicken + 1,
        dateStart: new Date().toString(),
      });
    }
  }, [daysOfChicken, lastUpdated]);

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow1(Platform.OS === "ios");
    setDate1(currentDate);
    let tempDate = new Date(currentDate);

    let hrs = tempDate.getHours();
    let min = tempDate.getMinutes();
    min = String(min).padStart(2, "0");
    const amOrPm = hrs >= 12 ? "PM" : "AM";
    setTime1(`${hrs}:${min} ${amOrPm}`);
  };

  //for second feeding
  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
  };
  const showTimePicker2 = () => {
    showMode2("time");
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topBoxCon}>
        <Image
          source={require("../../assets/imgs/chicken-eat.jpg")}
          style={{ height: 100, width: 100 }}
        />

        <View style={styles.innerCard}>
          <View style={styles.fishDetail}>
            <Text style={{ fontWeight: "bold", color: "gray",right:4, top: 9 }}>
              Days of Chicken
            </Text>
            <TextInput
              onChangeText={(text) => setDaysOfChicken(Number(text))}
              value={daysOfChicken.toString()}
              keyboardType="numeric"
              maxLength={5}
              textAlign="center"
              style={{
                marginVertical: 10,
                height: 40,
                width: 80,
                right:18,
                padding: 5,
                borderRadius: 6,
                borderColor: "gray",
                borderWidth: 1,
              }}
            />
            <Text
              style={{ fontWeight: "bold", color: "gray", right: 30, top: 9 }}
            >
              Quantity
            </Text>
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
                width: 80,
                right:18,
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
                onFocus={showTimePicker}
                placeholder="first Feeding hour"
                keyboardType="numeric"
                maxLength={5}
                textAlign="center"
                onChangeText={time1}
                style={{
                  marginVertical: 10,
                  height: 40,
                  width: 80,
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
                <Text style={{ color: "white", fontWeight: "bold" }}>Set</Text>
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
                  width: 80,
                  padding: 1,
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
                <Text style={{ color: "white", fontWeight: "bold" }}>Set</Text>
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
                DaysOfChicken(0, new Date());
                ChickenQuantity(0);
              }}
            />
          </View>

          <View style={{ margin: 10, width: 150 }}>
            <Button
              title="Submit"
              color={"#00AD7C"}
              onPress={() => {
                feedTime(time1, time2);
                ChickenQuantity(quantity);
                update(ref(db, "FarmCycle/DaysChicken"), {
                  Days: daysOfChicken,
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
            source={require("../../assets/imgs/chicken-rice.png")}
            style={{ height: 100, width: 100 }}
          />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Chicken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  text: {
    alignSelf: "baseline",
    right:10,
    top: 9,
    fontWeight: "bold",
    color: "gray",
  },
  roundButton1: {
    flexDirection: "row",
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
  topBoxCon: {
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 7,
    shadowColor: "black",
    height: "55%",
    width: "80%",
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
