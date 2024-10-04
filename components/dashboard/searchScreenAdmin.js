import React, { useState } from "react";
import { View, ImageBackground, StatusBar, StyleSheet, Image, Text, TouchableOpacity, TextInput } from 'react-native';
import Fonts from '../../src/fonts/fonts';


const SearchComponentAdmin = ({navigation}) => {

  const handleSearch = () => {
    console.warn('Search Pressed');
    navigation.navigate('SearchMore');
  }
  const handleBasic =() => {
    navigation.navigate('BasicSearch')
  }
  const handleAdmin = () => {
    navigation.navigate('AdminSearch')
  }


  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
      <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
        <View style={styles.viewMain}>
          <View
            style={styles.view1}>
            <Image
              source={require('../../assets/images/cilioLogo.png')}
              style={styles.image1}
            />
            <View style={styles.view2}>
              {/* <Image
                source={require('../assets/icons/iconbell.png')}
                style={styles.image2}
              /> */}
              {/* <Text style={styles.text1}>9+</Text> */}
            </View>
          </View>
          <View 
            style={styles.view3}>
            <TouchableOpacity
              onPress={handleSearch} 
              style={styles.touchables}
            >
              <Text style={styles.text2}>Search....</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.view4}>
            <Image 
              source={require('../../assets/images/image2.png')}
              style={{width:400, height:300,left:40,top:20,resizeMode:'contain'}}
            />
            <Text style={{fontSize:17,fontFamily:Fonts.FONTS_MEDIUM,color:'black',top:10,textAlign:'center'}}>Find Jobs by Filters</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:10,paddingTop:20}}>
                <TouchableOpacity
                    style={{paddingVertical:10,flex:1,margin:10}}
                    onPress={handleBasic}
                >
                    <View style={{flexDirection:'row',backgroundColor:'#2D8AEE',paddingVertical:9,alignItems:'center',borderRadius:8,justifyContent:'center'}}>
                        <Image
                            source={require('../../assets/icons/BasicFilter.png')}
                            style={{width:18,height:18,resizeMode:'contain'}}
                        />
                        <Text style={{fontSize:18,left:5,color:'white',bottom:2}}>Basic</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{paddingVertical:10,flex:1,margin:10}}
                    onPress={handleAdmin}
                >
                    <View style={{flexDirection:'row',backgroundColor:'#F9B116',paddingVertical:9,justifyContent:'center',borderRadius:8}}>
                        <Image
                            source={require('../../assets/icons/AdvanceFilter.png')}
                            style={{width:18,height:18,resizeMode:'contain'}}
                        />
                        <Text style={{fontSize:18,left:5,color:'white',bottom:2}}>Advanced</Text>
                    </View>
                </TouchableOpacity>

            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  viewMain:{ 
    flex: 1,
    paddingHorizontal: 15, 
  },
  view1: {
    // flex: 1,
    // flexDirection: 'row',
    paddingTop: 10,
    alignContent: 'center',
  },
  view2: { 
    flex: 1, 
    // maxWidth: 100, 
    // left: 180, 
    alignItems: 'center' 
  },
  image1: {
    width: 100,
    height: 100,
    resizeMode:'contain'
  },
  image2: {
    width: '35%',
    height: '50%',
    top: 25,
    position: 'relative',
    resizeMode: 'contain'
  },
  text1:{ 
    backgroundColor: 'blue', 
    width: 24, 
    height: 24, 
    textAlign: 'center', 
    borderRadius: 12, 
    position: 'absolute', 
    top: 16, 
    left: 47 
  },
  view3:{ 
    flex: 1,
     width:'100%', 
     paddingVertical: 10, 
    //  marginTop: 10,
    //  paddingHorizontal:10,
    maxHeight:80,
    bottom:15
  },
  touchables:{
    flex:1,
    height:'100%',
    // maxHeight:65,
    backgroundColor:'white',
    paddingHorizontal:10,
    borderColor:'#E2DBDC',
    borderWidth:1,
    borderRadius:8,
    justifyContent:'center'
  },
  text2:{
    fontSize:18,
    fontFamily:Fonts.FONTS_REGULAR,
    color:'#DCDCDC'
  },
  view4:{
    // flex:1,
    justifyContent:'center',
    // alignItems:'center',
    // left:70
  },
})

export default SearchComponentAdmin;