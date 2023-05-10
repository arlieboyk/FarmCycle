import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import TaskInputField from "../Components/TaskInputField";
import TaskItem from "../Components/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import bg from "../assets/imgs/bg-green-round.png";

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);


  /* remove item from local */
  const deleteTaskFromLocal = (task) => {
    AsyncStorage.removeItem("Todo", task);
  };

  useEffect(() => {
    retrieveData();
  }, []);

  const storeData = async (task) => {
    try {
      const taskString = JSON.stringify(task);
      console.log("Save: ", taskString);
      await AsyncStorage.setItem("Todo", JSON.stringify(task));
    } catch (err) {
      console.log(err);
    }
  };
/* from local */
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("Todo");
      if (value !== null) {
        /* json.parse convert json into  object */
        const valueParse = JSON.parse(value);
        console.log("Retreive: ", valueParse);
        setTasks(valueParse);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
    storeData([...tasks, task]);
  };

  const deleteTask = (deleteIndex) => {
    setTasks(tasks.filter((value, index) => index !== deleteIndex));
    const updatedTasks = tasks.filter((value, index) => index !== deleteIndex);
    storeData(updatedTasks);
    deleteTaskFromLocal()
  };

  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
      <Text style={styles.heading}>LIST</Text>
       
        <ScrollView style={styles.scrollView}>
          {tasks.map((task, index) => (
            <View key={index} style={styles.taskContainer}>
              <TaskItem
                index={index + 1}
                task={task}
                deleteTask={() => deleteTask(index)}
              />
            </View>
          ))}
        </ScrollView>
        <TaskInputField addTask={addTask} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  heading: {
    color: "gray",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 20,
    top:25,
    left:3,
    textAlign:'center',
  },
  scrollView: {
    marginBottom: 100,
    top:20
  },
  taskContainer: {
    marginTop: 20,
  },
});
