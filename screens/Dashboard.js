import { View, Text, Button, StyleSheet, TouchableOpacity, ImageBackground, Modal, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialIcons";
import bg from "../assets/imgs/bg-green-round.png";
import React, { useState } from "react";
import ActivityModal from "../Components/ActivityModal";
import HistoryModal from "../Components/HistoryModal";
function Dashboard({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [hModal, setHModal] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  return (
    <ImageBackground  source={bg}
      resizeMode="cover"
      style={{ height: "100%", width: "100%" }}
    >
      <View style={styles.container}
       onPress={() => setDropDown(false)}
      >
        {/* toggle dropdown */}
        <View
          style={{ position: "absolute", right: 0, top: 20, marginRight: 20 }}
        >
          <MaterialCommunityIcons
            onPress={() => setDropDown(!dropDown)}
            name="history"
            size={30}
            color="gray"
            style={{ marginHorizontal: 2 }}
          />
        </View>
        {/* dropdown */}
        {dropDown && (
          <View
            style={{
              backgroundColor: "white",
              width: "40%",
              height: "15%",
              position: "absolute",
              right: 30,
              top: 40,
              borderRadius: 10,
              elevation: 20,
              zIndex: 10,
              flexDirection:'column',
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                width:'100%',
                margin: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "gray" }}>Activity</Text>
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color="gray"
                style={{ marginHorizontal: 2 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setHModal(true)}
              style={{
              
                margin: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontSize: 20, color: "gray" }}>Histroy</Text>
              <MaterialCommunityIcons
                name="eye"
                size={20}
                color="gray"
                style={{ marginHorizontal: 2 }}
              />
            </TouchableOpacity>
          </View>
        )}

        <HistoryModal visible={hModal} closeModal={() => setHModal(false)} />
        
        <ActivityModal
          visible={modalVisible}
          closeModal={() => setModalVisible(false)}
        />

        <View style={{ alignSelf: "baseline", marginLeft: 50 }}>
          <Text style={styles.font}>Dashboard</Text>
        </View>
        <View style={styles.boxCon}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => navigation.navigate("Fish")}>
              <MaterialCommunityIcons name="fish" size={48} color="#A4BE7B" />
              <Text style={{ alignSelf: "center" }}>Fish</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => navigation.navigate("Chicken")}>
              <MaterialCommunityIcons
                name="twitter"
                size={48}
                color="#557153"
              />
              <Text>Chicken</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxCon}>
          <View style={styles.inner}>
            <TouchableOpacity onPress={() => navigation.navigate("Plants")}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="local-florist" size={48} color="#285430" />
                <Text>Plants</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inner}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Temperature")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="whatshot" size={48} color="#ffcc33" />
                <Text>Temperature</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.boxCon}>
          {/* flex con */}

          {/* ph */}

          <View style={styles.inner}>
            <TouchableOpacity onPress={() => navigation.navigate("Phlvl")}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="opacity" size={48} color="#009EFF" />
              </View>
              <Text>Ph Level</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inner}>
            <TouchableOpacity onPress={() => navigation.navigate("WaterLvl")}>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="opacity" size={48} color="#009EFF" />
              </View>
              <Text>Water Level</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    top: 30,
  },
  boxCon: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "85%",
    height: "25%",
    marginBottom: 2,
  },
  inner: {
    backgroundColor: "#fff",
    color: "white",
    flex: 1,
    marginHorizontal: 10,
    marginTop: -30,
    height: "80%",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    elevation: 20,
    shadowColor: "#3e4c39  ",
    shadowRadius: 10,
    shadowOffset: {},
  },
  font: {
    fontSize: 25,
    fontWeight: "700",
    color: "#a9a9a9",
  },
});
