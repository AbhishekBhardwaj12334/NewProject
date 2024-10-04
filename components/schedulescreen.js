import React from "react";
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Calendar from "./calender";

const ScheduleScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxHeight: 100, paddingTop: 30, paddingHorizontal: 20 }}>
          <Image
            source={require('../assets/images/cilioLogo.png')}
            style={{ width: '30%', height: '80%' }}
          />
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/mapLocation.png')}
              style={{ width: '9%', height: '45%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 10, borderTopRightRadius: 10, }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Calendar />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
export default ScheduleScreen;