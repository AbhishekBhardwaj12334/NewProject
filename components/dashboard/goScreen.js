import React from "react";
import { View, ImageBackground, StatusBar, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
// import AdminSearch from "./adminSearch";

const GoComponent = ({ navigation }) => {
    const handleBack = () => {
        navigation.goBack('BasicScreen')
    }
    const handleAdvanceSearch = () => {
        navigation.navigate('AdminSearch')
    }
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/images/screenbackground.png')}
                style={{ flex: 1 }}
            >
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",paddingTop:30,paddingHorizontal:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={() => {handleBack()}}
                    >
                        <Image 
                            source={require('../../assets/icons/arrowright_.png')}
                            style={{width:20,height:20,resizeMode:'contain'}}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize: 28,fontFamily: Fonts.FONTS_MEDIUM,top: 4,color: 'black',left:10}}>Job List</Text>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity style={{right:25}}>
                            <Image
                                source={require('../../assets/icons/downloadicon.png')}
                                style={{width:20,height:20,resizeMode:'contain'}}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleAdvanceSearch}
                        >
                            <Image
                                source={require('../../assets/icons/AdvanceFilter.png')}
                                style={{width:20,height:20,resizeMode:'contain',tintColor:'black'}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,backgroundColor:'white',marginTop:20,borderTopLeftRadius:10,borderTopRightRadius:10,paddingTop:130}}>
                    <Image
                        source={require('../../assets/icons/nojobs.png')}
                        style={{width:350,height:350,left:17}}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}
export default GoComponent;