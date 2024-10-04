import React from "react";
import { ImageBackground, Text, View, StatusBar, StyleSheet,TouchableOpacity ,Image} from 'react-native';
import Fonts from '../src/fonts/fonts';

const PrivacyPolicy = ({navigation}) => {

  const handleBack = () => {
    navigation.navigate('MoreScreen')
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
      <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
        <View style={styles.view1}>
          <View style={styles.view2}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.touchable1}
            >
              <Image
                source={require('../assets/icons/arrowright_.png')}
                style={styles.image1}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 30,fontFamily:Fonts.FONTS_REGULAR,top:7,color:'black' }}>Privacy Policy</Text>
          </View>         
        </View>
        <View style={{flex:1,paddingVertical:10,paddingHorizontal:20}}>
            <Text style={{fontSize:16,fontFamily:Fonts.FONTS_REGULAR,color:'black'}}>This is the privacy policy</Text>
          </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  view1:{ 
    flex: 1, 
    maxHeight: 90 
  },
  view2:{ 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 20 
  },
  touchable1:{ 
    flex: 1, 
    maxWidth: 20, 
    marginRight: 30, 
    top: 3 
  },
  image1:{ 
    width: '100%', 
    height: '100%', 
    resizeMode: 'contain', 
    marginLeft: 10 
  },
})

export default PrivacyPolicy;