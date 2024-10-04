import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, Image, Touchable, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, ScrollView, ActivityIndicator, BackHandler } from 'react-native';
import Fonts from "../src/fonts/fonts";
import WorkTommorow from "./tommorow'swork";
import WorkToday from "./today'swork";
import WorkYesterday from "./yesterday'swork";
// import UserDataFetcher from "./userDatafetcher";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from "./redux/userDataSlice";
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

// const ShimmerPlaceholder = () => (
//   <LinearGraident
//     colors={["#e0e0e0", "#c0c0c0", "#e0e0e0"]}
//     style={styles.shimmer}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 0 }}
//   />
// );


const HomeScreen = ({navigation}) => {
  const isloading = useState(true)
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.data);
  const loading = useSelector((state) => state.userData.loading)

  useEffect(() => {
    dispatch(fetchUserData(2));
  }, [dispatch]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      BackHandler.exitApp();
      return true;
    });

    return () => backHandler.remove();
  }, []);


  const [selectedComponent, setSelectedComponent] = useState('component1');

  const [showContent1, setShowContent1] = useState(true);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);


  const handlePress = (component) => {
    setSelectedComponent(component);
    setShowContent1(component === 'component1');
    setShowContent2(component === 'component2');
    setShowContent3(component === 'component3');
  };
  const isComponentSelected = (component) => {
    return selectedComponent === component;
  };

  const handleView = () => {
    navigation.navigate('AdminNavigator')
  }

  const handleRefresh = () => {
    console.warn('Refresh Pressed')
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
          <View style={[styles.view1, { paddingTop: 120 }]}>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', }}>
              <View style={styles.view3}>
                <ShimmerPlaceholder
                  visible={loading}
                  LinearGradient={LinearGradient}
                  style={[styles.image1, { borderRadius: 8 }]}
                />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                  <ShimmerPlaceholder
                    visible={loading}
                    LinearGradient={LinearGradient}
                    style={styles.textEntered1}
                  />
                  <ShimmerPlaceholder
                    visible={loading}
                    LinearGradient={LinearGradient}
                    style={[styles.textEntered2, { paddingTop: 5 }]}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.view4, { marginTop: 20 }]}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', maxHeight: 440, paddingHorizontal: 12, paddingVertical: 30 }}>
              <ShimmerPlaceholder
                visible={loading}
                LinearGradient={LinearGradient}
                style={[styles.imageContainer]}
              />
              <View style={styles.view6}>
                <ShimmerPlaceholder
                  visible={loading}
                  LinearGradient={LinearGradient}
                  style={styles.imageContainer1}
                />
                <ShimmerPlaceholder
                  visible={loading}
                  LinearGradient={LinearGradient}
                  style={styles.imageContainer1}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      ) :
        (<ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>

          <View style={{ paddingHorizontal: 15, paddingTop: 30,marginBottom:20}}>
            <View style={{ paddingBottom: 10 }}>
              <Image
                source={require('../assets/images/cilioLogo.png')}
                style={{ height: 40, width: 80, resizeMode: 'contain' }}
              />
            </View>
            <View
              style={{ backgroundColor: 'white', paddingHorizontal: 15, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', borderRadius: 8 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={require('../assets/icons/Group66.png')}
                  style={{ width: 70, height: 70 }}
                />
                <View style={{ flex: 1, left: 4 }}>
                  <Text style={{ color: 'black', fontSize: 17, fontFamily: Fonts.FONTS_BOLD, }}>{userData?.user?.fullName}</Text>
                  <Text style={{ fontSize: 10, color: 'black', fontFamily: Fonts.FONTS_MEDIUM, bottom: 4 }} numberOfLines={2}>{userData?.user?.roleName}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleView}
                  style={{
                    backgroundColor: '#C5EAFF', flexDirection: 'row', paddingHorizontal: 9, paddingVertical: 3,
                    borderRadius: 5, alignItems: 'center'
                  }}
                >
                  <Text style={{ color: '#016FE6', fontFamily: Fonts.FONTS_MEDIUM }}>View All Work</Text>
                  <Image
                    source={require('../assets/icons/iconarrowright.png')}
                    style={{ resizeMode: 'contain' }}
                  />
                </TouchableOpacity>
              </View>

            </View>

          </View>

          <ScrollView style={{ flex: 1 }}>
            <View style={styles.view4}>
              <View style={styles.view7}>
                <Text style={styles.textEntered3}>
                  My Work
                </Text>
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                  onPress={handleRefresh}
                >
                  <Text style={styles.textEntered5}>Refresh</Text>
                  <Image source={require('../assets/images/refreshicon.png')} style={{ width: 18, height: 15, marginTop: 5, marginLeft: 5 }} />
                </TouchableOpacity>

              </View>
              <View style={styles.view5}>
                <TouchableWithoutFeedback
                  onPress={() => handlePress('component1')}
                >
                  <View style={[
                    styles.imageContainer,
                    isComponentSelected('component1') && { borderColor: 'orange', borderWidth: 4 },
                  ]}>
                    <ImageBackground source={isComponentSelected('component1') ? require('../assets/images/TodayWorkS.png') : require('../assets/images/TodayWorkNS.png')} style={styles.backgroundImage1} resizeMode='stretch'>


                      <Text style={[
                        styles.textInserted,
                        !isComponentSelected('component1') && { color: '#004590' },
                        isComponentSelected('component1') && { color: '#FFF' },
                      ]}>Today's Work</Text>
                      <Image source={require('../assets/icons/CIOGoTodayImage.png')} style={styles.image2} />
                    </ImageBackground>
                  </View>
                </TouchableWithoutFeedback>
                <View style={styles.view6}>
                  <TouchableWithoutFeedback
                    onPress={() => handlePress('component2')}
                  >
                    <View style={[
                      styles.imageContainer1,
                      isComponentSelected('component2') && { borderColor: 'orange', borderWidth: 4 },
                    ]}>
                      <ImageBackground source={isComponentSelected('component2') ? require('../assets/images/Yesterday&TodayS.png') : require('../assets/images/Yesterday&TodayNS.png')} style={styles.backgroundImage2}
                        resizeMode='stretch'
                      >

                        <Text style={[
                          styles.textInserted,
                          !isComponentSelected('component2') && { color: '#004590' },
                          isComponentSelected('component2') && { color: '#FFF' },]}>Tommorow's Work</Text>
                        <Image source={require('../assets/icons/ciliogoTomorrowWork.png')} style={styles.image3} />
                      </ImageBackground>
                    </View>
                  </TouchableWithoutFeedback>


                  <TouchableWithoutFeedback
                    onPress={() => handlePress('component3')}
                  >
                    <View style={[
                      styles.imageContainer1,
                      isComponentSelected('component3') && { borderColor: 'orange', borderWidth: 4 },
                    ]}>
                      <ImageBackground source={isComponentSelected('component3') ? require('../assets/images/Yesterday&TodayS.png') : require('../assets/images/Yesterday&TodayNS.png')} style={styles.backgroundImage2}
                        resizeMode='stretch'
                      >
                        <View style={{flex:1}}>
                          <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={[
                          styles.textInserted,
                          !isComponentSelected('component3') && { color: '#004590' },
                          isComponentSelected('component3') && { color: '#FFF' },]}>Yesterday's Work
                        </Text>
                        <Image
                        source={require('../assets/icons/arrowRight.png')}
                        style={[{height: 10, width: 10, resizeMode: 'contain',tintColor:'#FFF'}, ]}
                    />
                        </View>
                        <View style={{bottom:20,}}>
                        <Text style={{paddingHorizontal:10,fontSize:18,fontFamily:Fonts.FONTS_MEDIUM}}>2</Text>
                        </View>
                        <Image source={require('../assets/icons/ciliogoyesterdayWork.png')} style={styles.image4} />
                        </View>
                      </ImageBackground>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                {showContent1 &&
                  <WorkToday />
                }
                {showContent2 &&
                  <WorkTommorow />
                }
                {showContent3 &&
                  <WorkYesterday />
                }
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  view1: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 20,
    marginBottom: 0,
    maxHeight: 240
  },
  view2: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    maxHeight: 110
  },
  view3: {
    flex: 1,
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  image1: {
    width: 80,
    height: 80,
    marginHorizontal: 10,
    marginVertical: 15
  },
  viewCilio: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    marginHorizontal: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
    backgroundColor: '#C5EAFF',
    borderRadius: 8,
    maxHeight: 35,
    marginLeft: 30
  },
  textEntered1: {
    fontFamily: Fonts.FONTS_BOLD,
    fontSize: 17,
    color: 'black',
    paddingBottom: 0
  },
  textEntered2: {
    fontFamily: Fonts.FONTS_BOLD,
    fontSize: 12,
    color: 'grey',
    paddingTop: 0
  },
  view4: {
    // flex: 1,
    backgroundColor: 'white',
    paddingTop: 0,
    borderRadius: 25,
  },
  textEntered3: {
    fontSize: 24,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black',
  },
  textEntered4: {
    fontSize: 22,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black'
  },
  textEntered5: {
    fontSize: 16,
    fontFamily: Fonts.FONTS_MEDIUM,
    paddingTop: 5,
    // paddingLeft: 8,
    color: '#4899F1',
    // paddingLeft: 160
  },
  view5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    minHeight: 200,
    paddingHorizontal: 12,
    paddingBottom: 30
  },
  imageContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: 'transparent',
    height: '100%',
    width: '48%',
    marginRight: 8

  },
  backgroundImage1: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    background: '#498DEF'
  },
  image2: {
    width: 160,
    height: 120,
    marginTop: 90
  },
  view6: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  view7: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // maxHeight: 70,
    alignItems: 'center'
  },
  backgroundImage2: {
    flex: 1,
    height: '120%',
    width: '100%',
    borderRadius: 30,
    paddingBottom: 15
  },
  imageContainer1: {
    borderRadius: 30,
    overflow: 'hidden',
    borderColor: 'transparent',
    height: '48%',
    width: '97%'
  },
  image3: {
    width: 90,
    height: 90,
    marginLeft: 80,
    marginTop: -10
  },
  backgroundImage3: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderRadius: 30
  },
  image4: {
    width: 90,
    height: 90,
    marginLeft: 75,
    marginTop: -10
  },
  viewCilioTab: {
    fontSize: 15,
    textAlign: 'center',
    color: '#016FE6',
    fontFamily: Fonts.FONTS_REGULAR
  },
  textInserted: {
    fontSize: 13,
    paddingVertical: 20,
    paddingHorizontal: 10,
    fontFamily: Fonts.FONTS_MEDIUM,
  },
  image5: {
    width: 24,
    height: 24,
    marginRight: 6
  }

})
export default HomeScreen;