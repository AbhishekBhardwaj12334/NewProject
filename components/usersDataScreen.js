import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Fonts from '../src/fonts/fonts'
import { useDispatch, useSelector } from "react-redux";
import { addUserData, addUserDetails } from "./redux/measures";
import { realmConfig } from "./realmConfig";
const { useQuery } = realmConfig

const UserDataPage = ({ navigation }) => {
    const data = useQuery('UserData');
    const dispatch = useDispatch();
    const [usersData, setUsersData] = useState([]);
    console.log('abxjsxjsjxn', usersData);
    useEffect(() => {
        const fetchRealmData = () => {
            if (data && data.length > 0) {
                try {
                    const fetchedData = data.map(item => item.toJSON());

                    console.log('Fetched Realm Data:', fetchedData);
                    setUsersData(fetchedData);
                    dispatch(addUserDetails(fetchedData));
                } catch (error) {
                    console.error('Error parsing details:', error);
                }
            } else {
                console.log('No data found in Realm');
            }
        };
        fetchRealmData();
    }, [data, dispatch]);
    const handleBack = () => {
        navigation.goBack();
    }
    const handleUser = (index) => {
        console.log('njndsjncds', usersData[index])
        dispatch(addUserData(usersData[index]));
        navigation.navigate('UserDetailsScreen');
    }
    const { t } = useTranslation();
    return (
        <View style={styles.mainView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View style={styles.view1}>
                    <TouchableOpacity onPress={() => handleBack()}>
                        <Image
                            source={require('../assets/icons/arrowright_.png')}
                            style={styles.image1}
                        />
                    </TouchableOpacity>
                    {console.log('SJNCJSDN', usersData)}
                    <Text
                        style={styles.text1}
                        numberOfLines={1}
                    >
                        {t("allData")}
                    </Text>
                </View>
                <ScrollView style={styles.view2}>
                    {usersData && usersData.length > 0 ? (
                        usersData.map((user, index) => (
                            <View key={index} style={styles.borderView}>
                                <View style={styles.row1}>
                                    <Text style={styles.details}>{user.name}</Text>
                                    {user.age &&
                                        <Text style={styles.details}>{user.age}</Text>
                                    }
                                    <Text style={[styles.details, { fontSize: 14 }]}>{user.email}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }}>
                                    <Text style={[styles.details, { fontSize: 14 }]}>{user.phoneNumbers.slice(-2).padStart(user.phoneNumbers.length, '*')}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <TouchableOpacity style={{ paddingHorizontal: 6 }}>
                                        <Image
                                            source={require('../assets/icons/delete.png')}
                                            tintColor={"grey"}
                                            style={styles.deleteIcon}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ paddingHorizontal: 6 }}
                                        onPress={() => handleUser(index)}
                                    >
                                        <Image
                                            source={require('../assets/icons/edit.png')}
                                            tintColor={"grey"}
                                            style={styles.editIcon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text>No user data available</Text>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    );
}
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // backgroundColor: 'white'
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,
        paddingHorizontal: 15,
        paddingBottom: 15
    },
    image1: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    text1: {
        flex: 1,
        fontSize: 26,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#000'
    },
    view2: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    borderView: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginBottom: 10

    },
    row1: {
        flex: 1
    },
    deleteIcon: {
        width: 17,
        height: 23
    },
    editIcon: {
        width: 25,
        height: 25
    },
    details: {
        fontSize: 16,
        color: 'black',
        fontFamily: Fonts.FONTS_MEDIUM
    }
})
export default UserDataPage;