import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image } from 'react-native';
import Fonts from '../../../src/fonts/fonts'

const FloorInterior = ({navigation,route}) =>{
    const {templateName} = route.params;
    const typeData = [
        { optionsId: '01', value: 'Single Pre-Hung Door'},
        { optionsId: '02', value: 'Double Pre-Hung Door'},
        { optionsId: '03', value: '13"/8 slab'},
        { optionsId: '04', value: 'Interior By-pass'},
        { optionsId: '05', value: 'Bi-Fold'},
        { optionsId: '06', value: 'Mirrored By-Pass'},        
    ];
    const handleBack = () => {
        navigation.goBack();
    }
    
    const renderTypeInterior = ({ item }) => {
        const handleClick = () => {
            navigation.navigate('Size',{templateName:templateName})
        }
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
                    data={typeData}
                    renderItem={renderTypeInterior}
                    keyExtractor={(item) => item.optionsId.toString()}
                />
            </View>
        </View>
    )
}
export default FloorInterior;