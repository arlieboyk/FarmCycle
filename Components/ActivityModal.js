import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../Firebase/Firebase";
import { ref, onValue, push, update, remove, set } from "firebase/database";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ActivityModal({ visible, closeModal }) {

  const actions = [];
  const [activityLogs, setActivityLogs] = useState([]);
  let overallIndex = 0;

  /* fetching data */
  useEffect(() => {
    onValue(ref(db, "FarmCycle/ActivityLog"), (snapshot) => {
      if (snapshot !== null) {
        setActivityLogs(snapshot.val());
      }
    });
  }, []);

  useEffect(() => {
    console.log("log: ", activityLogs);
  }, [activityLogs]);


  for (let category in activityLogs) {
    for (let action in activityLogs[category]) {
      const status = activityLogs[category][action].status;
      const timeStr = activityLogs[category][action].time;
      actions.push({ category, action, status, time: timeStr });
    }
  }



  actions.sort((a, b) => {
    return a.time - b.time;
  });

  return (
    <Modal visible={visible} animationType="slide" animationDuration={2000}>
      <View style={styles.modalView}>
        <TouchableOpacity style={styles.button} onPress={closeModal}>
          <MaterialCommunityIcons
            name="close"
            size={20}
            color="white"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "gray",
            position: "absolute",
            left: 25,
            top: 0,
            fontSize: 20,
          }}
        >
          Activity Log
        </Text>
        {/* table */}
        <ScrollView style={styles.table}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 6,
              borderBottomColor: "gray",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Time/Date</Text>
            <Text style={{ fontWeight: "bold" }}>Activities</Text>
            <Text style={{ fontWeight: "bold" }}>Stattus</Text>
          </View>

          {actions.map((action, index) => {
            overallIndex++;
            return (
              <>
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    index % 2 == 0 ? styles.even : styles.odd,
                  ]}
                >
                  <Text>
                    {/* {currentDateTime} */}
                    {action.time}
                  </Text>

                  <Text>{action.action}</Text>
                  <Text style={[action.status ? styles.green : styles.red]}>
                    {action.status ? "On" : "Off"}
                  </Text>
                </View>
              </>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

export default ActivityModal;

const styles = StyleSheet.create({
  modalView: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: "100%",
  },
  button: {
    position: "absolute",
    top: 0,
    right: 0,
    left: "87%",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: "#00AD7C",
  },
  table: {
    flex: 1,
    marginTop: 50,
    width: "98%",
    backgroundColor: "white",
    borderColor: "#ccc",
    shadowColor: "gray",
    elevation: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 6,
    paddingVertical: 15,
  },
  even: {
    backgroundColor: "white",
  },
  odd: {
    backgroundColor: "#D3D3D3",
  },

  green: {
    color: "green",
  },
  red: {
    color: "red",
  },
});
