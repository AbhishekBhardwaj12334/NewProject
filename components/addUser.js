import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import AnimatedInput from "./animateView";
import { realmConfig } from "./realmConfig";
const { useRealm } = realmConfig

const AddUser = ({ navigation }) => {
    const realm = useRealm();
    const { t } = useTranslation();
    const [fields, setFields] = useState({
        id: '',
        name: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        country: '',
        state: '',
        zipCode: '',
        age: '',
        phoneNumbers: '',
        image: {
            imageId: '',
            uri: '',
            type: '',
            name: ''
        }
    });

    const [initialState] = useState({ ...fields });

    const handleBack = () => {
        navigation.goBack();
    }

    const handleSubmit = () => {
        try {
            realm.write(() => {
                const lastImage = realm.objects('Image').sorted('imageId', true)[0];
                console.log('skncjsdnckjn', realm.objects('Image'))
                const newImageId = lastImage ? lastImage.imageId + 1 : 1;

                const newImage = {
                    imageId: newImageId,
                    uri: fields?.image?.uri,
                    type: fields?.image?.type,
                    name: fields?.image?.name,
                };
                const createdImage = realm.create('Image', newImage);
                console.log('Image Object Added')

                // Step 2: Add User data to the UserData schema and link the created image
                const lastUser = realm.objects('UserData').sorted('id', true)[0];
                const newUserId = lastUser ? lastUser.id + 1 : 1;

                const newUser = {
                    id: newUserId,
                    name: fields?.name,
                    email: fields?.email,
                    address1: fields?.address1,
                    address2: fields?.address2,
                    city: fields.city,
                    country: fields.country,
                    state: fields?.state,
                    zipCode: fields?.zipCode,
                    age: fields?.age,
                    phoneNumbers: fields?.phoneNumbers,
                    image: realm.objects('Image').sorted('imageId', true)[0]
                };
                realm.create('UserData', newUser);

                console.log('User data with image appended successfully');
            });
            setFields(initialState);

            // Navigate back to the Settings screen
            navigation.navigate('Settings');
        } catch (error) {
            console.error('Error saving UserData with Image:', error);
        }
    };



    const handleCancel = () => {
        setFields(initialState);
        navigation.navigate('Settings')
    }

    const renderFields = [
        { label: "User Name", field: "name" },
        { label: "Address One", field: "address1" },
        { label: "Address Two", field: "address2" },
        { label: "City", field: "city" },
        { label: "Country", field: "country" },
        { label: "ZIP Code", field: "zipCode" },
        { label: "Age", field: "age" },
        { label: "Email", field: "email" },
        { label: "Phone Number", field: "phoneNumbers" }
    ];

    const updateField = (field, value) => {
        setFields(prev => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.mainView}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View
                    style={styles.view1}>
                    <TouchableOpacity onPress={() => handleBack()}>
                        <Image
                            source={require('../assets/icons/arrowright_.png')}
                            style={styles.image1}
                        />
                    </TouchableOpacity>
                    <Text
                        style={styles.text1}
                        numberOfLines={1}
                    >
                        {t("addUser")}
                    </Text>
                    {/* <ButtonComponent /> */}
                </View>
                <ScrollView style={styles.view2}>
                    <View style={styles.view3}>
                        <Text style={styles.addUserText}>Add New User's Details</Text>
                    </View>
                    {renderFields
                        .map((field, index) => (
                            <AnimatedInput
                                key={index}
                                label={field.label}
                                value={fields[field.field]}
                                editable={true}
                                containerStyles={styles.userInputContainer}
                                onChangeText={value => updateField(field.field, value)}
                            />
                        ))}
                </ScrollView>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.submitButton}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.submitText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitButton}
                        onPress={() => handleCancel()}
                    >
                        <Text style={styles.submitText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
export default AddUser;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
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
        paddingBottom: 15,
        alignItems: 'center'
    },
    addUserText: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF'
    },
    userInputContainer: {
        fontSize: 22,
        color: 'rgb(0,0,0)',
        marginTop: 0,
        marginBottom: 5,
        borderRadius: 10,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black'
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    submitButton: {
        backgroundColor: '#498DEF',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8
    },
    submitText: {
        fontSize: 17,
        color: 'white',
    },
})