import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Fonts from '../src/fonts/fonts';

const ForgotpasswordPage = ({navigation}) => {
  const [userId, setUserId] = useState('');
  const [emailError, setEmailError] = useState('')
  const [isInputEmpty, setIsInputEmpty] = useState(true);

  const userRegex = /^[a-zA-Z0-9]+$/;
  
  const handleInputChange = (text) => {
    setUserId(text);
    setIsInputEmpty(text.trim() === '');
  };

  const handleClear = () => {
    setUserId('')
  }

  const handleSubmit = () => {
    if(!userId.trim) {
      setEmailError("UserID required")
    }
    else if (!userRegex.test(userId)) {
      setEmailError('Invalid UserID')
      return
    } else {
      setEmailError('');
    
      handleClear();
      Keyboard.dismiss();
      navigation.navigate('OTP Page', {
      UserID: userId
    })
  }
  }

  return (
    <View style={styles.headerView}>
      <ImageBackground style={{ flex: 1, width: '100%' }} source={require('./../assets/images/loginbackground.png')}>
        <View style={styles.parentView}>
          <KeyboardAwareScrollView 
            contentContainerStyle={{flex: 1}}
            showsVerticalScrollIndicator={false}
          >

            <View style={styles.content1View}>
              <Text style={styles.heading}>Forgot Password</Text>
              <Text style={styles.UserID}>UserID</Text>
              <TextInput style={styles.inputTab}
                placeholder="Enter UserID" placeholderTextColor={'grey'}
                onChangeText={handleInputChange}
                value={userId}
                autoFocus={true}
              />
              {emailError ? <Text style={styles.errorDisplay}>{emailError}</Text> : null}
            </View>
          </KeyboardAwareScrollView >
          <View style={styles.buttonStyles}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: isInputEmpty ? 'grey' : 'orange' },
              ]}
              onPress={isInputEmpty ? null : handleSubmit}
              activeOpacity={0.8}
              disabled={isInputEmpty}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  headerView: {
    flex: 1,
  },
  parentView: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    justifyContent: 'space-between'
  },
  content1View: {
    flex: 1,
  },

  heading: {
    fontSize: 45,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'white',
    paddingTop: 40
  },
  UserID: {
    fontSize: 18,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black',
    paddingTop: 80,
    paddingBottom: 0,
  },
  inputTab: {
    fontSize: 18,
    color: 'rgb(0,0,0)',
    borderWidth: 2,
    borderColor: '#B8B2B0',
    paddingHorizontal: 10,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  errorDisplay: {
    color: 'red',
    marginLeft: 10,
    fontSize: 18
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    margin: 27
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.FONTS_BOLD,
    textAlign: 'center',
    // Other text styles
  },

})

export default ForgotpasswordPage;