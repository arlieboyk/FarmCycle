import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
//screens
import Details from "../screens/Details";
import Dashboard from "../screens/Dashboard";
import Home from "../screens/Home";

const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";
const dashboardName = "Dashboard";

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarShowLabel: true,
        headerShown: false,
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarActiveTintColor: "#ff5733",
        tabBarInactiveTintColor: "#5cc46c",
   
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "list" : "list-sharp";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (rn === detailsName) {
            iconName = focused ? "information-outline" : "information-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (rn === settingsName) {
            iconName = focused ? "settings" : "settings-outline";
          } else if (rn === dashboardName) {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          }

          // You can return any component that you like here!
        },
      })}
    >
      <Tab.Screen name={dashboardName} component={Dashboard} />
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={detailsName} component={Details} />
    </Tab.Navigator>
  );
}
