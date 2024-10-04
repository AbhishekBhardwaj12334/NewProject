import React, { useState } from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, TextInput, StyleSheet } from 'react-native';
import Fonts from "../src/fonts/fonts";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserDataFetcher from "./userDatafetcher";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedInput from "./animateView";
import { useSelector } from "react-redux";


const MyAccount = ({ navigation }) => {
  const isloading = useState(true)
  const userData = useSelector((state) => state.userData.data);
  const loading = useSelector((state) => state.userData.loading);
  const handleBack = () => {
    navigation.navigate('MoreScreen')
  }

  const Fax = 'N/A';
  const Department = 'N/A';
  const CompanyName = 'N/A';
  const JobStartDate = '01-29-2024';
  const JobEndDate = '01-29-2024';



  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
      {loading ?
        <View style={{flex:1,paddingHorizontal:30,paddingTop:100}}>

          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={{height:80,width:80}}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={{left:100,bottom:30,fontSize: 18,fontFamily: Fonts.FONTS_BOLD,color: 'black'}}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
          <ShimmerPlaceholder
            visible={loading}
            LinearGradient={LinearGradient}
            style={styles.view9}
          />
        </View>
        :
        (<ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
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
              <Text style={{ fontSize: 35 }}>My Account</Text>
            </View>

          </View>
          <View style={styles.view3}>
            <KeyboardAwareScrollView >
              <View style={styles.view4}>
                <Text style={styles.text1}>General Information</Text>
                <View style={styles.view5}>
                  <Image
                    source={require('../assets/images/Rectangle43.png')}
                    style={styles.image2}
                  />
                  <View style={styles.view6}>
                    <Image
                      source={require('../assets/icons/Vector.png')}
                      style={{ borderRadius: 10, width: 20 }}
                    />
                  </View>
                  <View style={styles.view7}>
                    <Text style={styles.text2}>username</Text>
                    <Text style={styles.text3}>{userData?.user?.fullName}</Text>
                  </View>

                </View>
                <View
                  style={styles.view8}>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='First Name'
                      value={userData?.user?.firstName}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />

                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Last Name'
                      value={userData?.user?.lastName}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Email Address'
                      value={userData?.user?.email}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Address Two'
                      value={userData?.user?.address}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='State'
                      value={userData?.user?.state}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='ZIP'
                      value={userData?.user?.zip}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Phone'
                      value={userData?.user?.phone}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Fax'
                      value={Fax}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Job Title'
                      value={userData?.user?.roleName}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Department'
                      value={Department}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view9}>
                    <AnimatedInput
                      label='Company Name'
                      value={CompanyName}
                      editable={false}
                      containerStyles={styles.userInputContainer}
                    />
                  </View>
                  <View style={styles.view10}>
                    <AnimatedInput
                      label='Job Start Date'
                      value={JobStartDate}
                      editable={false}
                      containerStyles={styles.userInputContainer1}
                    />

                    <Image
                      source={require('../assets/icons/schedule.png')}
                      style={{ width: '9%', height: '62%', top: 6, left: 55 }}
                    />
                  </View>
                  <View style={styles.view10}>
                    <AnimatedInput
                      label='Job End Date'
                      value={JobEndDate}
                      editable={false}
                      containerStyles={styles.userInputContainer1}
                    />

                    <Image
                      source={require('../assets/icons/schedule.png')}
                      style={{ width: '9%', height: '62%', top: 6, left: 55 }}
                    />
                  </View>
                </View>
              </View>
            </KeyboardAwareScrollView>

          </View>
        </ImageBackground>
        )}
    </View>
  )
}
const styles = StyleSheet.create({
  view1: {
    flex: 1,
    maxHeight: 90
  },
  view2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  touchable1: {
    flex: 1,
    maxWidth: 20,
    marginRight: 30,
    top: 3,
    resizeMode:'contain'
  },
  image1: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginLeft: 10
  },
  view3: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 14,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 12
  },
  view4: {
    flex: 1,
    backgroundColor: '#F0F6FF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  text1: {
    fontSize: 18,
    fontFamily: Fonts.FONTS_REGULAR,
    color: '#498DEF'
  },
  view5: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  image2: {
    width: 120,
    height: 120,
    position: 'relative'
  },
  view6: {
    flex: 1,
    backgroundColor: '#8E78FF',
    alignItems: 'center',
    justifyContent: 'center',
    top: 75,
    left: 80,
    position: 'absolute',
    width: 25,
    heigth: 20,
    borderRadius: 10
  },
  view7: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
  },
  text2: {
    fontSize: 12,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black'
  },
  text3: {
    fontSize: 18,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black'
  },
  view8: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10
  },
  viewContent: {
    flex: 1,
    backgroundColor: 'white',
    maxHeight: 55,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(31, 36, 40, 0.30)',
    marginBottom: 30,
  },
  userInputContainer: {
    fontSize: 22,
    color: 'rgb(0,0,0)',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black'
  },
  userInputContainer1: {
    fontSize: 22,
    color: 'rgb(0,0,0)',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black',
    width: '70%'
  },
  view9: {
    flex: 1,
    backgroundColor: 'white',
    maxHeight: 55,
    borderWidth: 1,
    borderColor: 'rgba(31, 36, 40, 0.30)',
    borderRadius: 8,
    marginBottom: 20,
    width:'100%'
  },
  view10: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    maxHeight: 55,
    borderWidth: 1,
    borderColor: 'rgba(31, 36, 40, 0.30)',
    borderRadius: 8,
    marginBottom: 20
  },
})
export default MyAccount;

