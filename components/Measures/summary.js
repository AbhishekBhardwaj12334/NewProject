import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, StatusBar } from "react-native";
import Fonts from '../../src/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import MeasurementsDetails from "./measurmentAddition";
import CustomRender from "./customUpdate";
import MaterialRender from "./materialUpdate";
import BottomSheet from 'react-native-simple-bottom-sheet';
import { updateImageName, removeImage } from "../redux/measures";
import GlobalModal from "../globalModal";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DetailAdditions from "./detailsAddition";
import BasicRender from "./basicUpdate";
import LinearGradient from "react-native-linear-gradient";
import WindowMeasurmentAddition from "./Windows/ext&intMeasures";

const Summary = ({ index, navigation }) => {
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail);
    const dispatch = useDispatch();
    // console.log('dskdsklcmsdmclkmds', selectedData)
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditingName, setIsEditingName] = useState(false);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [fileExtension, setFileExtension] = useState('');


    const handlePress = (index) => {
        setSelectedImageIndex(selectedData?.additionalDetails?.imgUrls[index]);
        const name = selectedData?.additionalDetails?.imgUrls[index]?.name;
        const [fileNameWithoutExtension, extension] = name.split('.');
        setFileName(fileNameWithoutExtension);
        setFileExtension(extension);
        setIsBottomSheetVisible(true);
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
        dispatch(updateImageName({ uri: selectedData?.additionalDetails?.imgUrls[selectedImageIndex]?.uri, newName: updatedFileName }));
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style={styles.section}>
                        <Text style={styles.subtitle}>You Started with</Text>
                        {/* <Text style={styles.content}>{selectedData.selectedTemplate.value}</Text> */}
                        <DetailAdditions templateType={selectedData.selectedTemplate.templateId} />
                    </View>
                    <WindowMeasurmentAddition />
                    {/* {console.log('selectedData', selectedData)} */}
                    {(selectedData.additionalDetails?.basicLabor.itemsBasic.length > 0 || selectedData.additionalDetails?.customLabor.itemsCustom.length > 0 || selectedData.additionalDetails?.materials.itemsMaterial.length > 0 || selectedData.additionalDetails?.materials.description || selectedData.additionalDetails?.basicLabor.description || selectedData.additionalDetails?.customLabor.description) ? (
                        <View style={styles.section}>
                            <Text style={styles.content}>Labor Types</Text>
                            {selectedData.additionalDetails?.basicLabor.itemsBasic.length > 0 || selectedData.additionalDetails?.basicLabor.description ? (
                                <View>
                                    <Text style={styles.laborSubheadings}>Basic Labor</Text>
                                    <BasicRender />
                                </View>
                            ) : null}

                            {selectedData.additionalDetails?.customLabor.itemsCustom.length > 0 || selectedData.additionalDetails?.customLabor.description ? (
                                <View>
                                    <Text style={styles.laborSubheadings}>Custom Labor</Text>
                                    <CustomRender />
                                </View>
                            ) : null}


                            {selectedData.additionalDetails?.materials.itemsMaterial.length > 0 || selectedData.additionalDetails?.materials.description ? (
                                <View style={[styles.section, { borderWidth: 1, borderColor: 'rgba(31, 36, 40, 0.30)', paddingHorizontal: 10, paddingVertical: 5 }]}>
                                    <Text style={styles.content}>Material</Text>
                                    <MaterialRender />
                                </View>
                            ) : null}


                        </View>
                    ) : null}
                    {selectedData?.additionalDetails?.imgUrls && selectedData?.additionalDetails?.imgUrls.length > 0 ? (
                        <View style={[styles.section, { borderWidth: 1, borderColor: 'rgba(31, 36, 40, 0.30)', padding: 10 }]}>
                            <Text style={styles.content}>Attachments</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {selectedData?.additionalDetails?.imgUrls.map((item, index) => (
                                    <View key={index} style={{ paddingTop: 10 }}>
                                        <TouchableOpacity onPress={() => handlePress(index)}>
                                            <View style={styles.imageContainer}>
                                                <Image
                                                    source={{ uri: item.uri }}
                                                    style={styles.image}
                                                />
                                                <Text numberOfLines={2} style={styles.imageName}>{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={styles.deleteIconContainer}>
                                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                                <Image
                                                    source={require('../../assets/icons/Groupdeactivate.png')}
                                                    style={{ resizeMode: 'contain' }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))}
                            </ScrollView>
                            <LinearGradient
                                locations={[0, 0.3, 0.7]}
                                colors={['#1F2428', "#1F242822", "#ffffff"]}
                                style={{ height: 1, marginVertical: 8 }}
                            />
                        </View>
                    ) : null}
                </View>
            </KeyboardAwareScrollView>
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
                        <Image source={{ uri: selectedData?.additionalDetails?.imgUrls[selectedImageIndex]?.uri }} style={styles.previewImage} />
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
                                <Text style={styles.fileName}>{selectedData?.additionalDetails?.imgUrls[selectedImageIndex]?.name}</Text>
                                <TouchableOpacity onPress={() => setIsEditingName(true)} style={styles.editButton}>
                                    <Image source={require('../../assets/icons/Group228.png')} style={styles.editIcon} />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </BottomSheet>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        // marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF',
    },
    content: {
        fontSize: 23,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF',
    },
    section: {
        marginVertical: 10,
        // borderWidth: 1,
        // borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 5,
    },
    imageContainer: {
        marginTop: 10,
        marginRight: 20,
    },
    image: {
        width: 110,
        height: 110,
        borderRadius: 10,
        resizeMode: 'cover',
        backgroundColor: 'red'
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
        top: 10,
        right: 12,
        borderRadius: 10,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        // resizeMode: 'contain',
        opacity: 0.7,
    },
    bottomSheet: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    bottomSheetContent: {
        paddingVertical: 20,
    },
    previewTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.FONTS_BOLD,
        bottom: 30,
        color: 'black'
    },
    previewImage: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 10,
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
    laborSubheadings: {
        fontSize: 17,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#1F2428',
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
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        borderWidth: 1,
        color: 'black',
    },
    saveButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'blue',
    },
});

export default Summary;
