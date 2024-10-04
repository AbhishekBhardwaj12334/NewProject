import { View, Text, ImageBackground, Image, StatusBar, TouchableOpacity } from 'react-native'
import React from 'react';
import Font from '../../src/fonts/fonts';
import DynamicCardGrid from './dynamicCards';
import Fonts from '../../src/fonts/fonts'
const AllWork = ({navigation}) => {
    const handleMyWork = () => {
        navigation.navigate('BottomNavigation')
    }
    return (
        <View style={{flex:1}}>
            <ImageBackground
                source={require('../../assets/images/screenbackground.png')}
                style={{flex:1}}
            >
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
                <View style={{paddingHorizontal:15,paddingTop:30}}>
                    <View style={{paddingBottom:10}}>
                        <Image
                            source={require('../../assets/images/cilioLogo.png')}
                            style={{height:40,width:80,resizeMode:'contain'}}
                        />
                    </View>
                    <View 
                        style={{ backgroundColor:'white',paddingHorizontal:15,paddingVertical:10,flexDirection:'row', alignItems:'center',borderRadius:8}}>
                        <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
                            <Image
                                source={require('../../assets/icons/Group66.png')}
                                style={{width:70,height:70}}
                            />
                            <View style={{flex:1,left:4}}>
                                <Text style={{color:'black',fontSize:17,fontFamily:Font.FONTS_BOLD,}}>David Brass</Text>
                                <Text style={{fontSize:10,color:'black',fontFamily:Font.FONTS_MEDIUM,bottom:4}} numberOfLines={2}>Cilio Fabrication Administrator Role</Text>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={handleMyWork}
                                style={{backgroundColor:'#C5EAFF',flexDirection:'row',paddingHorizontal:9,paddingVertical:3,
                                borderRadius:5,alignItems:'center'}}
                            >
                                <Text style={{color:'#016FE6',fontFamily:Font.FONTS_MEDIUM}}>My Work</Text>
                                <Image
                                    source={require('../../assets/icons/iconarrowright.png')}
                                    style={{resizeMode:'contain'}}
                                />
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    
                </View>
                <View 
                    style={{flex:1,backgroundColor:'white',marginVertical:20,paddingHorizontal:15,paddingTop:8}}>
                    <Text style={{fontSize:17,fontFamily:Fonts.FONTS_BOLD,color:'black'}}>Find Jobs by Types</Text>
                    <DynamicCardGrid/>
                </View>
            </ImageBackground>
        </View>
    )
}
export default AllWork;