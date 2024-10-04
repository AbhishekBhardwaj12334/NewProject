import React, { useRef, useState } from "react";
import { ImageBackground, StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard, keyboardType, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Fonts from '../src/fonts/fonts';
// import OTPInputView from '@twotalltotems/react-native-otp-input'

const OTPValidation = ({ route, navigation }) => {
  const UserID = route?.params?.UserID;

  const et1 = useRef();
  const et2 = useRef();
  const et3 = useRef();
  const et4 = useRef();
  const et5 = useRef();
  const et6 = useRef();
  const et7 = useRef();

  const[f1, setF1]=useState('');
  const[f2, setF2]=useState('');
  const[f3, setF3]=useState('');
  const[f4, setF4]=useState('');
  const[f5, setF5]=useState('');
  const[f6, setF6]=useState('');
  const[f7, setF7]=useState('');
  const[error, setError]=useState('')

  let  otp ='1234567';
  enterdOTP = f1+f2+f3+f4+f5+f6+f7;

  const handleClear= ()=> {
    setF1('');
    setF2('');
    setF3('');
    setF4('');
    setF5('');
    setF6('');
    setF7('');
    setError('');
  }
  const handleVerifyOTP= ()=> {
    if(enterdOTP!==otp){
      setError('Enterd OTP is incorrect')
      return
    }else{
      console.warn('Submission Successful')
    }
    handleClear();
    Keyboard.dismiss();
    navigation.navigate('ResetPassword Page')
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
              <TextInput style={styles.userTab}
                placeholder="Enter UserID" placeholderTextColor={'grey'}
                editable={false}
                value={UserID}
                autoFocus={true}
              />
              <Text style={styles.content1}>We've sent a confirmation code to the E-mail address attached to this account </Text>
              <View style={styles.container}>
                <TextInput
                  ref={et1}
                  style={[
                    styles.inputTab, 
                    {borderColor: f1.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f1}
                  onChangeText={txt=>{
                    setF1(txt);
                    if(txt.length>=1) {
                      et2.current.focus();
                    }
                  }}
                />
                <TextInput
                  ref={et2}
                  style={[
                    styles.inputTab, 
                    {borderColor: f2.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f2}
                  onChangeText={txt=> {
                    setF2(txt);
                    if(txt.length>=1) {
                      et3.current.focus();
                    }else if(txt.length< 1){
                      et1.current.focus();
                    }
                  }}
                />
                <TextInput
                  ref={et3}
                  style={[
                    styles.inputTab, 
                    {borderColor: f3.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f3}
                  onChangeText={txt=>{
                    setF3(txt);
                    if(txt.length>=1) {
                      et4.current.focus();
                    }else if(txt.length< 1){
                      et2.current.focus();
                    }
                  }}
                />
                <TextInput
                  ref={et4}
                  style={[
                    styles.inputTab, 
                    {borderColor: f4.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f4}
                  onChangeText={txt=>{
                    setF4(txt);
                    if(txt.length>=1) {
                      et5.current.focus();
                    }else if(txt.length< 1){
                      et3.current.focus();
                    }
                  }}
                />
                <TextInput
                  ref={et5}
                  style={[
                    styles.inputTab, 
                    {borderColor: f5.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f5}
                  onChangeText={txt=>{
                    setF5(txt);
                    if(txt.length>=1) {
                      et6.current.focus();
                    }else if(txt.length< 1){
                      et4.current.focus();
                    }
                  }}
                />
                <TextInput
                  ref={et6}
                  style={[
                    styles.inputTab, 
                    {borderColor: f6.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f6}
                  onChangeText={txt=>{
                    setF6(txt);
                    if(txt.length>=1) {
                      et7.current.focus();
                    }else if(txt.length< 1){
                      et5.current.focus();
                    }
                  }}
                />
                <TextInput
                  ref={et7}
                  style={[
                    styles.inputTab, 
                    {borderColor: f7.length>=1? '#242121':'#999494'}
                  ]}
                  keyboardType='number-pad'
                  maxLength={1}
                  value={f7}
                  onChangeText={txt=>{
                    setF7(txt);
                    if(txt.length>=1) {
                      et7.current.focus();
                    }else if(txt.length< 1){
                      et6.current.focus();                   
                    }
                  }}
                />
                </View>
                <View style={styles.errorContainer}>
                  {error ? <Text style={styles.errorDisplay}>{error}</Text> : null}
                </View>  
            </View>
          </KeyboardAwareScrollView >
          <View style={styles.buttonStyles}>
            <TouchableOpacity
              disabled={
                f1!=='' && 
                f2!=='' && 
                f3!=='' && 
                f4!=='' && 
                f5!=='' && 
                f6!=='' && 
                f7!==''
                ?false:true
              }
              style={[
                styles.submitButton,
                { backgroundColor: 
                  f1!=='' && 
                  f2!=='' && 
                  f3!=='' && 
                  f4!=='' && 
                  f5!=='' && 
                  f6!=='' && 
                  f7!==''
                  ?'orange':'grey' },
              ]}
              onPress={ handleVerifyOTP }
              activeOpacity={0.8}
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
  userTab: {
    fontSize: 18,
    color: 'rgb(0,0,0)',
    borderWidth: 2,
    borderColor: '#B8B2B0',
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#D8D3D3',
    borderRadius: 10,
    marginTop: 70,
  },
  content1: {
    paddingTop: 20,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black',
    marginBottom:20
  },
  container: {
    flex: 1,
    width: '100%',
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop:20
  },
  inputTab: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    alignContent:'flex-start',
    textAlign:'center',
    fontFamily:Fonts.FONTS_REGULAR,
    fontSize:16
  },
  errorContainer:{
    flex: 1,
    paddingTop:10
  },
  errorDisplay: {
    color: 'red',
    marginLeft: 10,
    fontSize: 18,
    borderWidth:1,
    borderColor:'red',
    backgroundColor:'#FF9696',
    paddingHorizontal:20,
    borderRadius: 10,
    paddingVertical:10,
    textAlign:'center'
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
   
  },

})


export default OTPValidation;