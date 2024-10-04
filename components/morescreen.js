import React, { useState } from "react";
import { View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Fonts from "../src/fonts/fonts";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";


const MoreScreen = ({ navigation }) => {

    const isloading = useState(true)
    const userData = useSelector((state) => state.userData.data);
    const loading = useSelector((state) => state.userData.loading);

    // const ShimmerPlaceholder = () => (
    //   <LinearGradient
    //     colors={["#e0e0e0", "#c0c0c0", "#e0e0e0"]}
    //     style={styles.shimmer}
    //     start={{ x: 0, y: 0 }}
    //     end={{ x: 1, y: 0 }}
    //   />
    // );


    const handleMyWork = () => {
        navigation.navigate('AdminNavigator')
    }

    const handleAccount = () => {
        navigation.navigate('MyAccount')
    }

    const handlePrivacy = () => {
        navigation.navigate('Terms&Privacy', { title: 'Privacy Policy' })
    }

    const handleTerms = () => {
        navigation.navigate('Terms&Privacy', { title: 'Terms and Condition' })
    }

    const handleLogout = () => {
        navigation.navigate('LoginPage');
    }

    return (
        <View style={{ flex: 1 }}>
            {loading ? (
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                        <View style={[styles.view2, { marginTop: 120 }]}>
                            <View style={{ flex: 1, maxHeight: 120 }}>
                                <ShimmerPlaceholder
                                    visible={loading}
                                    LinearGradient={LinearGradient}
                                    style={[styles.image3, { borderRadius: 18 }]}
                                />
                                <ShimmerPlaceholder
                                    visible={loading}
                                    LinearGradient={LinearGradient}
                                    style={[styles.text1, { marginTop: 25 }]}
                                />
                                <ShimmerPlaceholder
                                    visible={loading}
                                    LinearGradient={LinearGradient}
                                    style={[styles.text2, { marginTop: 8 }]}
                                />
                            </View>
                            <View style={styles.view3}>
                                <View style={styles.view4}>

                                    <ShimmerPlaceholder
                                        visible={loading}
                                        LinearGradient={LinearGradient}
                                        style={[styles.text4, { width: 100 }]}
                                    />
                                    <ShimmerPlaceholder
                                        visible={loading}
                                        LinearGradient={LinearGradient}
                                        style={[styles.text4, { width: 100 }]}
                                    />
                                    <ShimmerPlaceholder
                                        visible={loading}
                                        LinearGradient={LinearGradient}
                                        style={[styles.text4, { width: 100 }]}
                                    />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            ) :
                (<ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                    <View
                        style={styles.view1}>
                        <Image
                            source={require('../assets/images/cilioLogo.png')}
                            style={styles.image1}
                        />
                        {/* <Image
              source={require('../../assets/icons/Group49.png')}
              style={styles.image2}
            /> */}
                    </View>

                    <View style={styles.view2}>

                        <Image
                            source={require('../assets/images/Rectangle43.png')}
                            style={styles.image3}
                        />
                        {/* <Image
                source={require('../../assets/images/Ellipse13.png')}
                style={styles.image4}
              /> */}
                        <Text style={styles.text1}>{userData?.user?.fullName}</Text>
                        <Text style={styles.text2}>{userData?.user?.roleName}</Text>
                        <View
                            style={styles.view3}>
                            <ScrollView>

                                <View
                                    style={styles.view4}>
                                    <View
                                        style={styles.view5}>
                                        <Text style={styles.text3}>City</Text>
                                        <Text style={styles.text4}>{userData?.user?.city}</Text>
                                    </View>
                                    <View
                                        style={styles.view5}>
                                        <Text style={styles.text3}>Account No</Text>
                                        <Text style={styles.text4}>{userData?.user?.userKey}</Text>
                                    </View>
                                    <View
                                        style={styles.view5}>
                                        <Text style={styles.text3}>Package</Text>
                                        <Text style={styles.text4}>{userData?.user?.entityPackage}</Text>
                                    </View>
                                </View>
                                <View style={styles.view6}></View>
                                <View style={{ paddingVertical: 30, paddingHorizontal: 25 }}>
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={handleAccount}
                                    >
                                        <View
                                            style={{ flex: 1, flexDirection: 'row', }}
                                        >
                                            <Image
                                                source={require('../assets/icons/profileIcon.png')}
                                                style={{ width: 18, height: 20, resizeMode:'contain' }}
                                            />
                                            <Text style={{left:15,fontSize:15,fontFamily:Fonts.FONTS_MEDIUM,color:'black'}}>My Account</Text>
                                        </View>
                                        <Image
                                            source={require('../assets/icons/arrowRight.png')}
                                            style={{ width: 15, resizeMode: 'contain' }}
                                        />

                                    </TouchableOpacity>
                                    <LinearGradient
                                        locations={[0, 0.3, 0.7]}
                                        colors={["#ffffff", "#1F242822", "#ffffff"]}
                                        style={{ height: 1, marginHorizontal: 50, marginVertical: 15 }}
                                    />
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row',alignItems:'center'}}
                                        onPress={handleMyWork}
                                    >
                                        <View
                                            style={{ flex: 1, flexDirection: 'row',}}
                                        >
                                            <Image
                                                source={require('../assets/icons/52Note.png')}
                                                style={{ width: 18, height: 20, resizeMode:'contain' }}
                                            />
                                            <Text style={{left:15,fontSize:15,fontFamily:Fonts.FONTS_MEDIUM,color:'black'}}>View All Work</Text>
                                        </View>
                                        <Image
                                            source={require('../assets/icons/arrowRight.png')}
                                            style={{ width: 15, resizeMode: 'contain' }}
                                        />

                                    </TouchableOpacity>
                                    <LinearGradient
                                        locations={[0, 0.3, 0.7]}
                                        colors={["#ffffff", "#1F242822", "#ffffff"]}
                                        style={{ height: 1, marginHorizontal: 50, marginVertical: 15 }}
                                    />
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={handlePrivacy}
                                    >
                                        <View
                                            style={{ flex: 1, flexDirection: 'row'}}
                                        >
                                            <Image
                                                source={require('../assets/icons/usericon.png')}
                                                style={{ width: 18, height: 20, resizeMode:'contain' }}
                                            />
                                            <Text style={{left:15,fontSize:15,fontFamily:Fonts.FONTS_MEDIUM,color:'black'}}>Privacy Policy</Text>
                                        </View>
                                        <Image
                                            source={require('../assets/icons/arrowRight.png')}
                                            style={{ width: 15, resizeMode: 'contain' }}
                                        />

                                    </TouchableOpacity>
                                    <LinearGradient
                                        locations={[0, 0.3, 0.7]}
                                        colors={["#ffffff", "#1F242822", "#ffffff"]}
                                        style={{ height: 1, marginHorizontal: 50, marginVertical: 15 }}
                                    />
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={handleTerms}
                                    >
                                        <View
                                            style={{ flex: 1, flexDirection: 'row' }}
                                        >
                                            <Image
                                                source={require('../assets/icons/Group.png')}
                                                style={{ width: 18, height: 20, resizeMode:'contain' }}
                                            />
                                            <Text style={{left:15,fontSize:15,fontFamily:Fonts.FONTS_MEDIUM,color:'black'}}>Terms & Condition</Text>
                                        </View>
                                        <Image
                                            source={require('../assets/icons/arrowRight.png')}
                                            style={{ width: 15, resizeMode: 'contain' }}
                                        />

                                    </TouchableOpacity>
                                    <LinearGradient
                                        locations={[0, 0.3, 0.7]}
                                        colors={["#ffffff", "#1F242822", "#ffffff"]}
                                        style={{ height: 1, marginHorizontal: 50, marginVertical: 15 }}
                                    />
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={handleLogout}
                                    >
                                        <View
                                            style={{ flex: 1, flexDirection: 'row'}}
                                        >
                                            <Image
                                                source={require('../assets/icons/Groupdeactivate.png')}
                                                style={{ width: 18, height: 20, marginLeft:10,resizeMode:'contain'}}
                                            />
                                            <Text style={{left:15,fontSize:15,fontFamily:Fonts.FONTS_MEDIUM,color:'red'}}>Deactivate Account</Text>
                                        </View>
                                        <Image
                                            source={require('../assets/icons/arrowRight.png')}
                                            style={{ width: 15, resizeMode: 'contain' }}
                                        />

                                    </TouchableOpacity>
                                    <LinearGradient
                                        locations={[0, 0.3, 0.7]}
                                        colors={["#ffffff", "#1F242822", "#ffffff"]}
                                        style={{ height: 1, marginHorizontal: 50, marginVertical: 15 }}
                                    />
                                    <TouchableOpacity
                                        style={{ flexDirection: 'row', alignItems: 'center' }}
                                    >
                                        <View
                                            style={{ flex: 1, flexDirection: 'row'}}
                                        >
                                            <Image
                                                source={require('../assets/icons/Group228.png')}
                                                style={{ width:18, height: 20, marginLeft:10,resizeMode:'contain'}}
                                            />
                                            <Text style={{left:15,fontSize:15,fontFamily:Fonts.FONTS_MEDIUM,color:'red'}}>Logout</Text>
                                        </View>
                                        <Image
                                            source={require('../assets/icons/arrowRight.png')}
                                            style={{ width: 15, resizeMode: 'contain' }}
                                        />

                                    </TouchableOpacity>

                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ImageBackground>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    view1: {
        // flex: 1,
        // flexDirection: 'row',
        // maxHeight: 180,
        paddingHorizontal: 15,
        // paddingTop: 50,
        alignContent: 'center',
        position: 'relative'
    },
    image1: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    image2: {
        width: 25,
        height: 30,
        top: 8,
        left: 215
    },
    view2: {
        flex: 1,
        backgroundColor: '#498DEF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // position: 'relative',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        paddingTop: 60
    },
    image3: {
        position: 'absolute',
        width: 150,
        height: 150,
        top: -70,
        // left:35,
        alignSelf: 'center',
        resizeMode: 'contain'
    },
    image4: {
        position: 'absolute',
        width: 16,
        height: 16,
        top: 30,
        left: 143
    },
    text1: {
        // top: 0,
        // left: 20,
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },
    text2: {
        // top: 55,
        // left: 30,
        color: 'white',
        fontSize: 12,
        fontFamily: Fonts.FONTS_MEDIUM,
        textAlign: 'center'
    },
    view3: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    view4: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxHeight: 100,
        paddingHorizontal: 15,
        paddingVertical: 20
    },
    view5: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxHeight: 50,
        borderRightWidth: 2,
        borderRightColor: '#E4EFFF'
    },
    text3: {
        fontSize: 12,
        color: 'black',
        fontFamily: Fonts.FONTS_REGULAR
    },
    text4: {
        fontSize: 15,
        color: '#498DEF',
        fontFamily: Fonts.FONTS_MEDIUM
    },
    view6: {
        flex: 1,
        backgroundColor: '#E4EFFF',
        paddingVertical: 2,
        maxHeight: 8
    },
    view7: {
        // flex:1,
        paddingHorizontal: 15,
        paddingVertical: 16
    },
    clickable: {
        // flex: 1,
        flexDirection: 'row',
        // maxHeight: 60,
        // paddingVertical: 18
    },
    image5: {
        width: 20,
        height: 25,
        marginLeft: 20
    },
    text5: {
        fontSize: 18,
        left: 20,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'black'
    },
    image6: {
        left: 200,
        top: 5,
        width: 15,
        marginTop: 6,
        resizeMode: 'contain'
    },
    image7: {
        left: 105,
        top: 5,
        width: 15,
        resizeMode: 'contain',
        alignSelf: 'flex-end',
        // alignItems:'center'
    },
    image8: {
        width: 23,
        height: 25,
        marginLeft: 20
    },
    image9: {
        left: 176,
        top: 5,
        width: 15,
        resizeMode: 'contain',
        alignSelf: 'flex-end'
    },
    image10: {
        left: 123,
        top: 5,
        width: 15,
        resizeMode: 'contain'
    },
    image11: {
        width: 20,
        height: 25,
        marginLeft: 19
    },
    text6: {
        fontSize: 17,
        left: 23,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#FF0000'
    },
    image12: {
        left: 130,
        top: 9,
        width: 15,
        resizeMode: 'contain'
    },
    clickable1: {
        flex: 1,
        flexDirection: 'row',
        // maxHeight:100,
        paddingVertical: 10,
        alignItems: 'center'
    },
    image13: {
        width: 20,
        height: 20,
        marginLeft: 20
    },
})
export default MoreScreen;