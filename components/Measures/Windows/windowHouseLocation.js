import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, ImageBackground } from 'react-native';
import Fonts from '../../../src/fonts/fonts';
import { setOption, setStep } from '../../redux/measures';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRender from '../questionRender';
// import { updatewindowHouseLocation } from '../../redux/ext&intOption
import GlobalBottomSheet from '../globalRBSheet';
import ButtonComponent from './btnComponent';

const WindowHouseLocation = ({ navigation }) => {
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.selectedOptions)
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const [localStep, setLocalStep] = useState(globalStep);
    const dispatch = useDispatch();
    const details = useSelector(state => state.measuresData?.doorWindowData);
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [otherText, setOtherText] = useState('');
    const bottomSheetRef = useRef(null);
    const data = useSelector(state => state.windowOptionsData.windowOptionsArray.houseLocationData)

    const [windowHouseLocation, setWindowHouseLocation] = useState(data);

    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);

    useEffect(() => {
        if (details?.selectedOptions[globalStep]?.optionId) {
            setSelectedOptionId(details?.selectedOptions[globalStep]?.optionId);
        } else if (selectedData) {
            setSelectedOptionId(selectedData[localStep]?.optionId);
        } else {
            setSelectedOptionId(null);
        }
    }, [selectedData, details, localStep]);

    const handleBack = () => {
        // console.log(localStep)
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        // console.log(newStep)
        navigation.goBack();
    };


    const handleOptionClick = (optionsId, value) => {
        if (optionsId === windowHouseLocation.length) {
            bottomSheetRef.current.open();
        } else {
            const questionId = questions[localStep].questionId;
            const question = questions[localStep].questionValue;
            dispatch(setOption({
                step: localStep,
                questionId,
                optionId: optionsId,
                optionValue: value,
                question,
            }));
            if (selectedOptionId !== optionsId) {
                setSelectedOptionId(optionsId);
            }
            setLocalStep(localStep + 1);
            dispatch(setStep(localStep + 1));
            navigation.navigate('WindowUnitNumber');
        }
    };

    const handleOtherSubmit = () => {
        const otherOptionIndex = windowHouseLocation.findIndex(option => option.optionsId ? option.value === 'Other' : null);
        const otherOption = windowHouseLocation[otherOptionIndex];
        const newOptionId = otherOption.optionsId;
        const incrementedOtherOptionId = Math.max(...windowHouseLocation.map(option => option.optionsId)) + 1;

        const newOption = {
            optionsId: newOptionId,
            value: otherText,
        };

        const updatedOtherOption = {
            ...otherOption,
            optionsId: incrementedOtherOptionId,
        };

        const updatedData = [
            ...windowHouseLocation.slice(0, otherOptionIndex),
            newOption,
            updatedOtherOption,
            ...windowHouseLocation.slice(otherOptionIndex + 1)
        ];
        setWindowHouseLocation(updatedData);
        setOtherText('');
        bottomSheetRef.current.close();
        // dispatch(updatewindowHouseLocation(updatedData))
    };

    const renderType = ({ item }) => {
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
                    <Text style={{ fontSize: 20, color: selectedOptionId === item.optionsId ? 'white' : '#498DEF', fontFamily: Fonts.FONTS_MEDIUM, }} numberOfLines={1}>{item.value}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
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
                        data={windowHouseLocation}
                        renderItem={renderType}
                        keyExtractor={(item) => item.optionsId.toString()}
                    />
                    <GlobalBottomSheet
                        ref={bottomSheetRef}
                        location="Add Door Type"
                        locationLabel="Add Door Type"
                        value={otherText}
                        onChangeText={setOtherText}
                        handlePress={handleOtherSubmit}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default WindowHouseLocation;
