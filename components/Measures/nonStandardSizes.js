import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // import Dropdown
import { useDispatch, useSelector } from 'react-redux';
import { setMeasurements, setStep, setOption } from '../redux/measures';
import Fonts from '../../src/fonts/fonts';
import RBSheet from 'react-native-raw-bottom-sheet';
import AdditionalQuestion from './additionalQuestion';
import DropdownComponent from './dropdown';

const NonStandard1 = ({ navigation, route }) => {
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const [localStep, setLocalStep] = useState(globalStep);
    const [jambDepth, setJambDepth] = useState('');
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [stormHeight1, setStormHeight1] = useState(0);
    const [stormHeight2, setStormHeight2] = useState(0);
    const [stormWidth1, setStormWidth1] = useState(0);
    const [stormWidth2, setStormWidth2] = useState(0);
    const [additionalNote, setAdditionalNote] = useState('');
    const selectedMeasurements = useSelector(state => state.measuresData.doorWindowData.selectedMeasurements);
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const refRBSheet = useRef();

    const dispatch = useDispatch();
    console.log('vdshcvdsh', selectedMeasurements)

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
            setStormWidth1(selectedMeasurements.frameWidth1);
            setStormWidth2(selectedMeasurements.frameWidth2);
            setStormHeight1(selectedMeasurements.frameHeight1);
            setStormHeight2(selectedMeasurements.frameHeight2);
            setJambDepth(selectedMeasurements.jambDepth);
        }
    }, [selectedMeasurements]);

    const handleDropdownChange = (type, value) => {
        switch (type) {
            case 'stormHeight1':
                setStormHeight1(value.value);
                break;
            case 'stormHeight2':
                setStormHeight2(value.value);
                break;
            case 'stormWidth1':
                setStormWidth1(value.value);
                break;
            case 'stormWidth2':
                setStormWidth2(value.value);
                break;
            default:
                break;
        }
    };

    const handleTextChange = (text) => {
        setAdditionalNote(text)
    }

    const handleJambDepthChange = (text) => {
        setJambDepth(text);
    };

    const handleBack = () => {
        if (templateName.templateId === '02') {
            const newStep = localStep > 0 ? localStep - 2 : 0;
            setLocalStep(newStep);
            dispatch(setStep(newStep));
        }
        navigation.goBack();
    };
    const handleSubmit = () => {
        refRBSheet.current.open();
    }

    const handleContinue = () => {
        // const changesMade = Object.keys(selectedValues).length == 0;
        const Width = 'Width';
        const Height = 'Height';
        const Depth = 'Depth';


        const frameWidth1 = stormWidth1 ? stormWidth1 : '0';
        const frameWidth2 = stormWidth2 ? stormWidth2 : '0';
        const frameHeight1 = stormHeight1 ? stormHeight1 : '0';
        const frameHeight2 = stormHeight2 ? stormHeight2 : '0';
        let sizes = {
            frameHeight1, frameHeight2, frameWidth1, frameWidth2, jambDepth, Width, Height, Depth
        };
        dispatch(setMeasurements(sizes))
        console.log('dvchjdcbd', sizes)
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
                <View style={styles.mainView}>
                    <View style={styles.touchableView}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image
                                source={require('../../assets/icons/arrowright_.png')}
                                style={styles.backImage}
                            />
                        </TouchableOpacity>
                        <Text style={styles.templateName}>{templateName.value}</Text>
                    </View>
                </View>
                <View style={styles.flexView}>
                    <Text style={styles.headerText}>Non-Standard Size Form</Text>
                    <ScrollView>
                        <View style={styles.dropdownView}>
                            <Text style={styles.dropdownHeadings}>Opening Width</Text>
                            <Text style={styles.dropdownSubheadings}>(Smallest Nominal Width)</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array1}
                                    mode='modal'
                                    search={true}
                                    value={stormWidth1}
                                    onChange={value => handleDropdownChange('stormWidth1', value)}
                                />
                                <View style={{ flex: .3 }} />
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={stormWidth2}
                                    onChange={value => handleDropdownChange('stormWidth2', value)}
                                />
                            </View>
                        </View>
                        <View style={styles.dropdownView}>
                            <Text style={styles.dropdownHeadings}>Opening Height</Text>
                            <Text style={styles.dropdownSubheadings}>(Smallest Nominal Height)</Text>
                            <View style={styles.dataView}>
                                <DropdownComponent
                                    data={Array2}
                                    mode='modal'
                                    search={true}
                                    value={stormHeight1}
                                    onChange={value => handleDropdownChange('stormHeight1', value)}
                                />
                                <View style={{ flex: .3 }} />
                                <DropdownComponent
                                    data={minuteMeasures}
                                    mode='modal'
                                    value={stormHeight2}
                                    onChange={value => handleDropdownChange('stormHeight2', value)}
                                />
                                {/* {console.log('dgchjgdschsdhfcghdfs', stormWidth1, stormWidth2, stormHeight1, stormHeight2)} */}
                            </View>
                        </View>
                        <View style={styles.textInputView}>
                            <Text style={styles.jambHeading}>Opening Depth</Text>
                            <Text style={styles.dropdownSubheadings}>(1'Minimum)</Text>
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
                                        onChangeText={() => handleTextChange()}
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
        height: '72%'
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
export default NonStandard1;
