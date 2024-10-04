import React, { useState } from "react";
import { View, Text, ImageBackground, Image, Touchable, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Fonts from "../src/fonts/fonts";

const WorkYesterday = () => {

  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [showAdditionalContent1, setShowAdditionalContent1] = useState(false);

  const handleImageClick = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };
  const handleImageClick1 = () => {
    setShowAdditionalContent1(!showAdditionalContent1);
  }

  const [isPressed, setIsPressed] = useState(false);

  const handleSchedule = () => {
    setIsPressed(!isPressed)
    console.warn('Schedule Pressed')
  }

  return (
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <View style={styles.view1}>
        <Text style={styles.textEntered1}>
          Tommorow's Work
        </Text>
        {/* <TouchableOpacity
          onPress={handleSchedule}
        >
          <Image source={require('../assets/icons/iconcalender.png')} style={styles.image1} />
        </TouchableOpacity> */}
      </View>
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.view2}>
        <View style={styles.view9}>
          <Text style={{ fontSize:15,color: 'white', fontFamily: Fonts.FONTS_REGULAR }}>
            Schedule
          </Text>
        </View>
          <View style={styles.view3}>
            <Text style={styles.textEntered2}>Name :</Text>
            <Text style={styles.textEntered3}>Trippet,Anne</Text>
          </View>
          <View style={styles.view4}>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={styles.textEntered2}>Crew Pay :</Text>
            <Text style={styles.textEntered3}>$40,000</Text>
            </View>            
            <TouchableOpacity onPress={handleImageClick}
              // style={{bottom:14}}
            >
            <Image 
                source={showAdditionalContent ?require('../assets/icons/upIcon.png'): require('../assets/icons/downIcon.png')} style={styles.image3} 
              />
            </TouchableOpacity>
            </View>
          {showAdditionalContent && (
            <View style={{ flex: 1 }}>
              <View style={styles.view4}>
                <Text style={styles.textEntered2}>Labour Category :</Text>
                <Text style={styles.textEntered3}>Trippet,Anne</Text>
              </View>
              <Text numberOfLines={1} style={styles.lineStyle}>
                -------------------------------------------------------------------------------
              </Text>
              <View style={styles.view4}>
                <Text style={styles.textEntered2}>Company :</Text>
                <Text style={styles.textEntered3}>Cilio Fabrication Demo Account</Text>
              </View>
              <Text numberOfLines={1} style={styles.lineStyle}>
                -------------------------------------------------------------------------------
              </Text>
              <View style={styles.view5}>
                <Text style={styles.textEntered4}>Scope of work</Text>
                <View style={styles.view6}>
                  <Image source={require('../assets/icons/Group42.png')} style={styles.image2} />
                  <Text style={styles.textEntered5}>Duration:2 Hours</Text>
                </View>

              </View>
              <View style={styles.view7}>
                <Text style={styles.textEntered6}>
                  The test follow up date button was hit by this individual Harshit Saxena. Description. test follow up date
                </Text>
              </View>
            </View>
          )}
          
        </View>

        <View style={styles.view8}>
        <View style={styles.view9}>
          <Text style={{ fontSize:15,color: 'white', fontFamily: Fonts.FONTS_REGULAR }}>
            Schedule
          </Text>
        </View>
          <View style={styles.view3}>
            <Text style={styles.textEntered2}>Name :</Text>
            <Text style={styles.textEntered3}>Trippet,Anne</Text>
          </View>
          <View style={styles.view4}>
            <View style={{flex:1,flexDirection:'row'}}>
            <Text style={styles.textEntered2}>Crew Pay :</Text>
            <Text style={styles.textEntered3}>$40,000</Text>
            </View>            
            <TouchableOpacity onPress={handleImageClick1}
              // style={{bottom:14}}
            >
            <Image 
                source={showAdditionalContent1 ?require('../assets/icons/upIcon.png'): require('../assets/icons/downIcon.png')} style={styles.image3} 
              />
            </TouchableOpacity>
            </View>
          {showAdditionalContent1 && (
            <View style={{ flex: 1 }}>
              <View style={styles.view4}>
                <Text style={styles.textEntered2}>Labour Category :</Text>
                <Text style={styles.textEntered3}>Trippet,Anne</Text>
              </View>
              <Text numberOfLines={1} style={styles.lineStyle}>
                -------------------------------------------------------------------------------
              </Text>
              <View style={styles.view4}>
                <Text style={styles.textEntered2}>Company :</Text>
                <Text style={styles.textEntered3}>Cilio Fabrication Demo Account</Text>
              </View>
              <Text numberOfLines={1} style={styles.lineStyle}>
                -------------------------------------------------------------------------------
              </Text>
              <View style={styles.view5}>
                <Text style={styles.textEntered4}>Scope of work</Text>
                <View style={styles.view6}>
                  <Image source={require('../assets/icons/Group42.png')} style={styles.image2} />
                  <Text style={styles.textEntered5}>Duration:2 Hours</Text>
                </View>

              </View>
              <View style={styles.view7}>
                <Text style={styles.textEntered6}>
                  The test follow up date button was hit by this individual Harshit Saxena. Description. test follow up date
                </Text>
              </View>
            </View>
          )}
                 </View>
      </KeyboardAwareScrollView>
    </View>

  )
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  textEntered1: {
    fontSize: 22,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black',
    // paddingTop: 30,
  },
  image1: {
    width: 24,
    height: 26,
    marginRight: 10
  },
  view2: {
    flex: 1,
    backgroundColor: '#D1F8FB',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10
  },
  view9:{
    marginTop:-10,
    padding:2, 
    backgroundColor: '#E37F15', 
    borderTopRightRadius: 16,
    borderBottomStartRadius:16, 
    alignSelf: 'flex-end',
    width:140,
    alignItems:"center",
    marginBottom:-10,
    marginRight:-10
  },
  view8: {
    flex: 1,
    backgroundColor: '#D1F8FB',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
  },
  view3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 5
  },
  view4: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingBottom: 0,
    marginBottom: 0
  },
  textEntered2: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black'
  },
  textEntered3: {
    fontSize: 15,
    paddingLeft: 10,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black'
  },
  lineStyle: {
    color: '#ECEDE6',
    paddingTop: 0,
    textAlign: 'center',
    marginTop: 0
  },
  view5: {
    flex: 1,
    paddingTop: 8,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textEntered4: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR
  },
  view6: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 100
  },
  image2: {
    width: 15,
    height: 15,
    marginRight: 2,
    marginTop: 2
  },
  textEntered5: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR,
    color: '#4899F1'
  },
  view7: {
    flex: 1,
    marginTop: 7,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 15
  },
  textEntered6: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black'
  },
  image3: {
    width: 25,
    height: 25,
    // marginLeft:150,
    resizeMode:'contain'
  }
})
export default WorkYesterday;