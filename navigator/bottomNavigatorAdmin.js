import React from "react";
import { Image, Text, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllWork from "../components/dashboard/majorScreen";
import MoreScreen from "../components/morescreen";
import SearchComponentAdmin from "../components/dashboard/searchScreenAdmin";
import MoreScreenAdmin from "../components/dashboard/moreScreenAdmin";
const Bottom = createBottomTabNavigator();

const { height } = Dimensions.get("window");

const BottomNavigatorAdmin = () => {
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
                component={AllWork}
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
                component={SearchComponentAdmin}
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
                name='MoreScreen'
                component={MoreScreenAdmin}
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
                }}
            />
        </Bottom.Navigator>
    )
}
export default BottomNavigatorAdmin;
