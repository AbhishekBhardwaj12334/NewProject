import {useEffect} from "react";
import { ImageBackground, Text, View, StatusBar, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Fonts from '../src/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData1 } from "./redux/terms&privacy1";

const TermsAndPrivacy = ({ navigation, route }) => {
  const terms = route?.params?.title
  const handleBack = () => {
    navigation.navigate('MoreScreen')
  }
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserData1());
      } catch (error) {
        // Handle errors if needed
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
    return () => {
      // Perform cleanup actions here (if any)
    };
  }, [dispatch]);
  const legalDisclamer = useSelector((state) => state.legalDisclamer);
  // console.log(legalDisclamer?.data?.privacyPolicy)
  const loading = useSelector((state) => state.legalDisclamer.loading)

 

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
            <Text style={styles.text1}>{terms}</Text>
          </View>
        </View>
        {terms === 'Privacy Policy' ?
          (<ScrollView style={styles.view3}>
            {/* {console.log("hsghsfgdh",legalDisclamer?.privacyPolicy)} */}
            <Text style={styles.text2}>{legalDisclamer?.data?.privacyPolicy}</Text>
          </ScrollView>
          ) : (
            <ScrollView style={styles.view3}>
              <Text style={styles.text2}>{legalDisclamer?.data?.termsAndConditions}</Text>
            </ScrollView>
          )}
      </ImageBackground>
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
    top: 3
  },
  image1: {
    width: 20,
    height: 100,
    resizeMode: 'contain',
    // marginLeft: 10
  },
  text1:{ 
    fontSize: 30, 
    fontFamily: Fonts.FONTS_REGULAR, 
    top: 7, 
    color: 'black' 
  },
  view3:{ 
    flex: 1, 
    paddingVertical: 10, 
    paddingHorizontal: 20 
  },
  text2:{
    fontSize:12,
    fontFamily:Fonts.FONTS_BOLD,
    color:'black'
  }

})
export default TermsAndPrivacy;