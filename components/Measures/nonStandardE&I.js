import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // import Dropdown
import { useDispatch, useSelector } from 'react-redux';
import { setMeasurements, setStep, setOption } from '../redux/measures';
import Fonts from '../../src/fonts/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import AdditionalQuestion from './additionalQuestion';
import DropdownComponent from './dropdown';
import { QueryStatus } from '@reduxjs/toolkit/query';
import ButtonComponent from './Windows/btnComponent';

const NonStandard2 = ({ navigation, route }) => {
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const details = useSelector(state => state.measuresData?.doorWindowData);

    const [localStep, setLocalStep] = useState(globalStep);
    const [jambDepth, setJambDepth] = useState('');
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [eiFrameHeight1, setEIFrameHeight1] = useState(0);
    const [eiFrameHeight2, setEIFrameHeight2] = useState(0);
    const [eiFrameWidth1, setEIFrameWidth1] = useState(0);
    const [eiFrameWidth2, setEIFrameWidth2] = useState(0);
    const [eiRoughWidth1, setEIRoughWidth1] = useState(0);
    const [eiRoughWidth2, setEIRoughWidth2] = useState(0);
    const [eiRoughHeight1, setEIRoughHeight1] = useState(0);
    const [eiRoughHeight2, setEIRoughHeight2] = useState(0);
    const [additionalNote, setAdditionalNote] = useState({});
    const selectedMeasurements = useSelector(state => state.measuresData.doorWindowData.selectedMeasurements);
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const refRBSheet = useRef();

    const dispatch = useDispatch();
    console.log('vdshcvdsh', selectedMeasurements)
    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);
    const minuteMeasures = [
        { label: '0', value: '0' },
        { label: '1/8', value: '1/8' },
        { label: '1/4', value: '1/4' },
        { label: '3/8', value: '3/8' },
        { label: '1/2', value: '1/2' },
        { label: '5/8', value: '5/8' },
        { label: '3/4', value: '3/4' },
        { label: '7/8', value: '7/8' },
    ];
    const Array1 = [{ label: '0', value: '0' }, ...Array.from({ length: 91 }, (_, i) => ({ label: `${i + 60}`, value: `${i + 60}` }))];
    const Array2 = [{ label: '0', value: '0' }, ...Array.from({ length: 181 }, (_, i) => ({ label: `${i + 20}`, value: `${i + 20}` }))];

    useEffect(() => {
        if (selectedMeasurements) {
            setEIFrameWidth1(selectedMeasurements.frameWidth1);
            setEIFrameWidth2(selectedMeasurements.frameWidth2);
            setEIFrameHeight1(selectedMeasurements.frameHeight1);
            setEIFrameHeight2(selectedMeasurements.frameHeight2);
            setEIRoughWidth1(selectedMeasurements.roughWidth1);
            setEIRoughWidth2(selectedMeasurements.roughWidth2);
            setEIRoughHeight1(selectedMeasurements.roughHeight1);
            setEIRoughHeight2(selectedMeasurements.roughHeight2);
            setJambDepth(selectedMeasurements.jambDepth)
        }
    }, [selectedMeasurements]);

    const handleDropdownChange = (type, value) => {
        switch (type) {
            case 'eiFrameHeight1':
                setEIFrameHeight1(value.value);
                break;
            case 'eiFrameHeight2':
                setEIFrameHeight2(value.value);
                break;
            case 'eiFrameWidth1':
                setEIFrameWidth1(value.value);
                break;
            case 'eiFrameWidth2':
                setEIFrameWidth2(value.value);
                break;
            case 'eiRoughHeight1':
                setEIRoughHeight1(value.value);
                break;
            case 'eiRoughHeight2':
                setEIRoughHeight2(value.value);
                break;
            case 'eiRoughWidth1':
                setEIRoughWidth1(value.value);
                break;
            case 'eiRoughWidth2':
                setEIRoughWidth2(value.value);
                break;
            default:
                break;
        }
    };

    const handleJambDepthChange = (text) => {
        setJambDepth(text);
    };

    const handleTextChange = (text) => {
        setAdditionalNote(text);
    }

    const handleBack = () => {
        if (details?.selectedOptions[1]?.optionId === 1)
            navigation.navigate('Size');
        else {
            const newStep = localStep > 0 ? localStep - 1 : 0;
            setLocalStep(newStep);
            dispatch(setStep(newStep));
            navigation.navigate('DoorHandlingData')
        }
    };
    const handleSubmit = () => {
        refRBSheet.current.open();
    }

    const handleContinue = () => {
        // const changesMade = Object.keys(selectedValues).length == 0;
        const Width = 'Width';
        const Height = 'Height';
        const Depth = 'Depth';
        const RoughWidth = 'Rough Width';
        const RoughHeight = 'Rough Height';

        const frameWidth1 = eiFrameWidth1 ? eiFrameWidth1 : '0';
        const frameWidth2 = eiFrameWidth2 ? eiFrameWidth2 : '0';
        const frameHeight1 = eiFrameHeight1 ? eiFrameHeight1 : '0';
        const frameHeight2 = eiFrameHeight2 ? eiFrameHeight2 : '0';
        const roughWidth1 = eiRoughWidth1 ? eiRoughWidth1 : '0';
        const roughWidth2 = eiRoughWidth2 ? eiRoughWidth2 : '0';
        const roughHeight1 = eiRoughHeight1 ? eiRoughHeight1 : '0';
        const roughHeight2 = eiRoughHeight2 ? eiRoughHeight2 : '0';

        let sizes = {
            frameHeight1, frameHeight2, frameWidth1, frameWidth2, jambDepth, roughWidth1, roughWidth2, roughHeight1, roughHeight2, Width, Height, Depth, RoughHeight, RoughWidth
        };
        dispatch(setMeasurements(sizes))
        if (details?.selectedOptions[1]?.optionsId !== 1) {
            const questionId = questions[localStep].questionId;
            const question = questions[localStep].questionValue;
            dispatch(setOption({
                step: localStep,
                questionId,
                optionId: 5,
                optionValue: 'Non Standard Size',
                question,
            }));
        }
        const newStep = localStep + 1;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        refRBSheet.current.close();
        navigation.navigate('AddDetails');
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: StatusBar.currentHeight, paddingHorizontal: 15, paddingBottom: 15 }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image
                            source={require('../../assets/icons/arrowright_.png')}
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
                <View style={styles.flexView}>
                    <Text style={styles.headerText}>Non-Standard Size Form</Text>
                    <ScrollView>
                        <View style={styles.dropdownView}>
                            <Text style={styles.dropdownHeadings}>Frame Width</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array1}
                                    mode='modal'
                                    search={true}
                                    value={eiFrameWidth1}
                                    onChange={value => handleDropdownChange('eiFrameWidth1', value)}
                                />
                                <View style={{ flex: .3 }} />
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={eiFrameWidth2}
                                    onChange={value => handleDropdownChange('eiFrameWidth2', value)}
                                />
                            </View>
                        </View>
                        <View style={styles.dropdownView}>
                            <Text style={styles.dropdownHeadings}>Frame Height</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array2}
                                    mode='modal'
                                    search={true}
                                    value={eiFrameHeight1}
                                    onChange={value => handleDropdownChange('eiFrameHeight1', value)}
                                />
                                <View style={{ flex: .3 }} />
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={eiFrameHeight2}
                                    onChange={value => handleDropdownChange('eiFrameHeight2', value)}
                                />
                                {console.log('dgchjgdschsdhfcghdfs', eiFrameHeight1, eiFrameHeight2, eiFrameWidth1, eiFrameWidth2)}
                            </View>
                        </View>
                        <View style={styles.textInputView}>
                            <Text style={styles.jambHeading}>Jamb Depth</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={styles.jambText}
                                    placeholder="Jamb Depth"
                                    placeholderTextColor={'grey'}
                                    value={jambDepth}
                                    onChangeText={handleJambDepthChange}
                                />
                                <View style={{ flex: 1.6 }}></View>
                            </View>
                        </View>
                        <View style={styles.dropdownView}>
                            <Text style={styles.dropdownHeadings}>Rough Width</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array1}
                                    mode='modal'
                                    search={true}
                                    value={eiRoughWidth1}
                                    onChange={value => handleDropdownChange('eiRoughWidth1', value)}
                                />
                                <View style={{ flex: .3 }} />
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={eiRoughWidth2}
                                    onChange={value => handleDropdownChange('eiRoughWidth2', value)}
                                />
                            </View>
                        </View>
                        <View style={styles.dropdownView}>
                            <Text style={styles.dropdownHeadings}>Rough Height</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array2}
                                    mode='modal'
                                    search={true}
                                    value={eiRoughHeight1}
                                    onChange={value => handleDropdownChange('eiRoughHeight1', value)}
                                />
                                <View style={{ flex: .3 }} />
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={eiRoughHeight2}
                                    onChange={value => handleDropdownChange('eiRoughHeight2', value)}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => handleSubmit()}
                    >
                        <Text style={styles.btnText}>Continue</Text>
                    </TouchableOpacity>
                    <RBSheet
                        ref={refRBSheet}
                        height={400}
                        openDuration={250}
                        customStyles={{
                            container: styles.bottomSheetContainer
                        }}
                        customModalProps={{
                            animationType: 'slide',
                            statusBarTranslucent: true,
                        }}
                    >
                        <View style={styles.bottomSheetContent}>
                            <ScrollView>
                                <AdditionalQuestion />
                                <View style={{ paddingBottom: 10 }}>
                                    <Text style={{ fontSize: 18, fontFamily: Fonts.FONTS_MEDIUM, color: 'black' }}>
                                        Additional Note
                                    </Text>
                                    <TextInput
                                        style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ccc', paddingHorizontal: 10, fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, textAlignVertical: 'top', color: 'black', }}
                                        placeholder="Additional Notes"
                                        placeholderTextColor='black'
                                        value={additionalNote}
                                        onChangeText={(text) => handleTextChange(text)}
                                        multiline={true}
                                        numberOfLines={6}
                                    />
                                </View>
                                <TouchableOpacity
                                    onPress={() => handleContinue()} style={styles.continueButton}>
                                    <Text style={styles.continueButtonText}>Continue</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </RBSheet>
                </View>
            </ImageBackground>
        </View>
    );
};

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
        color: '#498DEF'
    },
    dropdownView: {
        paddingHorizontal: 15,
        paddingVertical: 8,
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
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#498DEF'
    },
    dropdownSubheadings: {
        fontSize: 14,
        // fontWeight: 'bold',
        marginBottom: 10,
        color: 'black'
    },
    dataView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 10,
    },

    textInputView: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        paddingHorizontal: 15,
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
    btnView: {
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingHorizontal: 15
    },
    continueBtn: {
        flex: 1,
        backgroundColor: '#498DEF',
        paddingVertical: 20,
        borderRadius: 10,
        bottom: 10,
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'white'
    },
    bottomSheetContainer: {
        backgroundColor: "rgba(0,0,0,0.5)",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '70%'
    },
    bottomSheetContent: {
        backgroundColor: 'white',
        padding: 20
    },
    continueButton: {
        backgroundColor: '#498DEF',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 8
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: Fonts.FONTS_BOLD,
        textAlign: 'center'
    }
});
export default NonStandard2;
