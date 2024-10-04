import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Keyboard, Image, TouchableOpacity, StatusBar } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Fonts from '../src/fonts/fonts';
import AnimatedInput from './animateView';
const LoginPage = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    setIsChecked(!isChecked)
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleForgotUsername = () => {
    console.warn('Forgot Username pressed');
  };

  const handleClear = () => {
    setUser('');
    setPassword('');
    setNameError('');
    setPasswordError('');
  }
  const userRegex = /^[a-zA-Z0-9]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z]).{8,}$/
  const handleLogin = () => {
    console.warn('Login pressed');
    if (!user.trim()) {
      setNameError('User name is required');
      return
    } else if ((!userRegex.test(user))) {
      setNameError('Invalid UserID');
      return
    } else {
      setNameError('')
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must be atleast 8 characters long and alphanumeric');
      return
    } else {
      setPasswordError('')
    }
    handleClear();
    Keyboard.dismiss();
    navigation.navigate('BottomNavigation')

  };
  return (

    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground style={{ flex: 2, width: '100%', resizeMode: 'contain' }} source={require('./../assets/images/loginbackground.png')}>
          <View style={styles.parentView}>
            <View style={styles.viewContent1}>
              <Text style={styles.textEntered1}>Welcome to CILIO</Text>
            </View>

            <View style={styles.contentWrapp1}>
              <View style={styles.view1}>
                <AnimatedInput
                  label="UserID"
                  value={user}
                  onChangeText={(text) => setUser(text)}
                  autoFocus={true}
                  containerStyles={styles.userInputContainer}
                />
              </View>
              
              <View
                style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white', maxHeight: 55, borderRadius: 8, borderWidth: 2, borderColor: 'rgba(31, 36, 40, 0.30)', marginBottom: 30 }}>
                <AnimatedInput
                  label="Password"
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  containerStyles={styles.userInputContainer1}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={toggleShowPassword}
                  style={{ flex: 1, maxHeight: 50, maxWidth: 50, alignItems: 'center', right: 20, top: 14 }}
                >
                  <Image
                    source={showPassword ? require('./../assets/icons/eye.png') : require('./../assets/icons/no-eye.png')}
                    style={styles.eyeImage}
                  />
                </TouchableOpacity>
              </View>
              {/* <View style={styles.viewContent3}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                </TouchableOpacity>
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={handleCheck} style={styles.checkbox}>
                    <Image
                      source={isChecked ? require('./../assets/icons/check.png') : require('./../assets/icons/empty-check.png')}
                      style={styles.checkboxImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.rememberMe}>Remember Me</Text>
                </View>
              </View> */}
              <View style={styles.viewContent4}>

                {/* <TouchableOpacity onPress={handleForgotUsername}>
                  <Text style={styles.forgotUsernameText}>Forgot Username</Text>
                </TouchableOpacity> */}
                {nameError ? <Text style={styles.errorDisplay}>{nameError}</Text> : null}
                {passwordError ? <Text style={styles.errorDisplay}>{passwordError}</Text> : null}
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>


            </View>

            {/* <View style={styles.contentWrapp}>
              <View style={styles.viewContent3}>
                <TouchableOpacity onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                </TouchableOpacity>
                <View style={styles.wrapper}>
                  <TouchableOpacity onPress={handleCheck} style={styles.checkbox}>
                    <Image
                      source={isChecked ? require('./../assets/icons/check.png') : require('./../assets/icons/empty-check.png')}
                      style={styles.checkboxImage}
                    />
                  </TouchableOpacity>
                  <Text style={styles.rememberMe}>Remember Me</Text>
                </View>
              </View>

              <View style={styles.viewContent4}>

                <TouchableOpacity onPress={handleForgotUsername}>
                  <Text style={styles.forgotUsernameText}>Forgot Username</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                  <Text style={styles.loginButtonText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View> */}
            <View style={styles.viewContent5}>
              <Text style={styles.footerElement}>&#169; 2023 Cilio CIO.All Rights Reserved</Text>
            </View>

          </View>

        </ImageBackground >
      </KeyboardAwareScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  parentView: {
    flexDirection: 'column',
    flex: 2
  },
  viewContent1: {
    flex: 1,
    paddingTop: 90,
    paddingLeft: 20,
    // maxHeight: 270
  },
  textEntered1: {
    fontSize: 48,
    color: 'white',
    fontFamily: Fonts.FONTS_BOLD,
  },
  contentWrapp1: {
    flex: 1,
    paddingHorizontal: 15,
    // backgroundColor:'white',
    paddingVertical: 10,
    paddingTop: 60
  },
  view1: {
    flex: 1,
    backgroundColor: 'white',
    maxHeight: 55,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(31, 36, 40, 0.30)',
    marginBottom: 30,
  },
  view2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    maxHeight: 55,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(31, 36, 40, 0.30)',
  },
  textEntered3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    margin: 0,
    fontSize: 18,
    color: 'grey',
    fontFamily: Fonts.FONTS_MEDIUM,
    paddingTop: 10,
  },
  textEntered4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    margin: 0,
    fontSize: 18,
    color: 'grey',
    fontFamily: Fonts.FONTS_MEDIUM,
  },
  userInputContainer: {
    fontSize: 22,
    color: 'rgb(0,0,0)',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'rgba(31, 36, 40, 0.30)'
  },
  userInputContainer1: {
    fontSize: 22,
    color: 'rgb(0,0,0)',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'rgba(31, 36, 40, 0.30)',
    width: '100%',
  },
  passwordInput: {
    flex: 1,
    fontSize: 18,
    color: 'rgb(0,0,0)',
    // borderWidth: 2,
    // borderColor: '#B8B2B0',
    // marginHorizontal: 20,
    // marginTop: 0,
    // marginBottom: 5,
    backgroundColor: 'white',
    // borderRadius: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderWidth: 2,
    borderColor: '#B8B2B0',
    // marginHorizontal: 20,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  eyeIcon: {
    //position: 'absolute',
    right: 46,
    top: 155
  },
  eyeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  errorDisplay: {
    color: 'red',
    marginHorizontal: 2,
    marginTop:50,
    fontSize: 16,
    marginTop: 0,
    textAlign:'center'
  },
  viewContent3: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 0,
    marginTop: 0
  },
  viewContent4: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 10,
    marginBottom: 0
  },
  forgotUsernameText: {
    fontSize: 18,
    // marginHorizontal: 7,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black',
    marginTop: 5
  },
  forgotPasswordText: {
    // paddingTop: 10,
    fontSize: 18,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black',
    // marginHorizontal: 7
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignContent: "flex-start",
    // paddingBottom: 10,
    // paddingLeft: 5

  },
  checkbox: {
    padding: 5,
    marginLeft: 18,
    bottom: 3

  },
  checkboxImage: {
    width: 20,
    height: 20,
  },
  rememberMe: {
    fontSize: 18,
    color: 'black',
    fontFamily: Fonts.FONTS_MEDIUM,
    bottom: 2
  },
  loginButton: {
    backgroundColor: 'orange',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 60,
    marginBottom: 10
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: Fonts.FONTS_BOLD,
    textAlign: 'center',

  },
  viewContent5: {
    flex: 1,
    marginTop: 0,
    padding: 6,
    maxHeight: 280
  },
  footerElement: {
    paddingTop: 150,
    textAlign: 'center',
    color: 'black',
    fontSize: 15
  },
  inputContainer: {
    fontSize: 30,
    color: 'rgb(0,0,0)',
    borderWidth: 2,
    borderColor: '#B8B2B0',
    paddingHorizontal: 20,
    marginTop: 0,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'rgba(31, 36, 40, 0.30)',
    height: 50
  },
})
export default LoginPage;