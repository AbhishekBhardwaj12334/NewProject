import React from "react";
import { useTranslation } from "react-i18next";
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Line } from "./globaconstants";
import Fonts from "../src/fonts/fonts";
import { realmConfig } from "./realmConfig";
import { useSelector } from "react-redux";
const { useRealm } = realmConfig

const SettingsScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const usersData = useSelector(state => state.stormsecurityOptionsData?.userDataArray?.usersData);
    console.log('ABCD', usersData)
    const realm = useRealm();
    const handleBack = () => {
        navigation.goBack();
    };
    const handleLanguage = () => {
        navigation.navigate('LangauageIntegrater');
    }

    const handleAddUser = () => {
        navigation.navigate('AddUserScreen');
    }

    const handleUsers = async () => {
        try {
            const schemaName = 'UserData';
            realm.write(() => {
                usersData.forEach(user => {
                    const existingUser = realm.objects(schemaName).filtered(`id == ${user.id}`);
                    if (existingUser.length === 0) {
                        realm.create(schemaName, {
                            id: user?.id || '',
                            name: user?.name || '',
                            age: user?.age?.toString() || '',
                            address1: user?.address1 || '',
                            address2: user?.address2 || '',
                            city: user?.city || '',
                            state: user?.state || '',
                            zipCode: user?.zipCode?.toString() || '',
                            country: user?.country || '',
                            phoneNumbers: user?.phoneNumbers || '',
                            email: user?.email || '',
                            image: {
                                imageId: user?.image?.imageId,
                                uri: user?.image?.uri || '',
                                type: user?.image?.type || '',
                                name: user?.image?.name || '',
                            }
                        });
                        console.log(`User with ID ${user.id} added to Realm.`);
                    } else {
                        console.log(`User with ID ${user.id} already exists.`);
                    }
                    navigation.navigate('UserDataScreen')
                });
            });

            console.log('All users processed.');
        } catch (error) {
            console.error('Error saving user data to Realm:', error);
        }
    };

    return (
        <View style={styles.mainView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View
                    style={styles.view1}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image
                            source={require('../assets/icons/arrowright_.png')}
                            style={styles.image1}
                        />
                    </TouchableOpacity>
                    <Text
                        style={styles.text1}
                        numberOfLines={1}
                    >
                        {t("settings")}
                    </Text>
                    {/* <ButtonComponent /> */}
                </View>
                <View style={styles.view2}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => handleUsers()}
                    >
                        <View
                            style={styles.view3}>
                            <Image
                                source={require('../assets/icons/profileIcon.png')}
                                style={styles.userImage}
                            />
                            <Text style={styles.headerText}>{t("userAccount")}</Text>
                        </View>
                        <Image
                            source={require('../assets/icons/arrowRight.png')}
                            style={styles.arrowImage}
                        />
                    </TouchableOpacity>
                    <Line />
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => handleLanguage()}
                    >
                        <View
                            style={styles.view3}>
                            <Image
                                source={require('../assets/icons/usericon.png')}
                                style={styles.userImage}
                            />
                            <Text style={styles.headerText}>{t("change-Language")}</Text>
                        </View>
                        <Image
                            source={require('../assets/icons/arrowRight.png')}
                            style={styles.arrowImage}
                        />
                    </TouchableOpacity>
                    <Line />
                    <TouchableOpacity
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => handleAddUser()}
                    >
                        <View
                            style={styles.view3}>
                            <Image
                                source={require('../assets/icons/usericon.png')}
                                style={styles.userImage}
                            />
                            <Text style={styles.headerText}>{t("addUser")}</Text>
                        </View>
                        <Image
                            source={require('../assets/icons/arrowRight.png')}
                            style={styles.arrowImage}
                        />
                    </TouchableOpacity>
                    <Line />
                </View>
            </ImageBackground>
        </View>
    )
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
        paddingVertical: 10
    },
    view3: {
        flex: 1,
        flexDirection: 'row',
    },
    userImage: {
        width: 18,
        height: 20,
        resizeMode: 'contain'
    },
    headerText: {
        left: 15,
        fontSize: 15,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'black'
    },
    arrowImage: {
        width: 15,
        resizeMode: 'contain'
    },
})
export default SettingsScreen;