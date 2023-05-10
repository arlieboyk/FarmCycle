import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  ImageBackground,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//screens
import bg from './assets/imgs/bg-green1.png'
import BottomNav from "./Navi/BottonNav";
import Fish from "./screens/subscreens/Fish";
import Plants from "./screens/subscreens/Plants";
import Chicken from "./screens/subscreens/Chicken";
import Phlvl from "./screens/subscreens/Phlvl";
import Temperature from "./screens/subscreens/Temperature";
import waterLvl from "./screens/subscreens/WaterLvl";

const Stack = createNativeStackNavigator();
export default function App() {

  return (
    //<ImageBackground source={localbg} resizeMode='contain'>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home1"
            component={BottomNav}
            options={{ title: "Welcome", headerShown: false }}
          />
          <Stack.Screen name="Fish" component={Fish} />
          <Stack.Screen name="Plants" component={Plants} />
          <Stack.Screen name="Chicken" component={Chicken} />
          <Stack.Screen name="Temperature" component={Temperature} />
          <Stack.Screen name="Phlvl" component={Phlvl} />
          <Stack.Screen name ="WaterLvl" component={waterLvl}/>
        </Stack.Navigator>
      </NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
