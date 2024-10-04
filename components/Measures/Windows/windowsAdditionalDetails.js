import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StatusBar, Image, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRender from '../questionRender';
import MultipleSelectDropdown1 from '../basicLabour';
import MultipleSelectDropdown2 from '../customLabor';
import MultipleSelectDropdown3 from '../material';
import { addBasicLaborItem, addCustomLaborItem, addMaterialItem, clearTemplate, addImage, setStep, addResponse, updateResponseAtIndex, setSelectedResponseDetail, updateTempResponse, clearTempWindow, clearDetails } from '../../redux/measures';
// import OpenCamera from './camera';
import GlobalModal from '../../globalModal';
import Fonts from '../../../src/fonts/fonts';
import ButtonComponent from './btnComponent';

const WindowsAddDetails = ({ navigation }) => {
    const dispatch = useDispatch();
    const tempWindowIndex = useSelector(state => state.measuresData.windowResponse.index);
    const tempResponse = useSelector(state => state.measuresData.windowResponse.tempResponse);
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const response = useSelector(state => state.measuresData.allMeasures.selectedResponse);
    const globalIndex = useSelector(state => state.measuresData.doorWindowData.index);
    const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail);
    const details = useSelector(state => state.measuresData.doorWindowData);
    const [localStep, setLocalStep] = useState(globalStep);
    // console.log('ndskncmds', details);
    const [counter, setCounter] = useState(0);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [selectedItemsBasic, setSelectedItemsBasic] = useState([]);
    const [selectedItemsCustom, setSelectedItemsCustom] = useState([]);
    const [selectedItemsMaterial, setSelectedItemsMaterial] = useState([]);
    const [additionalBasicText, setAdditionalBasicText] = useState('');
    const [additionalCustomText, setAdditionalCustomText] = useState('');
    const [additionalMaterialText, setAdditionalMaterialText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    // console.log('selectedData', JSON.stringify(details));
    const [isUpdating, setIsUpdating] = useState(false);
    useEffect(() => {
        if (isUpdating) {

        }
        setCounter(counter + 1)
    }, [isUpdating, dispatch, details, navigation, response, selectedData]);

    const handleBack = () => {
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        navigation.goBack();
    };
    // console.log('sadgshd', JSON.stringify(tempResponse))

    const disablePreview = selectedItemsBasic.length === 0 || selectedItemsCustom.length === 0 || selectedItemsMaterial.length === 0 || selectedPhotos.length === 0 || additionalBasicText.trim() === '' || additionalCustomText.trim() === '' || additionalMaterialText.trim() === '';

    const handleDispatch = () => {
        const updatedDetails = {
            ...details,
            additionalDetails: {
                ...details.additionalDetails,
                customLabor: {
                    itemsCustom: selectedItemsCustom,
                    description: additionalCustomText
                },
                basicLabor: {
                    itemsBasic: selectedItemsBasic,
                    description: additionalBasicText
                },
                materials: {
                    itemsMaterial: selectedItemsMaterial,
                    description: additionalMaterialText
                },
            },
        }
        dispatch(addBasicLaborItem({
            itemsBasic: selectedItemsBasic,
            description: additionalBasicText
        }));

        dispatch(addCustomLaborItem({
            itemsCustom: selectedItemsCustom,
            description: additionalCustomText
        }));

        dispatch(addMaterialItem({
            itemsMaterial: selectedItemsMaterial,
            description: additionalMaterialText
        }));
        return updatedDetails;
    }

    const handlePreview = () => {
        const updatedDetails = handleDispatch();
        const indexToUpdate = selectedData?.id
            ? tempResponse.findIndex(resp => resp.id === selectedData.id)
            : tempWindowIndex;
        dispatch(updateTempResponse({ index: indexToUpdate, tempIndexResponse: updatedDetails }));
        // dispatch(clearDetails());
        navigation.navigate('WindowSummary')

    };


    // console.log('DAFDFASDGFA', selectedData);
    const handleCancel = () => {
        dispatch(clearTemplate());
        setModalVisible(false);
        navigation.navigate('Templates');
    };

    return (
        <View style={styles.view1}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: StatusBar.currentHeight, paddingHorizontal: 15, paddingBottom: 15 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image
                            source={require('../../../assets/icons/arrowright_.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}

                        />
                    </TouchableOpacity>
                    <Text
                        style={{ flex: 1, fontSize: 26, fontFamily: Fonts.FONTS_MEDIUM, color: '#000' }}
                        numberOfLines={1}
                    >
                        {templateName.value}
                    </Text>
                    <ButtonComponent />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.view4}>
                        <QuestionRender step={globalStep} />
                        <ScrollView>
                            <MultipleSelectDropdown1
                                onPress={(selectedItemsBasic, additionalDetailsBasic) => {
                                    setSelectedItemsBasic(selectedItemsBasic);
                                    setAdditionalBasicText(additionalDetailsBasic);
                                }}
                            />
                            <MultipleSelectDropdown2
                                onPress={(selectedItemsCustom, additionalDetailsCustom) => {
                                    setSelectedItemsCustom(selectedItemsCustom);
                                    setAdditionalCustomText(additionalDetailsCustom);
                                }}
                            />
                            <MultipleSelectDropdown3
                                onPress={(selectedItemsMaterial, additionalDetailsMaterial) => {
                                    setSelectedItemsMaterial(selectedItemsMaterial);
                                    setAdditionalMaterialText(additionalDetailsMaterial);
                                }}
                            />
                        </ScrollView>
                    </View>
                    <View style={styles.view5}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.5 }}></View>
                        <TouchableOpacity
                            style={styles.previewBtn}
                            onPress={handlePreview}
                        >
                            <Text style={styles.previewText}>Preview</Text>
                        </TouchableOpacity>
                    </View>
                    <GlobalModal
                        visible={modalVisible}
                        title="Are you sure?"
                        message="Do you want to clear?"
                        okText="Ok"
                        cancelText="Cancel"
                        onOk={handleCancel}
                        onCancel={() => setModalVisible(false)}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        backgroundColor: "#498DEF"
    },
    view2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: 30,
        paddingHorizontal: 15
    },
    view3: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image1: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    text1: {
        fontSize: 28,
        fontFamily: Fonts.FONTS_MEDIUM,
        top: 4,
        color: 'black',
        left: 10
    },
    view4: {
        flex: 1,
        backgroundColor: "white",
        paddingVertical: 10
    },
    view5: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingBottom: 10,
        paddingHorizontal: 15
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#498DEF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    cancelText: {
        fontSize: 22,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'white'
    },
    previewBtn: {
        flex: 1,
        backgroundColor: '#498DEF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center'
    },
    previewText: {
        fontSize: 22,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'white'
    },
});

export default WindowsAddDetails;
