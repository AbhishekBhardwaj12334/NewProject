import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, StatusBar, ImageBackground } from "react-native";
import Fonts from '../../src/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import YourNewScreen from "./detailsAddition";
import MeasurementsDetails from "./measurmentAddition";
import YourComponent from "./basicUpdate";
import CustomRender from "./customUpdate";
import MaterialRender from "./materialUpdate";
import BottomSheet from 'react-native-simple-bottom-sheet';
import { updateImageName, removeImage, updateResponseAtIndex, addResponse, clearTemplate } from "../redux/measures";
import GlobalModal from "../globalModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NavigateBackHandler from "./summaryBackHandler";
import { useRoute } from "@react-navigation/native";
import QuestionsDisplay from "./additionalQuestionDispla";

const SummaryAll = ({ navigation }) => {

    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const selectedBasic = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.basicLabor);
    const selectedCustom = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.customLabor);
    const selectedMaterial = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.materials);
    const selectedPhotos = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.imgUrls);
    const selectedMeasurments = useSelector(state => state.measuresData?.doorWindowData?.selectedMeasurements);
    console.log('dshcjkdscjk', selectedMeasurments)
    const selectedOptions = useSelector(state => state.measuresData?.doorWindowData?.selectedOptions);
    const details = useSelector(state => state?.measuresData?.doorWindowData)
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [fileExtension, setFileExtension] = useState('');
    const { handleBackNavigation } = NavigateBackHandler({
        templateId: details?.selectedTemplate?.templateId,
        step: details?.step,
    });
    const handlePress = (index) => {
        setSelectedImageIndex(index);
        const name = selectedPhotos[index]?.name;
        const [fileNameWithoutExtension, extension] = name.split('.');
        setFileName(fileNameWithoutExtension);
        setFileExtension(extension);
        setIsBottomSheetVisible(true);
    };
    // const { templateId, step } = route.params;
    const handleBack = () => {
        console.log('navigationSummary', navigation)
        handleBackNavigation();
    };

    const [fileName, setFileName] = useState('');

    const handleDelete = (index) => {
        dispatch(removeImage(index));
        setModalVisible(false);
    };

    const handleSave = () => {
        setIsEditingName(false);
        setIsBottomSheetVisible(false);
        const updatedFileName = `${fileName}.${fileExtension}`;
        dispatch(updateImageName({ uri: selectedPhotos[selectedImageIndex]?.uri, newName: updatedFileName }));
    };

    const handleCompleteMeasures = async () => {
        try {
            if (!templateName || !templateName.templateId) {
                throw new Error('templateName.templateId is required');
            }

            let storedData = [];
            if (templateName.templateId === '01') {
                storedData = await AsyncStorage.getItem('stormData');
                console.log('Existing stormData:', storedData);
            } else if (templateName.templateId === '02') {
                storedData = await AsyncStorage.getItem('eIDoorData');
                console.log('Existing eIDoorData:', storedData);
            } else {
                throw new Error('Invalid templateId');
            }

            // Initialize with an empty array if there's no data yet
            let existingData = storedData ? JSON.parse(storedData) : [];
            if (!Array.isArray(existingData)) {
                throw new Error('existingData must be an array');
            }

            const generateNewId = () => {
                const maxId = existingData.reduce((max, item) => {
                    const currentId = parseInt(item.id, 10);
                    return currentId > max ? currentId : max;
                }, 0);
                return String(maxId + 1).padStart(3, '0');
            };

            const currentData = details;
            if (!currentData || typeof currentData !== 'object') {
                throw new Error('details must be an object');
            }

            // Check if the current data exists in the stored data array
            const existingItemIndex = existingData.findIndex(item => item.id === currentData.id);
            if (existingItemIndex !== -1) {
                // Update the existing object if found
                existingData[existingItemIndex] = { ...existingData[existingItemIndex], ...currentData };
            } else {
                // Generate a new ID if no ID exists
                if (!currentData.id) {
                    const updatedData = {
                        ...currentData,
                        id: generateNewId(),
                    };
                    existingData.push(updatedData);
                } else {
                    existingData.push(currentData);
                }
            }

            // Save the updated data back to AsyncStorage
            if (templateName.templateId === '01') {
                await AsyncStorage.setItem('stormData', JSON.stringify(existingData));
            } else if (templateName.templateId === '02') {
                await AsyncStorage.setItem('eIDoorData', JSON.stringify(existingData));
            }

            console.log('Data successfully saved to AsyncStorage.');
            setModalVisible1(false);
            dispatch(clearTemplate());
            navigation.navigate('Templates');

        } catch (error) {
            console.error('Error saving data in handleCompleteMeasures:', error);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginTop: StatusBar.currentHeight, marginBottom: 10, paddingHorizontal: 15, alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image source={require('../../assets/icons/arrowright_.png')} style={styles.backImage} />
                    </TouchableOpacity>
                    <Text style={styles.summaryHeader}>Summary</Text>
                    <View>
                        <TouchableOpacity style={styles.viewJobBtn}>
                            <Text style={{ fontSize: 13, color: 'white', textAlign: 'center', fontFamily: Fonts.FONTS_REGULAR }}>View Job</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={[styles.container, { flex: 1, backgroundColor: 'white' }]}>
                    <Text style={styles.subtitle}>You Started with</Text>
                    <View >
                        <View style={styles.section}>
                            <Text style={styles.content}>{templateName.value}</Text>
                            <YourNewScreen />
                        </View>
                        {Object.values(selectedMeasurments || {}).some(value => value == undefined && value !== '') &&
                            <MeasurementsDetails />
                        }

                        {(selectedBasic?.itemsBasic?.length > 0 || selectedCustom?.itemsCustom?.length > 0 || selectedMaterial?.itemsMaterial?.length > 0 || selectedMaterial?.description || selectedBasic?.description || selectedCustom?.description) ? (
                            <View style={styles.section}>
                                <Text style={styles.subtitle}>Labor Types</Text>
                                {selectedBasic?.itemsBasic?.length > 0 || selectedBasic?.description ? (
                                    <Text style={styles.content}>Basic Labor</Text>
                                ) : null}
                                <YourComponent />
                                {selectedCustom?.itemsCustom?.length > 0 || selectedCustom?.description ? (
                                    <Text style={styles.content}>Custom Labor</Text>
                                ) : null}
                                <CustomRender />
                                {selectedMaterial?.itemsMaterial?.length > 0 || selectedMaterial?.description ? (
                                    <Text style={styles.content}>Material</Text>
                                ) : null}
                                <MaterialRender />
                            </View>
                        ) : null}
                        {templateName?.templateId == '01' && selectedOptions[1] || templateName?.templateId == '02' && selectedOptions[2] ?
                            <QuestionsDisplay /> : null
                        }
                        {selectedPhotos && selectedPhotos?.length > 0 ? (
                            <View style={styles.section}>
                                <Text style={styles.subtitle}>Additional Details</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                    {selectedPhotos.map((item, index) => (
                                        <View key={index}>
                                            <TouchableOpacity onPress={() => handlePress(index)}>
                                                <View style={styles.imageContainer}>
                                                    <Image
                                                        source={{ uri: item.uri }}
                                                        style={styles.image}
                                                    />
                                                    <Text style={styles.imageName}>{item.name}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <View style={styles.deleteIconContainer}>
                                                <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                    <Image source={require('../../assets/icons/Groupdeactivate.png')} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : null}
                    </View>
                </ScrollView>
                <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                    <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={styles.completeBtn}
                            onPress={() => setModalVisible1(true)}
                        >
                            <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', fontFamily: Fonts.FONTS_REGULAR }}>Complete Measures</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.5 }}></View>
                        <TouchableOpacity
                            style={styles.completeBtn}
                            onPress={() => setModalVisible1(true)}
                        >
                            <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', fontFamily: Fonts.FONTS_REGULAR }}>Submit For Review</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <GlobalModal
                    visible={modalVisible1}
                    title="Are you sure?"
                    message="Do you want to Save this data?"
                    okText="Ok"
                    cancelText="Cancel"
                    onOk={() => handleCompleteMeasures()}
                    onCancel={() => setModalVisible1(false)}
                />

                <GlobalModal
                    visible={modalVisible}
                    title="Are you sure?"
                    message="Do you want to delete photo?"
                    okText="Ok"
                    cancelText="Cancel"
                    onOk={() => handleDelete(selectedImageIndex)}
                    onCancel={() => setModalVisible(false)}
                />
                {isBottomSheetVisible && (
                    <BottomSheet
                        isOpen={true}
                        style={styles.bottomSheet}
                        onClose={() => setIsBottomSheetVisible(false)}
                    >
                        <View style={styles.bottomSheetContent}>
                            <Text style={styles.previewTitle}>Preview Image</Text>
                            <Image source={{ uri: selectedPhotos?.[selectedImageIndex]?.uri }} style={styles.previewImage} />
                            {isEditingName ? (
                                <View>
                                    <TextInput
                                        style={styles.fileNameInput}
                                        value={fileName}
                                        onChangeText={setFileName}
                                    />
                                    <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                                        <Text style={styles.saveButtonText}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.fileNameContainer}>
                                    <Text style={styles.fileName}>{selectedPhotos?.[selectedImageIndex]?.name}</Text>
                                    <TouchableOpacity onPress={() => setIsEditingName(true)} style={styles.editButton}>
                                        <Image source={require('../../assets/icons/Group228.png')} style={styles.editIcon} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </BottomSheet>
                )}

            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    backImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    summaryHeader: {
        flex: 1,
        fontSize: 22,
        left: 5,
        fontFamily: Fonts.FONTS_BOLD,
        color: '#1F2428',
        top: 3
    },
    viewJobBtn: {
        alignItems: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: '#498DEF',
        borderRadius: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_REGULAR,
        color: '#498DEF',
    },
    content: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF',
    },
    section: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 10,
        padding: 10,
    },
    imageContainer: {
        marginTop: 10,
        marginRight: 20,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
        // resizeMode: 'contain',
    },
    imageName: {
        width: 105,
        marginTop: 10,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    deleteIconContainer: {
        position: 'absolute',
        backgroundColor: '#CEE2FA',
        top: 3,
        right: 20,
        borderRadius: 10,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.7,
    },
    bottomSheet: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    bottomSheetContent: {
        // paddingVertical: 20,
        bottom: 10
    },
    previewTitle: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: Fonts.FONTS_BOLD,
        // marginBottom: 25,
        color: 'black'
    },
    previewImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    fileNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    fileName: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'black',
    },
    editButton: {
        marginLeft: 10,
    },
    editIcon: {
        resizeMode: 'contain',
        width: 20,
        height: 20,
    },
    fileNameInput: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_MEDIUM,
        borderWidth: 1,
        color: 'black',
    },
    saveButton: {
        alignItems: 'center',
        // marginTop: 10,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'blue',
    },
    completeBtn: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#498DEF',
        borderRadius: 10
    }
});

export default SummaryAll;