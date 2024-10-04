import React from "react";
import { Image, Text, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../components/homescreen";
import SearchComponent from "../components/searchscreen";
import ScheduleScreen from "../components/schedulescreen";
import MoreScreen from "../components/morescreen";
import Fonts from "../src/fonts/fonts"
const Bottom = createBottomTabNavigator();

const { height } = Dimensions.get("window");

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={() => ({
        headerShown: false,
        tabBarLabelStyle: { fontFamily: Fonts.FONTS_REGULAR, fontSize: 11, textAlign: 'center', paddingBottom: 1, alignItems: 'center', paddingTop: 0 },
        tabBarStyle: {
          height: Platform.OS === 'ios' ? height * 0.085 : height * 0.07
        }
      })}
    >
      <Bottom.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                source={require('../assets/icons/home.png')}
                style={{
                  width: 23,
                  height: 25,
                  tintColor: tabInfo.focused ? 'blue' : 'black'
                }}
              />
            )
          }
        }} />
      <Bottom.Screen
        name='Search'
        component={SearchComponent}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                source={require('../assets/icons/search.png')}
                style={{
                  width: 23,
                  height: 23,
                  tintColor: tabInfo.focused ? 'blue' : 'black'
                }}
              />
            )
          }
        }} />
      <Bottom.Screen
        name='Schedule'
        component={ScheduleScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                source={require('../assets/icons/schedule.png')}
                style={{
                  width: 24,
                  height: 26,
                  tintColor: tabInfo.focused ? 'blue' : 'black'
                }}
              />
            )
          }
        }} />
      <Bottom.Screen
        name='MoreScreen'
        component={MoreScreen}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Image
                source={require('../assets/icons/more.png')}
                style={{
                  width: 23,
                  height: 21,
                  tintColor: tabInfo.focused ? 'blue' : 'black'
                }}
              />
            )
          }
        }} />
    </Bottom.Navigator>
  )
}
export default BottomNavigator;