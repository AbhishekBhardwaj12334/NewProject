import React from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image } from 'react-native';
import Fonts from '../../../../src/fonts/fonts'
import { useDispatch,useSelector } from 'react-redux';

const WhereIsItSecurity = ({navigation}) =>{

    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData.template);
    console.log('SDJBJSBXHGVHSB',templateName)
    const WhereIsItData = [
        { optionsId: '01', value: 'Front Entry' },
        { optionsId: '02', value: 'Back Entry' },
        { optionsId: '03', value: 'Side Entry' },
        { optionsId: '04', value: 'Garage Entry' },
        { optionsId: '05', value: 'Other' },
    ];
    const handleBack = () => {
        navigation.navigate('Templates')
    }

    const renderWhereIsItSecurity = ({ item }) => {
        const handleClick=()=>{
            navigation.navigate('Storm/SecurityType')
        }
        return (
            <View style={{paddingHorizontal:10,margin:10}}>
            <TouchableOpacity
                style={{ paddingVertical: 20,backgroundColor:'black',borderRadius:8,paddingHorizontal:15 }}
                onPress={handleClick}
            >
                <Text style={{ fontSize: 16,color:'white' }}>{item.value}</Text>
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
                            source={require('../../../../assets/icons/arrowright_.png')}
                            style={{width:20,height:20,resizeMode:'contain'}}
                        />
                    </TouchableOpacity>
                    <Text style={{fontSize: 28,fontFamily: Fonts.FONTS_MEDIUM,top: 4,color: 'black',left:10}}>{templateName.value}</Text>
                    </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 8 }}>
                <FlatList
                    data={WhereIsItData}
                    renderItem={renderWhereIsItSecurity}
                    keyExtractor={(item) => item.optionsId.toString()}
                />
            </View>
        </View>
    )
}
export default WhereIsItSecurity;