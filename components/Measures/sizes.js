import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, ScrollView, StyleSheet, ImageBackground, TextInput } from 'react-native';
import Fonts from '../../src/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRender from './questionRender';
import { setOption, setMeasurements, setStep, updateAdditionalQuestions, addAdditionalNotes } from '../redux/measures';
import AdditionalQuestion from './additionalQuestion';
import RBSheet from 'react-native-raw-bottom-sheet';
import NonStandard1 from './nonStandardSizes';
import ButtonComponent from './Windows/btnComponent';

const Sizes = ({ navigation }) => {
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail);
    // console.log('selectedData', selectedData)
    const globalStep = useSelector(state => state.measuresData?.doorWindowData?.step);
    const [localStep, setLocalStep] = useState(globalStep);
    const refRBSheet = useRef();
    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData?.doorWindowData?.selectedTemplate);
    const questions = useSelector(state => state.measuresData?.doorWindowData?.addQuestions);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [toggleVaues, setToggleVaues] = useState({});
    const [additionalNote, setAdditionalNote] = useState('');
    const selectedOption = useSelector(state => state.measuresData?.doorWindowData?.selectedOptions)
    const details = useSelector(state => state.measuresData?.doorWindowData)
    const standardData = useSelector(state => {
        if (templateName.templateId === '01') {
            return state.stormsecurityOptionsData.stormOptionArray.standardSizeData
        } else if (templateName.templateId === '02') {
            return state.exteriorOptionsData.optionArray.standardSizeData
        }
    });
    const [standardSizeData, setStandardSizeData] = useState(standardData);

    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);

    useEffect(() => {
        if (details) {
            if (details?.selectedOptions) {
                setSelectedOptionId(details?.selectedOptions?.[localStep]?.optionId)
            }
            setAdditionalNote(details?.additionalDetails?.additionalNotes);
        } else if (selectedData) {
            if (selectedData?.selectedOptions) {
                setSelectedOptionId(selectedData?.selectedOptions?.[localStep]?.optionId);
            }
            setAdditionalNote(selectedData?.additionalDetails?.additionalQuestions);
        }
    }, [selectedData, details, localStep]);

    const handleBack = () => {
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        switch (templateName?.templateId) {
            case '01':
                navigation.navigate('TypeData')
                break;
            case '02':
                navigation.navigate('DoorHandlingData');
        };
    }

    const handleTextChange = (item) => {
        setAdditionalNote(item)
    }

    const handleOptionClick = (item) => {
        const { optionsId, value, frameH1, frameH2, frameW1, frameW2, roughW, roughH, depthS, height, width } = item;
        if (selectedOptionId !== optionsId || selectedOptionId === optionsId) {
            const questionId = questions[localStep].questionId;
            const question = questions[localStep].questionValue;

            dispatch(setOption({
                step: localStep,
                questionId,
                optionId: optionsId,
                optionValue: value == 'Non-Standard Size/Special Order' ? 'Non-Standard Size' : value,
                question,
            }));
        }
        setSelectedOptionId(optionsId);

        if (templateName.templateId === '02') {
            if (optionsId !== 5) {
                const Width = 'Width';
                const Height = 'Height';
                const Depth = 'Depth';
                const RoughHeight = 'Rough Height';
                const RoughWidth = 'Rough Width';
                dispatch(setMeasurements({
                    jambDepth: depthS,
                    frameHeight1: frameH1,
                    frameHeight2: frameH2,
                    frameWidth1: frameW1,
                    frameWidth2: frameW2,
                    roughHeight1: roughH,
                    roughWidth1: roughW,
                    Width,
                    Height,
                    Depth,
                    RoughWidth,
                    RoughHeight
                }));
                refRBSheet.current.open();
            } else {
                navigation.navigate('NonStandardE&I')
            }
        } else if (templateName.templateId === '01') {
            if (optionsId !== 3) {
                const Width = 'Width';
                const Height = 'Height';
                dispatch(setMeasurements({
                    Width,
                    Height,
                    frameHeight1: height,
                    frameWidth1: width
                }));
                refRBSheet.current.open();
            } else (
                navigation.navigate('NonStandardStorm')
            )
        } else {
            console.log('No data')
        }
    }

    const handleContinue = () => {
        dispatch(addAdditionalNotes(additionalNote));
        const newStep = localStep + 1;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        refRBSheet.current.close();
        navigation.navigate('AddDetails');
    }
    const renderItem = ({ item }) => {
        const isSelected = selectedOptionId === item.optionsId;
        const isNonStandard = item.value === 'Non-Standard Size/Special Order';
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                    style={[
                        styles.optionButton,
                        isSelected && isNonStandard ? styles.selectedNonStandardOption :
                            isSelected ? styles.selectedOption :
                                isNonStandard ? styles.unselectedNonStandardOption : styles.unselectedOption
                    ]}
                    onPress={() => handleOptionClick(item)}
                >
                    {isNonStandard ? (
                        <Text style={[styles.optionText, isSelected ? styles.selectedNonStandardText : styles.unselectedNonStandardText]} numberOfLines={1}>
                            {item.value}
                        </Text>
                    ) : (
                        templateName.templateId === '02' ? (
                            <View style={styles.optionContent}>
                                <View style={[styles.optionHeader, isSelected ? styles.selectedHeader : styles.unselectedHeader]}>
                                    <Text style={[styles.optionHeaderText, isSelected ? styles.selectedHeaderText : styles.unselectedHeaderText]}>
                                        {item.value}
                                    </Text>
                                </View>
                                <View style={styles.optionDetails}>
                                    <Text style={[styles.optionText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.text}({item.type})</Text>
                                    <View style={styles.detailRow}>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.frameSize} :</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.frameH1}</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>({item.frameH2})</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>X{item.frameW1}</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>({item.frameW2})</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.roughSize} :</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.roughH}</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>X</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.roughW}</Text>
                                    </View>
                                    <View style={styles.detailRow}>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.standardSize} :</Text>
                                        <Text style={[styles.randomText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.depthS}</Text>
                                    </View>
                                </View>
                            </View>
                        ) : (<View>
                            <View style={[styles.optionHeader, isSelected ? styles.selectedHeader : styles.unselectedHeader]}>
                                <Text style={[styles.optionHeaderText, isSelected ? styles.selectedHeaderText : styles.unselectedHeaderText]}>
                                    {item.value}
                                </Text>
                            </View>
                            <Text style={[styles.optionText, isSelected ? styles.selectedText : styles.unselectedText]}>{item.height} X {item.width} {selectedOption[1]?.optionValue}</Text>

                        </View>)
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={styles.container}>
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
                <View style={styles.content}>
                    <QuestionRender step={globalStep} />
                    <FlatList
                        data={standardSizeData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.optionsId.toString()}
                    />
                    <RBSheet
                        ref={refRBSheet}
                        // height={1000}
                        // openDuration={250}
                        customStyles={{
                            container: styles.bottomSheetContainer
                        }}
                        customModalProps={{
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
                                        onChangeText={(item) => handleTextChange(item)}
                                        multiline={true}
                                        numberOfLines={6}
                                    />
                                </View>
                                {console.log('sbjbsjcnjkdsncd', additionalNote)}
                                <TouchableOpacity onPress={handleContinue} style={styles.continueButton}>
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
    container: { flex: 1, backgroundColor: "#4899F1" },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingTop: 30, paddingHorizontal: 15 },
    backIcon: { width: 20, height: 20, resizeMode: 'contain' },
    headerTitle: { fontSize: 28, fontFamily: Fonts.FONTS_MEDIUM, top: 4, color: 'black', left: 10 },
    content: { flex: 1, backgroundColor: 'white', borderRadius: 8 },
    itemContainer: { paddingHorizontal: 10, margin: 10 },
    optionButton: { paddingVertical: 20, borderRadius: 8, paddingHorizontal: 15 },
    selectedOption: { backgroundColor: '#498DEF', borderColor: '#498DEF' },
    unselectedOption: { backgroundColor: '#E4EFFF', borderColor: '#E4EFFF' },
    selectedNonStandardOption: { backgroundColor: '#498DEF', borderColor: '#498DEF' },
    unselectedNonStandardOption: { backgroundColor: 'white', borderColor: '#498DEF', borderWidth: 1 },
    optionContent: { flex: 1, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10 },
    optionHeader: {
        bottom: 30, padding: 2, borderTopRightRadius: 10, borderBottomStartRadius: 10,
        alignSelf: 'flex-end', width: 140, alignItems: "center", marginBottom: -10, left: 25
    },
    selectedHeader: { backgroundColor: 'white' },
    unselectedHeader: { backgroundColor: '#498DEF' },
    optionHeaderText: { fontSize: 15, fontFamily: Fonts.FONTS_REGULAR },
    selectedHeaderText: { color: '#498DEF' },
    unselectedHeaderText: { color: 'white' },
    optionDetails: { bottom: 18 },
    optionText: { fontSize: 18, paddingVertical: 5, fontFamily: Fonts.FONTS_MEDIUM },
    randomText: { fontSize: 15, color: 'red', paddingVertical: 5, fontFamily: Fonts.FONTS_MEDIUM },
    selectedText: { color: 'white' },
    unselectedText: { color: 'black' },
    selectedNonStandardText: { color: 'white' },
    unselectedNonStandardText: { color: '#498DEF' },
    detailRow: { flexDirection: 'row', paddingVertical: 5 },
    bottomSheetContainer: { backgroundColor: "rgba(0,0,0,0.5)", borderTopRightRadius: 20, borderTopLeftRadius: 20, height: '72%' },
    bottomSheetContent: { backgroundColor: 'white', padding: 20 },
    continueButtonContainer: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#498DEF', borderRadius: 8 },
    continueButton: { backgroundColor: '#498DEF', paddingHorizontal: 30, paddingVertical: 10, borderRadius: 8 },
    continueButtonText: { color: 'white', fontSize: 18, fontFamily: Fonts.FONTS_BOLD, textAlign: 'center' }
});

export default Sizes;
