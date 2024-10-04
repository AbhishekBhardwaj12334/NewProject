import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, keyboardType, Alert, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Fonts from '../src/fonts/fonts';

const ResetPassword = ({ navigation }) => {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [error, setError] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowPassword2 = () => {
    setShowconfirmPassword(!showconfirmPassword);
  }
  passwordRegex= /^(?=.*\d)(?=.*\W)(?=.*[a-zA-Z]).{8,}$/
  const handleSubmit = () => {
    if (!passwordRegex.test(password)){
      setError('Password must be atleast 8 characters long and alphanumeric')
      return
    }else if(confirmPass!== password){
      setError(`Password and confirm password doesn't match`)
      return
    }else {
      Alert.alert(`Success,Your password has been succesfully changed`)
      navigation.navigate('Login');
    }
    
  }
  return (
    <View style={styles.headerView}>
      <ImageBackground style={{ flex: 1, width: '100%' }} source={require('./../assets/images/loginbackground.png')}>
        <View style={styles.parentView}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}  
          >
            <View style={styles.content1View}>
              <Text style={styles.heading}>Forgot Password</Text>
              <Text style={styles.textEntered3}>NewPassword</Text>
              <View style={styles.inputWrapper}>
                <TextInput style={styles.passwordInput}
                  placeholder='New Password'
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry={!showNewPassword}
                  value={password}
                  autoFocus={true}
                />
                <TouchableOpacity onPress={toggleShowPassword}>
                  <Image
                    source={showNewPassword ? require('./../assets/icons/eye.png') : require('./../assets/icons/no-eye.png')}
                    style={styles.eyeImage}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.textEntered4}>ConfirmPassword</Text>
              <View style={[
                styles.inputWrapper,
                { borderColor: confirmPass !== password ? 'red' : 'green' }
              ]}>
                <TextInput style={styles.passwordInput}
                  placeholder='Confirm Password'
                  onChangeText={(text) => setConfirmPass(text)}
                  secureTextEntry={!showconfirmPassword}
                  value={confirmPass}
                  autoFocus={true}
                />
                <TouchableOpacity onPress={toggleShowPassword2}>
                  <Image
                    source={showconfirmPassword ? require('./../assets/icons/eye.png') : require('./../assets/icons/no-eye.png')}
                    style={styles.eyeImage}
                  />
                </TouchableOpacity>
              </View>
              {error?<Text style={styles.errorDisplay}>{error}</Text>:null}
            </View>
          </KeyboardAwareScrollView>
          <View style={styles.buttonStyles}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                { backgroundColor: password!=='' && confirmPass !=='' ? 'orange':'grey'  },
              ]}
              onPress={!password && !confirmPass ? null : handleSubmit}
              activeOpacity={0.8}
              disabled={password!=='' && confirmPass !==''?false:true}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
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
  textEntered3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    fontSize: 18,
    color: 'grey',
    fontFamily: Fonts.FONTS_MEDIUM,
    paddingTop: 50
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
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: '#B8B2B0',
    marginTop: 0,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  eyeIcon: {
    //position: 'absolute',
    right: 36,
    top: 155
  },
  eyeImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  textEntered4: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    fontSize: 18,
    color: 'grey',
    fontFamily: Fonts.FONTS_MEDIUM,
    paddingTop: 0
  },
  errorDisplay: {
    color: 'red',
    marginLeft: 10,
    fontSize: 15,
    borderWidth:1,
    borderColor:'red',
    backgroundColor:'#F79D9D',
    paddingVertical: 10,
    borderRadius:10,
    paddingLeft:5
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
    fontSize: 18,
    fontFamily: Fonts.FONTS_BOLD,
    textAlign: 'center',
    
  }
})

export default ResetPassword;