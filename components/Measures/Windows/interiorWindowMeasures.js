import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, TextInput, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import Fonts from '../../../src/fonts/fonts';
import { addAdditionalNotes, addElseNeeded, addInteriorFinish, addRoomName, changeIsUpdating, setInteriorMeasures, setStep, updateTempResponse } from '../../redux/measures';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRender from '../questionRender';
import WindowMultipleSelection from './windowMultipleSelections';
import DropdownComponent from '../dropdown';
import GlobalModal from '../../globalModal';
import ButtonComponent from './btnComponent';

const InteriorWindow = ({ navigation }) => {
    const tempWindowIndex = useSelector(state => state.measuresData.windowResponse.index);
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.interiorMeasures);
    const tempResponse = useSelector(state => state.measuresData.windowResponse.tempResponse);
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const details = useSelector(state => state.measuresData.doorWindowData);
    const [localStep, setLocalStep] = useState(globalStep);
    const globalUpdate = useSelector(state => state.measuresData.windowResponse.isUpdating);
    const [localUpdate, setLocalUpdate] = useState(globalUpdate);
    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const selectedOptions = useSelector(state => state.measuresData?.doorWindowData.selectedOptions);
    const [roomName, setRoomName] = useState('');
    const selectedMeasurements = tempResponse[tempWindowIndex]?.interiorMeasures
    const addDetails = tempResponse[tempWindowIndex]?.additionalDetails;
    const addData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail)

    const [finishedDepth, setFinishedDepth] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [interiorFinish, setInteriorFinish] = useState([]);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [intWidth1, setIntWidth1] = useState(0);
    const [intWidth2, setIntWidth2] = useState(0);
    const [intHeight1, setIntHeight1] = useState(0);
    const [intHeight2, setIntHeight2] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    // console.log('dvcjdsbjcksd', JSON.stringify(tempResponse))

    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);
    useEffect(() => {
        if (selectedData) {
            setIntWidth1(selectedData?.interiorMeasurements?.unitWidth1);
            setIntWidth2(selectedData?.interiorMeasurements?.unitWidth2);
            setIntHeight1(selectedData?.interiorMeasurements?.unitHeight1);
            setIntHeight2(selectedData?.interiorMeasurements?.unitHeight2);
            setFinishedDepth(selectedData?.interiorMeasurements?.finishedDepth)
            setRoomName(selectedData?.roomName);
            setSelectedItems(selectedData?.additionalInteriorMeasures?.elseNeeded);
            setInteriorFinish(selectedData?.additionalInteriorMeasures?.interiorFinish);
            setAdditionalNotes(addData?.additionalDetails?.additionalNotes);
        } else if (selectedMeasurements) {
            setIntWidth1(selectedMeasurements?.interiorMeasurements?.unitWidth1);
            setIntWidth2(selectedMeasurements?.interiorMeasurements?.unitWidth2);
            setIntHeight1(selectedMeasurements?.interiorMeasurements?.unitHeight1);
            setIntHeight2(selectedMeasurements?.interiorMeasurements?.unitHeight2);
            setFinishedDepth(selectedMeasurements?.interiorMeasurements?.finishedDepth);
            setRoomName(selectedMeasurements?.roomName);
            setAdditionalNotes(addDetails?.additionalNotes);
        }
    }, [selectedData, selectedMeasurements]);

    const minuteMeasures = [
        { label: '1/8', value: '1/8' },
        { label: '1/4', value: '1/4' },
        { label: '3/8', value: '3/8' },
        { label: '1/2', value: '1/2' },
        { label: '5/8', value: '5/8' },
        { label: '3/4', value: '3/4' },
        { label: '7/8', value: '7/8' },
    ];

    const Array1 = [{ label: '0', value: '0' }, ...Array.from({ length: 191 }, (_, i) => ({ label: `${i + 10}`, value: `${i + 10}` }))];
    const Array2 = [{ label: '0', value: '0' }, ...Array.from({ length: 143 }, (_, i) => ({ label: `${i + 8}`, value: `${i + 20}` }))];

    const unitValue = `${tempResponse[tempWindowIndex]?.selectedOptions[1]?.optionValue[0]}${tempResponse[tempWindowIndex]?.selectedOptions[2]?.optionValue[0]}${tempResponse[tempWindowIndex]?.selectedOptions[3]?.optionValue[0]}`;
    const handleBack = () => {
        if (!localUpdate) {
            setLocalUpdate(true);
            dispatch(changeIsUpdating(true));
        }
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep)
        dispatch(setStep(newStep))
        navigation.goBack();
    };

    const handleJambDepthChange = (text) => {
        setRoomName(text);
    };
    const handlefinishedDepthChange = (text) => {
        setFinishedDepth(text);
    };
    const handleAdditionalNotes = (text) => {
        setAdditionalNotes(text);
    };

    const handleDispatch = () => {
        const Width = 'Width';
        const Height = 'Height';
        const Depth = 'Depth';

        const unitWidth1 = intWidth1 ? intWidth1 : '0';
        const unitWidth2 = intWidth2 ? intWidth2 : '0';
        const unitHeight1 = intHeight1 ? intHeight1 : '0';
        const unitHeight2 = intHeight2 ? intHeight2 : '0';
        finishedDepth
        let sizes = { unitWidth1, unitWidth2, unitHeight1, unitHeight2, finishedDepth, Width, Height, Depth }
        dispatch(setInteriorMeasures(sizes));
        const updatedDetails = {
            ...details,
            interiorMeasures: {
                ...details.interiorMeasures,
                interiorMeasurements: sizes,
                roomName: roomName,
                additionalInteriorMeasures: {
                    elseNeeded: selectedItems,
                    interiorFinish: interiorFinish
                }
            },
            additionalDetails: {
                ...details.additionalDetails,
                additionalNotes: additionalNotes
            }
        }
        // console.log('asvgxhjsbdcjndskjc', updatedDetails)
        return updatedDetails;
    }
    const handleContinue = () => {
        if (!roomName) {
            setModalVisible(true);
        } else {
            dispatch(addRoomName(roomName));
            dispatch(addElseNeeded(selectedItems));
            dispatch(addInteriorFinish(interiorFinish));
            dispatch(addAdditionalNotes(additionalNotes));
            let updatedDetails = handleDispatch();
            setLocalStep(localStep + 1);
            dispatch(setStep(localStep + 1))
            const indexToUpdate = selectedData?.id
                ? tempResponse.findIndex(resp => resp.id === selectedData.id)
                : tempWindowIndex;
            dispatch(updateTempResponse({ index: indexToUpdate, tempIndexResponse: updatedDetails }));
            navigation.navigate('WindowsAddDetails');
        }
    }

    const handleDropdownChanges = (type, value) => {
        switch (type) {
            case 'intWidth1':
                setIntWidth1(value.value);
                break;
            case 'intWidth2':
                setIntWidth2(value.value);
                break;
            case 'intHeight1':
                setIntHeight1(value.value);
                break;
            case 'intHeight2':
                setIntHeight2(value.value);
                break;
            default:
                break;
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
                <View style={{ flex: 1, backgroundColor: 'white', borderTopRightRadius: 8, borderTopLeftRadius: 8, paddingHorizontal: 15 }}>
                    <QuestionRender step={globalStep} />
                    <ScrollView>
                        <View style={{ justifyContent: "center", flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                            <Text style={{ color: '#498DEF', fontSize: 17, fontWeight: '600' }}>Unit : </Text>
                            <Text style={{ color: '#498DEF', fontSize: 17, fontWeight: '600' }}>{unitValue}</Text>
                        </View>
                        <View style={{ marginBottom: 15 }}>
                            <TextInput
                                style={[styles.jambText, { paddingHorizontal: 20 }]}
                                placeholder="Type Room Name"
                                placeholderTextColor='grey'
                                value={roomName}
                                onChangeText={handleJambDepthChange}
                            />
                        </View>
                        <View style={[styles.textInputView, { paddingHorizontal: 15, paddingVertical: 5, paddingTop: 15, flex: 1 }]}>
                            <Text style={styles.addDetails}>Additional Details</Text>
                            <WindowMultipleSelection
                                onPress={(data) => {
                                    setSelectedItems(data?.selectedItemsNeeded);
                                    setInteriorFinish(data?.interiorFinish)
                                }
                                }
                            />
                            <View style={{ marginBottom: 10 }}>
                                <Text style={styles.label}>Additional Notes</Text>
                                <TextInput
                                    style={styles.jambText}
                                    placeholder="Add Additional Notes"
                                    placeholderTextColor='grey'
                                    value={additionalNotes}
                                    onChangeText={handleAdditionalNotes}
                                    multiline={true}
                                    numberOfLines={6}
                                />
                            </View>
                        </View>
                        <View style={styles.frameView}>
                            <Text style={styles.dropdownHeadings}>Interior Measurments (Optional)</Text>
                            <Text style={styles.dropdownHeadings1}>Unit Width</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array1}
                                    mode='modal'
                                    search={true}
                                    value={intWidth1}
                                    onChange={value => handleDropdownChanges('intWidth1', value)}
                                />
                                <View style={{ flex: 0.3 }}></View>
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={intWidth2}
                                    onChange={value => handleDropdownChanges('intWidth2', value)}
                                />
                            </View>
                            <Text style={styles.dropdownHeadings1}>Unit Height</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array2}
                                    mode='modal'
                                    search={true}
                                    value={intHeight1}
                                    onChange={value => handleDropdownChanges('intHeight1', value)}
                                />

                                <View style={{ flex: 0.3 }}></View>
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={intHeight2}
                                    onChange={value => handleDropdownChanges('intHeight2', value)}
                                />
                            </View>
                            <Text style={styles.dropdownHeadings1}>Finished Depth</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <TextInput
                                        style={styles.jambText}
                                        placeholder="Finished Depth"
                                        value={finishedDepth}
                                        placeholderTextColor='grey'
                                        onChangeText={handlefinishedDepthChange}
                                    />
                                </View>
                                <View style={{ flex: 1.32 }}></View>
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity style={styles.cancelBtn} onPress={() => handleContinue()}>
                            <Text style={styles.cancelText}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <GlobalModal
                    visible={modalVisible}
                    message='Please enter the Room Name'
                    okText='Ok'
                    onOk={() => setModalVisible(false)}
                />
            </ImageBackground>
        </View>
    );
};

export default InteriorWindow;

const styles = StyleSheet.create({
    textInputView: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        // paddingVertical: 10,
        marginBottom: 20
    },
    jambHeading: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#497FD1',
        marginBottom: 10
    },
    jambText: {
        width: '100%',
        height: 45,
        borderRadius: 8,
        borderColor: '#B3B3B3',
        borderWidth: 1,
        paddingHorizontal: 10,
        color: 'black'
        // backgroundColor: 'white',

    },
    addDetails: {
        fontSize: 19,
        // fontWeight: 'bold',
        // marginBottom: 6,
        color: '#498DEF',
        fontFamily: Fonts.FONTS_MEDIUM
    },
    frameView: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: 'rgba(31, 36, 40, 0.30)',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)'
    },
    dropdownHeadings: {
        fontSize: 19,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#497FD1',
        marginBottom: 10
    },
    dropdownHeadings1: {
        fontSize: 15,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black'
    },
    dropdownView: {
        flexDirection: 'column',
        marginBottom: 10
    },
    dataView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
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
    label: {
        fontSize: 15,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    cancelBtn: {
        // flex: 1,
        backgroundColor: '#498DEF',
        paddingVertical: 10,
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
