import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { db } from "../Firebase/Firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ref, onValue, set } from "firebase/database";
import { useEffect, useState } from "react";
import { LinkingContext } from "@react-navigation/native";

function HistoryModal({ visible, closeModal }) {
  const [categories, setCategories] = useState([]);
  const tempCategoies = [];

  /* just to get  */
  const getHistory = () => {
    onValue(ref(db, "FarmCycle/HistoryLog"), (snapshot) => {
      if (snapshot !== null) {
        setCategories(snapshot.val());
      }
    });
  };

  useEffect(() => {
    onValue(ref(db, "FarmCycle/HistoryLog"), (snapshot) => {
      if (snapshot !== null) {
        setCategories(snapshot.val());
      }
    });
  }, []);

  const clearHistory = () => {
    set(ref(db, "FarmCycle/HistoryLog"), {});
  };

  for (let category in categories) {
    tempCategoies.push(category);
    for (let activity in categories[category]) {
      for (let ran in categories[category][activity]) {
        const status = categories[category][activity][ran].status;
        const time = categories[category][activity][ran].time;

        tempCategoies.push({ category, activity, time, status });
      }
    }
  }

  useEffect(() => {
    console.log("tempcat ", tempCategoies);
  }, [tempCategoies]);
  return (
    <Modal visible={visible}>
      <View style={styles.con}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "gray" }}>
          History modal
        </Text>
        <TouchableOpacity style={styles.deleteBtn} onPress={clearHistory}>
          <MaterialCommunityIcons
            name="trash-can"
            size={20}
            color="white"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.CloseModalBtn} onPress={closeModal}>
          <MaterialCommunityIcons
            name="close"
            size={20}
            color="white"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.relaodBtn} onPress={getHistory}>
          <MaterialCommunityIcons
            name="reload"
            size={20}
            color="white"
            style={{ marginHorizontal: 2 }}
          />
        </TouchableOpacity>

        {/* table head */}
        <View style={styles.tableHead}>
          <Text style={styles.tabledHeadText}>Date/Time</Text>
          <Text style={styles.tabledHeadText}>Activity</Text>
          <Text style={styles.tabledHeadText}>Status</Text>
        </View>
        <ScrollView style={{ marginBottom: 80 }}>
          {/* tableContent */}
          <View>
            {tempCategoies.map((item, index) => (
              <View style={styles.tableContent} key={index}>
                <Text>{item.time}</Text>
                <Text>{item.activity}</Text>
                <Text
                  style={[
                    styles.statusColumn,
                    item.status ? styles.green : styles.red,
                  ]}
                >
                  {item.status ? "On" : "Off"}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default HistoryModal;
const styles = StyleSheet.create({
  con: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  CloseModalBtn: {
    elevation: 10,

    position: "absolute",
    top: 20,
    left: "85%",
    right: 0,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#00AD7C",
  },
  relaodBtn: {
    position: "absolute",
    top: "95%",
    left: "80%",
    zIndex: 10,
    elevation: 20,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#00AD7C",
  },
  deleteBtn: {
    elevation: 10,
    position: "absolute",
    top: 20,
    left: "3%",
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "red",
  },
  tableCon: {
    borderStartColor: "gray",
  },
  tableHead: {
    marginTop: 20,
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    padding: 6,
    width: "100%",
    justifyContent: "space-around",
  },
  tabledHeadText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  tableContent: {
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 6,
    paddingHorizontal: 20,
    width: "100%",
    justifyContent: "space-between",
  },
  statusColumn: {
    width: "30%", // set a fixed width for the Status column
  },
  red: {
    color: "red", // set a fixed width for the Status column
  },
  green: {
    color: "green",
  },
});
