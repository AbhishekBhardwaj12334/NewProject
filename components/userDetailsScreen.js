import React, { useEffect, useState } from "react";
import { StatusBar, Text, View, ImageBackground, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AnimatedInput from "./animateView";
import { addUserData } from "./redux/measures";
import { useTranslation } from "react-i18next";
import { realmConfig } from "./realmConfig";
import OpenCamera from "./Measures/camera";
const { useRealm } = realmConfig
const UserDetails = ({ navigation }) => {
    const realm = useRealm();
    const userDetail = useSelector(state => state.measuresData?.usersDetails?.userData);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [editable, setEditable] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [imgUrls, setImgUrls] = useState({});
    console.log('sdlmckds', editable, showCamera)
    const [fields, setFields] = useState({
        id: userDetail?.id,
        name: userDetail?.name,
        email: userDetail?.email,
        address1: userDetail?.address1,
        address2: userDetail?.address2,
        city: userDetail?.state,
        country: userDetail?.country,
        zipCode: userDetail?.zipCode?.toString(),
        age: userDetail?.age?.toString(),
        phoneNumbers: userDetail?.phoneNumbers,
        image: {
            uri: userDetail?.image?.uri || 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg',
            type: userDetail?.image?.type,
            name: userDetail?.image?.name
        }
    });
    console.log('sjjdnsc', userDetail, fields)
    const [initialState] = useState({ ...fields });

    useEffect(() => {
        setShowCamera(editable)
    }, [editable])

    // Handlers
    const handleBack = () => {
        navigation.goBack();
    }

    const handleEdit = () => {
        setEditable(true);
    }

    const handleCancel = () => {
        setFields(initialState);
        setEditable(false);
    };

    const handleSubmit = () => {
        const updates = {};

        // Detect updates in fields
        for (const key in fields) {
            if (fields[key] !== initialState[key]) {
                updates[key] = fields[key];
            }
        }

        try {
            realm.write(() => {
                const schemaName = 'UserData';
                const imageSchemaName = 'Image';
                const existingEntity = realm.objects(schemaName).filtered(`id == $0`, fields.id)[0];

                if (existingEntity) {
                    console.log('Existing entity found. Checking for updates...');
                    Object.keys(fields).forEach(key => {
                        if (fields[key] !== existingEntity[key] && key !== 'image') {
                            console.log(
                                `Updating ${key} from ${existingEntity[key]} to ${fields[key]}`
                            );
                            existingEntity[key] = fields[key]; // Update the value in the schema
                        }
                    });

                    // Check for changes in the image object
                    if (
                        fields.image.uri !== existingEntity.image?.uri ||
                        fields.image.type !== existingEntity.image?.type ||
                        fields.image.name !== existingEntity.image?.name
                    ) {
                        console.log('Updating image schema...');
                        let existingImageEntity = realm.objects(imageSchemaName).filtered(`imageId == $0`, fields.id)[0];

                        if (existingImageEntity) {
                            // Update existing image record
                            existingImageEntity.uri = fields.image.uri;
                            existingImageEntity.type = fields.image.type;
                            existingImageEntity.name = fields.image.name;
                        } else {
                            // Create new image record
                            realm.create(imageSchemaName, {
                                // id: fields.id,
                                uri: fields.image.uri,
                                type: fields.image.type,
                                name: fields.image.name,
                            });
                        }
                    }
                } else {
                    console.log('No matching entity found. Adding a new entity.');
                    // realm.create(schemaName, { ...fields });

                    // Create new image record
                    // realm.create(imageSchemaName, {
                    //     id: fields.id,
                    //     uri: fields.image.uri,
                    //     type: fields.image.type,
                    //     name: fields.image.name,
                    // });
                }
            });

            console.log('Changes saved successfully.');
        } catch (error) {
            console.error('Error updating UserData or Image:', error);
        }

        // Dispatch Redux action to update the store and disable edit mode
        dispatch(addUserData(fields));
        setEditable(false);
    };


    const handleProfile = () => {
        setShowCamera(true);
    }

    const updateField = (field, value) => {
        setFields(prev => ({ ...prev, [field]: value }));
    };

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

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <ImageBackground source={require('../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View style={styles.view1}>
                    <TouchableOpacity onPress={() => handleBack()}>
                        <Image source={require('../assets/icons/arrowright_.png')} style={styles.image1} />
                    </TouchableOpacity>
                    <Text style={styles.text1} numberOfLines={1}>
                        {t("userDetails")}
                    </Text>
                </View>
                <ScrollView style={styles.view2}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
                        <View style={styles.container}
                        // onPress={() => handleProfile()}
                        >
                            <Image source={{ uri: fields?.image?.uri }} style={styles.image} />
                            {/* <Image source={require('../assets/icons/Vector.png')} style={styles.image2} /> */}
                        </View>
                        {showCamera &&
                            <OpenCamera
                                onSelectPhotos={(photos) => {
                                    console.log('sdjjdcdsjc', photos)
                                    setImgUrls(photos[0])
                                    setFields((prevFields) => ({
                                        ...prevFields,
                                        image: photos[0],
                                    }))
                                }}
                                limit={1}
                            />

                        }
                        <View style={{ justifyContent: "center", alignItems: 'center' }}>
                            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                                <Text style={styles.editText}>{t("edit")}</Text>
                                {console.log('ABSHDCHDS', imgUrls)}
                            </TouchableOpacity>
                        </View>
                    </View>
                    {renderFields
                        .filter(field => editable || fields[field.field])
                        .map((field, index) => (
                            <AnimatedInput
                                key={index}
                                label={field.label}
                                value={fields[field.field]}
                                editable={editable}
                                containerStyles={styles.userInputContainer}
                                onChangeText={value => updateField(field.field, value)}
                            />
                        ))}
                </ScrollView>
                {editable && (
                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton} onPress={handleCancel}>
                            <Text style={styles.submitText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
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
        paddingTop: 5
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
    container: {
        // flex: 1,
        // flexDirection: 'row',
        marginBottom: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    image: {
        width: '90%',
        height: '90%',
        borderRadius: 60,
        resizeMode: 'contain',
        position: 'relative',
    },
    editButton: {
        backgroundColor: '#498DEF',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    editText: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'white'
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
    // image2: {
    //     position: 'absolute',
    //     top: 50,
    //     right: 10
    // }
});
export default UserDetails;