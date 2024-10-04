import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image } from 'react-native';
import Fonts from '../../../src/fonts/fonts'

const FloorInterior = ({navigation,route}) =>{
    const{templateName} = route.params;
    const floorData = [
        { optionsId: '01', value: 'Entry/Foyer'},
        { optionsId: '02', value: 'Living Room'},
        { optionsId: '03', value: 'Dining Room'},
        { optionsId: '04', value: 'Family Room'},
        { optionsId: '05', value: 'Office'},
        { optionsId: '06', value: 'Kitchen'},        
    ];
    const handleBack = () => {
        navigation.goBack();
    }
    const handleClick = () => {
        // navigation.navigate('InteriorType',{templateName:templateName})
        navigation.navigate('InteriorType',{templateName:templateName})
    }
    const renderFloorInterior = ({ item }) => {
        return (
            <View style={{paddingHorizontal:10,margin:10}}>
            <TouchableOpacity
                style={{ paddingVertical: 20,backgroundColor:'black',borderRadius:8,paddingHorizontal:15,}}
                onPress={handleClick}
            >
                <Text style={{ fontSize: 16,color:'white',color:'white'  }}>{item.value}</Text>
            </TouchableOpacity>
            </View>
        );
    };


    return ( 
        <View style={{flex:1,backgroundColor:"#4899F1"}}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:"center",paddingTop:30,paddingHorizontal:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <TouchableOpacity
                        onPress={() => {handleBack()}}
                    >
                        <Image 
                            source={require('../../../assets/icons/arrowright_.png')}
                            style={{width:20,height:20,resizeMode:'contain'}}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize: 28,fontFamily: Fonts.FONTS_MEDIUM,top: 4,color: 'black',left:10}}>{templateName}</Text>
                    </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 8 }}>
                <FlatList
                    data={floorData}
                    renderItem={renderFloorInterior}
                    keyExtractor={(item) => item.optionsId.toString()}
                />
            </View>
        </View>
    )
}
export default FloorInterior;