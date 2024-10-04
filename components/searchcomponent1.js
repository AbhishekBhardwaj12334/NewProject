import React, { useState } from "react";
import { ImageBackground, View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import Fonts from "../src/fonts/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


const SearchMoreComponent = ({navigation}) => {

  const handleBack = () => {
    if(textInput!=='') {
      setTextInput('');
      Keyboard.dismiss();
    } else {
      navigation.goBack('Search')
    }
  }

  const [textInput, setTextInput] = useState('');

  const handleTextInputChange = (text) => {
    setTextInput(text.trim());
  };

  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const [showAdditionalContent1, setShowAdditionalContent1] = useState(false);

  const handleImageClick = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };
  const handleImageClick1 = () => {
    setShowAdditionalContent1(!showAdditionalContent1);
  }

  const handleSearch = () => {
    if(textInput !== ''){
      setTextInput('');
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'white', maxHeight: 65, paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', marginTop: 50 }}>
          <TouchableOpacity 
            style={{ flex: 1, maxWidth: 30 }}
            onPress={handleBack}
          >
            <Image
              source={require('../assets/icons/arrowright_.png')}
              style={{ width: '60%', height: '40%', resizeMode: 'contain', marginLeft: 10 }}
            />
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: "row", }}>
            <TextInput style={styles.input1}
              placeholder="Search"
              onChangeText={handleTextInputChange}
              value={textInput}
            />
            <TouchableOpacity onPress={handleSearch}>
              <Image source={textInput == ''?require('../assets/icons/search.png'):require('../assets/icons/cutbutton.png')}
                style={{ width: 22, height: 22, right: 35, top: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {textInput !== '' ?
          <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView style={{ flex: 1 }}>
            <View style={[styles.view2, showAdditionalContent1 && styles.additionalContentBackground]}>
                <View style={styles.view9}>
                  <Text style={{ fontSize: 15, color: 'white', fontFamily: Fonts.FONTS_REGULAR }}>
                    Schedule
                  </Text>
                </View>
                <View style={styles.view3}>
                  <Text style={styles.textEntered2}>Name :</Text>
                  <Text style={styles.textEntered3}>Trippet,Anne</Text>
                </View>
                <View style={styles.view4}>
                  <Text style={styles.textEntered2}>Crew Pay :</Text>
                  <Text style={styles.textEntered3}>$40,000</Text>
                  <TouchableOpacity onPress={handleImageClick1}>
                    <Image
                      source={showAdditionalContent1 ? require('../assets/icons/upIcon.png') : require('../assets/icons/downIcon.png')} style={styles.image3}
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

              <View style={[styles.view8, showAdditionalContent && styles.additionalContentBackground1]}>
                <View style={styles.view9}>
                  <Text style={{ fontSize: 15, color: 'white', fontFamily: Fonts.FONTS_REGULAR }}>
                    Schedule
                  </Text>
                </View>
                <View style={styles.view3}>
                  <Text style={styles.textEntered2}>Name :</Text>
                  <Text style={styles.textEntered3}>Trippet,Anne</Text>
                </View>
                <View style={styles.view4}>
                  <Text style={styles.textEntered2}>Crew Pay :</Text>
                  <Text style={styles.textEntered3}>$40,000</Text>
                  <TouchableOpacity onPress={handleImageClick}>
                    <Image
                      source={showAdditionalContent ? require('../assets/icons/upIcon.png') : require('../assets/icons/downIcon.png')} style={styles.image3}
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
            </KeyboardAwareScrollView>
          </View>
          : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
            <Image
              source={require('../assets/images/Search1.png')}
              style={{ opacity: 1, width: '90%', height: '80%', resizeMode: 'contain' }}

            />
          </View>

        }


      </ImageBackground>
    </View>

  )
}
const styles = StyleSheet.create({
  view1: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 110,
    paddingHorizontal: 15,
    paddingTop: 60,
    alignContent: 'center',
    marginBottom: 10

  },
  image1: {
    width: '30%',
    height: '90%',
  },
  image2: {
    width: 25,
    height: 31,
    top: 16,
    left: 215,
    position: 'relative',
    resizeMode: 'contain'
  },
  text1: {
    flex: 1,
    position: 'absolute',
    top: 69,
    left: 354,
    fontSize: 12,
    backgroundColor: 'blue',
    width: 22,
    height: 20,
    textAlign: "center",
    borderRadius: 12,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'white'
  },
  input1: {
    flex: 1,
    fontSize: 18,
    color: 'rgb(0,0,0)',
    backgroundColor: 'white',
    marginLeft: 15,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }, view2: {
    flex: 1,
    backgroundColor: '#D1F8FB',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor:'blue',
    borderWidth:2
  },
  view9: {
    marginTop: -10,
    paddingHorizontal: 10,
    backgroundColor: 'blue',
    borderTopRightRadius: 14,
    borderBottomStartRadius: 16,
    alignSelf: 'flex-end',
    paddingVertical: 1,
    alignItems: "center",
    marginBottom: -10,
    marginRight: -15
  },
  view8: {
    flex: 1,
    backgroundColor: '#D1F8FB',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 20,
    borderColor:'blue',
    borderWidth:2
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
    flex: 1,
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
    width: 30,
    height: 24,
    marginLeft: 140
  },
  additionalContentBackground: {
    backgroundColor: 'white',
  },
  additionalContentBackground1: {
    backgroundColor: 'white',
  }
})
export default SearchMoreComponent;