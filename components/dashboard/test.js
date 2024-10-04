import React from "react";
import { View, Text, ImageBackground, StatusBar, TouchableOpacity, ScrollView, Image } from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get('window');
const Test = () => {
    componentWidth = width*0.42;
    componentWidth1 = width*0.382;
    componentHeight1 = 250
    componentHeight2 = 170
    componentHeight3 = height*0.186;
    const cardsData = [
        { id: 1, text: 'Assesment', subText: 140, imagePath: require('../../assets/icons/AssesmentIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
        { id: 2, text: 'Installation', subText: 137, imagePath: require('../../assets/icons/InstallerIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
        { id: 3, text: 'Work Order', subText: 1, imagePath: require('../../assets/icons/WorkOrderIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
        { id: 4, text: 'Crossroads', subText: 0, imagePath: require('../../assets/icons/OtherIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
        { id: 5, text: 'Permit', subText: 1, imagePath: require('../../assets/icons/PermitIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
        { id: 6, text: 'Online Appointments', subText: 5, imagePath: require('../../assets/icons/OnlineAppointmentIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
        { id: 7, text: 'Online Leads', subText: 0, imagePath1: require('../../assets/icons/MaskIcon.png'), imagePath: require('../../assets/icons/OtherIcon.png') },
        { id: 8, text: 'Allied Fence', subText: 2, imagePath1: require('../../assets/icons/MaskIcon.png'), imagePath: require('../../assets/icons/OtherIcon.png') },
        { id: 9, text: 'Online', subText: 0, imagePath: require('../../assets/icons/OtherIcon.png'), imagePath1: require('../../assets/icons/MaskIcon.png') },
    ];
    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/images/screenbackground.png')}
                style={{ flex: 1 }}
            >
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingTop: 50,paddingVertical:10 }}>
                        <ScrollView
                            contentContainerStyle={{
                                flexDirection: 'row',
                                paddingTop: 20,
                            }}
                        >
                            <View style={{ flexDirection: 'column',marginRight:15 }}>
                                {cardsData.slice(0, 4).map((card) => (
                                    <TouchableOpacity
                                        key={card.id}
                                        style={{ height: componentHeight1, width: componentWidth, backgroundColor: '#498DEF', borderRadius: 15, marginTop: 20,paddingHorizontal:10,paddingTop:10 }}>
                                        <View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_REGULAR, color: 'white' }}>
                                                    {card.text}
                                                </Text>
                                                <Image
                                                    source={require('../../assets/icons/arrowRight.png')}
                                                    style={{ height: 10, width: 10, resizeMode: 'contain', left: 10, tintColor: 'white' }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 21, fontFamily: Fonts.FONTS_BOLD, color: 'white' }}>{card.subText}</Text>
                                            <View>
                                                <ImageBackground
                                                    source={card.imagePath1}
                                                    style={{height: componentHeight3, width:componentWidth1}}
                                                >
                                                    <Image
                                                        source={card.imagePath}
                                                        style={{ width: 80, height: 80 }}
                                                    />
                                                </ImageBackground>
                                                </View>
                                            </View>

                                    </TouchableOpacity>
                                ))}
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                {cardsData.slice(4).map((card) => (
                                    <TouchableOpacity
                                        key={card.id}
                                        style={{ flex:1,height: componentHeight2, width: componentWidth, backgroundColor: '#498DEF', borderRadius: 15, marginTop: 20,paddingHorizontal:10 }}>
                                            <View style={{flex:1}}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_REGULAR, color: 'white' }}>
                                                    {card.text}
                                                </Text>
                                                <Image
                                                    source={require('../../assets/icons/arrowRight.png')}
                                                    style={{ height: 10, width: 10, resizeMode: 'contain', left: 10, tintColor: 'white' }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 21, fontFamily: Fonts.FONTS_BOLD, color: 'white' }}>{card.subText}</Text>
                                            <View>
                                                <ImageBackground
                                                    source={card.imagePath1}
                                                    style={{height:com, width: 110,resizeMode:'contain'}}
                                                >
                                                    <Image
                                                        source={card.imagePath}
                                                        style={{ width: 80, height: 80 }}
                                                    />
                                                </ImageBackground>
                                                </View>
                                            </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default Test;