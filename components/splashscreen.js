import React, { useEffect } from "react";
import { View, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.navigate('JobDetailsPage')
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Image source={require('../assets/images/SplashScreen1.png')} style={{ flex: 1, width: '100%', height: '100%' }} />
    </View>
  )
}
export default SplashScreen;