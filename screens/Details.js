import {
  View,
  Text,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  StatusBar,
  SafeAreaView,
} from "react-native";
import React from "react";
import bg from "../assets/imgs/bg-green-round.png";
export default function Details({ navigation }) {
  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={{ flex: 1, height: "100%", width: "100%" }}
    >
      <SafeAreaView style={styles.container}>
          <View style={styles.boxCon}>
            <View>
              <Text style={{fontWeight:'bold', fontSize:20}}>Details</Text>
            </View>
            <Text style={styles.contentFont}>
              <Text style={{marginLeft:25}}>  The Farmcycle </Text> is introducing hybrid farming with three specific
              sets of farming which are fish, chickecn, and plants.
            </Text>
            <Text style={styles.contentFont}>
                The FarmCycle aims to provide a life hack for farmers to reduce
              their workload in t erms of easy labor and monitoring of the farm
              without a physical presence on the farm.
            </Text>
          </View>

        
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    marginTop:20,
  },
  boxCon:{
    width:"95%",
     paddingHorizontal:10,
     paddingVertical: 50,
     backgroundColor:'white',
     borderRadius:7,
     shadowColor:'gray',
     elevation:20
  },
  contentFont:{
    fontSize:19,
    marginVertical:10,
    fontWeight:"300"
  }

});
//   boxCon: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     elevation: 20,
//     borderRadius: 7,
//     shadowColor: "black",
//     height: "auto",
//     width: "90%",
//     marginVertical: 20,
//   },
//   scrollView: {
//     backgroundColor: "pink",
//     width:'100%', 
//     justifyContent:'center',
//     alignItems:'center'

//   },
//   contentCon: {
//     flex: 1,
//     width: "90%",
//     justifyContent: "flex-start",
//     alignItems: "center",
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
  
//   font: {
//     fontSize: 24,
//     fontWeight: "500",
//     top: 40,
//   },
//   contentFont: {
//     textAlign: "center",
//     fontSize: 18,
//     fontWeight: "400",
//     marginVertical: 20,
//   },
// 
