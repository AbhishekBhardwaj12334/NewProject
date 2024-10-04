import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet, StatusBar, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setExteriorMeasures, setOption, setStep, addImage, updateAddOnSelected, setMeasurements, setMeasures, setResponseIndex, addTempResponse, updateTempResponse, setIsUpdating, clearTempWindow } from '../../redux/measures';
import QuestionRender from "../questionRender";
import { Linear } from "../../globaconstants";
import OpenCamera from "../camera";
import GlobalModal from "../../globalModal";
import DropdownComponent from "../dropdown";
import ButtonComponent from "./btnComponent";

const ExteriorWindowMeasures = ({ navigation }) => {
    const tempWindowIndex = useSelector(state => state.measuresData.windowResponse.index);
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail);
    console.log('mdskmckldmsc', selectedData)
    const selectedPhotoData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.additionalDetails?.imgUrls);
    const tempResponse = useSelector(state => state.measuresData?.windowResponse.tempResponse);
    console.log('sdncdjkn kjcnd', tempResponse)
    const details = useSelector(state => state.measuresData.doorWindowData);
    const isUpdating = useSelector(state => state.measuresData.windowResponse.isUpdating)
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const dispatch = useDispatch();
    const Abcd = useSelector(state => state.measuresData.doorWindowData.exteriorMeasures)
    // console.log('dsbchbds', Abcd)
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const selectedMeasurements = tempResponse[tempWindowIndex]?.exteriorMeasures;
    const selectedPhotosData = tempResponse[tempWindowIndex]?.additionalDetails;
    // console.log('sdjckjdsnkdmn', selectedData, tempWindowIndex)
    const [localStep, setLocalStep] = useState(globalStep);
    const [selectedPhotos, setSelectedPhotos] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [extWidth1, setExtWidth1] = useState(0);
    const [extWidth2, setExtWidth2] = useState(0);
    const [extHeight1, setExtHeight1] = useState(0);
    const [extHeight2, setExtHeight2] = useState(0);
    const minuteMeasures = [
        { label: '1/8', value: '1/8' },
        { label: '1/4', value: '1/4' },
        { label: '3/8', value: '3/8' },
        { label: '1/2', value: '1/2' },
        { label: '5/8', value: '5/8' },
        { label: '3/4', value: '3/4' },
        { label: '7/8', value: '7/8' },
    ];
    const [jambDepth, setJambDepth] = useState('');

    useEffect(() => {
        if (selectedData) {
            setExtWidth1(selectedMeasurements?.exteriorMeasurements.unitWidth1);
            setExtWidth2(selectedMeasurements?.exteriorMeasurements.unitWidth2);
            setExtHeight1(selectedMeasurements?.exteriorMeasurements.unitHeight1);
            setExtHeight2(selectedMeasurements?.exteriorMeasurements.unitHeight2);
            setJambDepth(selectedMeasurements?.exteriorMeasurements.finishedDepth);
            setSelectedPhotos(selectedPhotoData?.imgUrls);
            const updateAddOnSelected = selectedMeasurements?.AddOns.map((addOn, index) => addOn.isSelected);
            setCheckedItems(updateAddOnSelected)
        } else if (selectedMeasurements) {
            setExtWidth1(selectedData?.exteriorMeasures?.exteriorMeasurements.unitWidth1);
            setExtWidth2(selectedData?.exteriorMeasures?.exteriorMeasurements.unitWidth2);
            setExtHeight1(selectedData?.exteriorMeasures?.exteriorMeasurements.unitHeight1);
            setExtHeight2(selectedData?.exteriorMeasures?.exteriorMeasurements.unitHeight2);
            setJambDepth(selectedData?.exteriorMeasures?.exteriorMeasurements.finishedDepth);
            const updateAddOnSelected = selectedData?.exteriorMeasures?.AddOns.map((addOn, index) => addOn.isSelected);
            setCheckedItems(updateAddOnSelected);
        }
    }, [selectedData, selectedMeasurements]);

    useEffect(() => {
        setCheckedItems(AddOns.map(addOn => addOn.isSelected));
    }, [AddOns]);
    // console.log('bsjhcjcjkd', selectedMeasurements?.exteriorMeasures)
    // // Monitor changes to selectedPhotos
    // useEffect(() => {
    //     console.log('Updated selectedPhotos:', selectedPhotos);
    // }, [selectedPhotos]);

    // console.log('selectedData imgUrls:', selectedData.additionalDetails?.imgUrls);


    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);

    // console.log('selectedPhotoData', details)


    const Array1 = [{ label: '0', value: '0' }, ...Array.from({ length: 191 }, (_, i) => ({ label: `${i + 10}`, value: `${i + 10}` }))];
    const Array2 = [{ label: '0', value: '0' }, ...Array.from({ length: 143 }, (_, i) => ({ label: `${i + 8}`, value: `${i + 20}` }))];
    const handleBack = () => {
        const newStep = localStep > 0 ? localStep - 1 : 0
        setLocalStep(newStep)
        dispatch(setStep(newStep));
        navigation.goBack();
    };

    const AddOns = useSelector(state => state.measuresData.doorWindowData.exteriorMeasures.AddOns)

    const [checkedItems, setCheckedItems] = useState(AddOns.map(addOn => addOn.isSelected || false));

    const handleCheck = (index) => {
        const updatedCheckedItems = [...checkedItems];
        updatedCheckedItems[index] = !updatedCheckedItems[index];
        setCheckedItems(updatedCheckedItems);
        const updatedAddOns = [...AddOns];
        updatedAddOns[index].isSelected = updatedCheckedItems[index];
        dispatch(updateAddOnSelected({
            index: index,
            isSelected: updatedCheckedItems[index]
        }));
    };

    const renderAddOns = () => {
        return AddOns.map((item, index) => (
            <View key={index} style={{ paddingHorizontal: 5, paddingVertical: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.dropdownHeadings1}>{item.value}</Text>
                <TouchableOpacity onPress={() => handleCheck(index)} style={styles.checkbox}>
                    <Image
                        source={checkedItems[index] == true ? require('../../../assets/icons/check.png') : require('../../../assets/icons/empty-check.png')}
                        style={styles.checkboxImage}
                    />
                    {console.log('dsdcjdnc', checkedItems[index])}
                </TouchableOpacity>
            </View>
        ));
    };

    const handleJambDepthChange = (text) => {
        setJambDepth(text);
    };

    const handleSelectePhotos = (photos) => {
        setSelectedPhotos(photos);
    };

    const handleDispatch = () => {
        const Width = 'Width';
        const Height = 'Height';
        const Depth = 'Depth';
        const unitWidth1 = extWidth1;
        const unitWidth2 = extWidth2;
        const unitHeight1 = extHeight1;
        const unitHeight2 = extHeight2;
        const finishedDepth = jambDepth;
        let sizes = { unitWidth1, unitWidth2, unitHeight1, unitHeight2, finishedDepth, Width, Height, Depth }
        // console.log("testlog", sizes);
        dispatch(setExteriorMeasures(sizes));
        const imgUrls = selectedPhotos.map(photo => ({
            uri: photo.uri,
            name: photo.name,
            size: photo.size,
            path: photo.path,
            type: photo.type,
            width: photo.width,
            height: photo.height
        }));
        selectedPhotos.map(photo => {
            dispatch(addImage({
                uri: photo.uri,
                name: photo.name,
                size: photo.size,
                path: photo.path,
                type: photo.type,
                width: photo.width,
                height: photo.height
            }));
        });

        const updatedDetails = {
            ...details,
            exteriorMeasures: {
                ...details.exteriorMeasures,
                exteriorMeasurements: sizes
            },
            additionalDetails: {
                ...details.additionalDetails,
                imgUrls: imgUrls
            }
        };
        return updatedDetails;
    }

    // console.log('sahababbaj', JSON.stringify(tempResponse))

    const handleDropdownChanges = (type, value) => {
        switch (type) {
            case 'extWidth1':
                setExtWidth1(value.value);
                break;
            case 'extWidth2':
                setExtWidth2(value.value);
                break;
            case 'extHeight1':
                setExtHeight1(value.value);
                break;
            case 'extHeight2':
                setExtHeight2(value.value);
                break;
            default:
                break;
        }
    };

    const disabledData = () => {
        if (!extWidth1 || !extWidth2) {
            return "Please Select Frame Width"

        } else if (!extHeight1 || !extHeight2) {
            return "Please Select Frame Height"

        } else if (selectedPhotos?.length == 0) {
            return "Please upload Exterior Window Image"
        }
    }
    const handleInteriorBtn = () => {
        if (!extWidth1 || !extWidth2 || !extHeight1 || !extHeight2 || selectedPhotos.length == 0) {
            setModalVisible(true);
        } else {
            const updatedDetails = handleDispatch();
            if (isUpdating) {
                const indexToUpdate = selectedData?.id
                    ? tempResponse.findIndex(resp => resp.id === selectedData?.id)
                    : tempWindowIndex;
                dispatch(updateTempResponse({ index: indexToUpdate, tempIndexResponse: updatedDetails }));
            } else {
                const index = tempWindowIndex + 1;
                dispatch(setResponseIndex(index));
                dispatch(addTempResponse({ tempIndexResponse: updatedDetails }));
            }
            const newStep = localStep + 1;
            setLocalStep(newStep);
            dispatch(setStep(newStep));
            navigation.navigate('InteriorWindow')
        }
        // console.log('dsbjckdsncds', tempWindowIndex)
    }
    // console.log('dsbjckdsncds', isUpdating)
    const handleAddExterior = () => {
        if (!extWidth1 || !extWidth2 || !extHeight1 || !extHeight2 || selectedPhotos.length == 0) {
            setModalVisible(true);
        } else {
            let updatedDetails = handleDispatch();
            const index = tempWindowIndex + 1;
            dispatch(setResponseIndex(index));
            dispatch(addTempResponse({ tempIndexResponse: updatedDetails }));
            const newStep = localStep > 0 ? localStep - 5 : 0;
            setLocalStep(newStep);
            dispatch(setStep(newStep));
            dispatch(clearTempWindow());
            navigation.navigate('WindowFloor');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#4899F1" }}>
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
                <View style={{ flex: 1, backgroundColor: 'white', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
                    <QuestionRender step={globalStep} />
                    <ScrollView style={{ paddingHorizontal: 15 }}>
                        <View style={styles.frameView}>
                            <Text style={styles.dropdownHeadings}>Frame Size</Text>
                            <Text style={styles.dropdownHeadings1}>Unit Width</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array1}
                                    mode='modal'
                                    search={true}
                                    value={extWidth1}
                                    onChange={value => handleDropdownChanges('extWidth1', value)}
                                />
                                <View style={{ flex: 0.3 }}></View>
                                <DropdownComponent
                                    data={minuteMeasures}
                                    value={extWidth2}
                                    mode='modal'
                                    onChange={value => handleDropdownChanges('extWidth2', value)}
                                />
                            </View>
                            <Text style={styles.dropdownHeadings1}>Unit Height</Text>
                            <View style={styles.dataView}>

                                <DropdownComponent
                                    data={Array2}
                                    value={extHeight1}
                                    search={true}
                                    mode='modal'
                                    onChange={value => handleDropdownChanges('extHeight1', value)}
                                />
                                <View style={{ flex: 0.3 }}></View>
                                <DropdownComponent
                                    data={minuteMeasures}
                                    value={extHeight2}
                                    mode='modal'
                                    onChange={value => handleDropdownChanges('extHeight2', value)}
                                />
                            </View>

                        </View>
                        <View style={[styles.textInputView, { paddingHorizontal: 15 }]}>
                            <Text style={styles.jambHeading}>Jamb Depth</Text>
                            <Text style={styles.dropdownHeadings1}>Unit Depth</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.jambText}
                                    placeholder="Jamb Depth"
                                    placeholderTextColor={'grey'}
                                    value={jambDepth}
                                    onChangeText={handleJambDepthChange}
                                />
                                <View style={{ flex: 1.5 }}></View>
                            </View>
                        </View>
                        <View style={[styles.textInputView, { paddingHorizontal: 15 }]}>
                            <Text style={styles.dropdownHeadings}>Choose Any Add-On(s):</Text>
                            <Linear />
                            {renderAddOns()}
                        </View>
                        <View style={styles.textInputView}>
                            <OpenCamera onSelectPhotos={handleSelectePhotos} />
                        </View>
                    </ScrollView>
                </View>
                {isUpdating ?
                    (<View style={{ paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => handleInteriorBtn()}
                        >
                            <Text style={styles.cancelText}>Continue with Interior</Text>
                        </TouchableOpacity>
                    </View>)
                    :
                    (<View style={{ paddingVertical: 10, paddingHorizontal: 15, flexDirection: 'row' }}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => handleInteriorBtn()}
                        >
                            <Text style={styles.cancelText}>Continue with Interior</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 0.5 }}></View>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => handleAddExterior()}
                        >
                            <Text style={styles.cancelText}>Add New Exterior</Text>
                        </TouchableOpacity>
                    </View>)
                }
                <GlobalModal
                    visible={modalVisible}
                    title={disabledData()}
                    okText="Ok"
                    onOk={() => setModalVisible(false)}
                />
            </ImageBackground>
        </View >
    )
}

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 15
    },
    touchableView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    templateName: {
        fontSize: 28,
        fontFamily: Fonts.FONTS_MEDIUM,
        top: 4,
        color: 'black',
        left: 10
    },
    flexView: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 19,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#4989EE',
    },
    dropDownMainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    frameView: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginBottom: 20,
        borderWidth: 1
    },
    dropdownHeadings: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#497FD1',
        marginBottom: 10
    },
    dropdownHeadings1: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_REGULAR,
        color: '#5D5D5D'
    },
    dropdownView: {
        flexDirection: 'column',
        marginBottom: 10
    },
    dataView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdownIndexView: {
        flex: 1
    },
    dropdown: {
        width: '100%',
        height: 45,
        borderRadius: 8,
        borderColor: '#B3B3B3',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white'
    },
    dropdownContainer: {
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    textInputView: {
        paddingVertical: 10,
        // paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        color: 'black'
    },
    jambHeading: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#497FD1',
        marginBottom: 10
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30
    },
    checkboxImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 15
    },
    touchableView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    backImage: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    templateName: {
        fontSize: 28,
        fontFamily: Fonts.FONTS_MEDIUM,
        top: 4,
        color: 'black',
        left: 10
    },
    flexView: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'white'
    },
    headerText: {
        fontSize: 19,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF'
    },
    dropdownView: {
        // borderWidth: 1,
        // paddingVertical: 10,
        // paddingHorizontal: 10,
        // marginBottom: 20,
        // borderRadius: 10,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        // paddingHorizontal: 15
    },
    frameView: {
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        borderRadius: 10,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        // paddingHorizontal: 15
    },
    dropdownHeadings: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#498DEF',
        marginTop: 5
    },
    dropdownHeadings1: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 6,
        color: 'black'
    },
    dropdownSubheadings: {
        fontSize: 15,
        // fontWeight: 'bold',
        marginBottom: 6,
        color: 'black'
    },
    dataView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderRadius: 8
    },
    dropdownIndexView: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(31, 36, 40, 0.30)',
    },
    dropdown: {
        height: 40,
        backgroundColor: 'white',
        borderBottomColor: 'gray',
        // borderBottomWidth: 1,
        width: '100%',
        paddingHorizontal: 8,
        borderRadius: 8
    },
    dropdownContainer: {
        width: 100
    },
    textInputView: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        // paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20
    },
    jambHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#498DEF'
    },
    jambText: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 6,
        fontFamily: Fonts.FONTS_REGULAR,
        fontSize: 16,
        color: 'black'
    },
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    bottomSheetContent: {
        backgroundColor: 'white',
        padding: 20
    },
    checkbox: {
        padding: 5,
        marginLeft: 18,
        bottom: 3

    },
    checkboxImage: {
        width: 20,
        height: 20,
    },
    cancelBtn: {
        flex: 1,
        backgroundColor: '#498DEF',
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: 'center',

    },
    cancelText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'white',
        textAlign: 'center'
    },
});

export default ExteriorWindowMeasures;
