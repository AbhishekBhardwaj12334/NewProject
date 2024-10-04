import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOption, setStep } from '../../redux/measures';
import { updateDoorHandling } from '../../redux/ext&intOption';  // Import the action
import GlobalBottomSheet from '../globalRBSheet';
import QuestionRender from '../questionRender';
import Fonts from '../../../src/fonts/fonts';
import ButtonComponent from '../Windows/btnComponent';

const DoorHandlingExterior = ({ navigation }) => {
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.selectedOptions);
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const details = useSelector(state => state.measuresData?.doorWindowData);
    const [localStep, setLocalStep] = useState(globalStep);
    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [otherText, setOtherText] = useState('');
    const bottomSheetRef = useRef(null);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const selectedOption = useSelector(state => state.measuresData.doorWindowData.selectedOptions)

    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);

    useEffect(() => {
        if (details?.selectedOptions[localStep]) {
            setSelectedOptionId(details?.selectedOptions[localStep]?.optionId);
        } else if (selectedData) {
            setSelectedOptionId(selectedData[localStep]?.optionId);
        } else {
            setSelectedOptionId(null);
        }
    }, [selectedData, localStep]);
    const data = useSelector(state => {
        if (templateName.templateId === '02') {
            return state.exteriorOptionsData.optionArray.DoorHandlingData
        }
    })

    const [doorHandlingData, setDoorHandlingData] = useState(data);

    const handleBack = () => {
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        navigation.navigate('TypeData');
    };

    const handleOptionClick = (optionsId, value) => {
        if (optionsId === doorHandlingData.length) {
            bottomSheetRef.current.open();
        } else if (selectedOptionId !== optionsId || selectedOptionId === optionsId) {
            const questionId = questions[localStep].questionId;
            const question = questions[localStep].questionValue;
            dispatch(setOption({
                step: localStep,
                questionId,
                optionId: optionsId,
                optionValue: value,
                question,
            }));
            setSelectedOptionId(optionsId);
            // navigation.navigate('Size');
        } else {
            setSelectedOptionId(optionsId);
            // navigation.navigate('Size');
        }
        if (templateName.templateId === '02') {
            if (selectedOption[1]?.optionId === 1) {
                const newStep = localStep + 1;
                setLocalStep(newStep);
                dispatch(setStep(newStep));
                navigation.navigate('Size');
            } else {
                const newStep = localStep + 1;
                setLocalStep(newStep);
                dispatch(setStep(newStep));
                navigation.navigate('NonStandardE&I');
            }
        } else {
            const newStep = localStep + 2;
            setLocalStep(newStep);
            dispatch(setStep(newStep));
            navigation.navigate('Sizes');
        }
    };

    const handleOtherSubmit = () => {
        const otherOptionIndex = doorHandlingData.findIndex(option => option.optionsId === doorHandlingData.length);
        const otherOption = doorHandlingData[otherOptionIndex];
        const newOptionId = otherOption.optionsId;
        const incrementedOtherOptionId = Math.max(...doorHandlingData.map(option => option.optionsId)) + 1;

        const newOption = {
            optionsId: newOptionId,
            value: otherText,
        };

        const updatedOtherOption = {
            ...otherOption,
            optionsId: incrementedOtherOptionId,
        };

        const updatedData = [
            ...doorHandlingData.slice(0, otherOptionIndex),
            newOption,
            updatedOtherOption,
            ...doorHandlingData.slice(otherOptionIndex + 1)
        ];

        setDoorHandlingData(updatedData);
        setOtherText('');
        bottomSheetRef.current.close();
        // Dispatch the action with the updated data
        // dispatch(updateDoorHandling(updatedData));
    };

    const renderDoorHandling = ({ item }) => {
        return (
            <View style={{ paddingHorizontal: 10, margin: 10 }}>
                <TouchableOpacity
                    style={{
                        paddingVertical: 20,
                        borderRadius: 12,
                        paddingHorizontal: 15,
                        backgroundColor: selectedOptionId === item.optionsId ? '#498DEF' : 'white',
                        borderWidth: 1,
                        borderColor: selectedOptionId === item.optionsId ? '#498DEF' : '#498DEF',
                    }}
                    onPress={() => handleOptionClick(item.optionsId, item.value)}
                >
                    <Text style={{ fontSize: 20, color: selectedOptionId === item.optionsId ? 'white' : '#498DEF', fontFamily: Fonts.FONTS_MEDIUM }}>{item.value}</Text>
                </TouchableOpacity>
            </View>
        );
    };

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
                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 8 }}>
                    <QuestionRender step={globalStep} />
                    <FlatList
                        data={doorHandlingData}
                        renderItem={renderDoorHandling}
                        keyExtractor={(item) => item.optionsId.toString()}
                    />
                    <GlobalBottomSheet
                        ref={bottomSheetRef}
                        location="Add Door Handling"
                        locationLabel="Add Door Handling"
                        value={otherText}
                        onChangeText={setOtherText}
                        handlePress={handleOtherSubmit}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default DoorHandlingExterior;
