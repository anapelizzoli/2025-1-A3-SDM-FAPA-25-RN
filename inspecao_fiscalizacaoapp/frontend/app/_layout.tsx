import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./(tabs)/HomeScreen";
import WelcomeScreen from "./(tabs)/WelcomeScreen";

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="WelcomeScreen" component={WelcomeScreen} />
    </Tab.Navigator>
  );
}
