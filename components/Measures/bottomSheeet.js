import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOption, setStep, updateOptions } from '../redux/measures';
import Fonts from '../../src/fonts/fonts';
import QuestionRender from './questionRender';
// import GlobalBottomSheet from './GlobalBottomSheet';

const WhereIsItExterior1 = ({ navigation }) => {
    const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail);
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const [localStep, setLocalStep] = useState(globalStep);
    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [otherText, setOtherText] = useState('');
    const bottomSheetRef = useRef(null);
    const whereIsItData = useSelector(state => state.measuresData.doorWindowData.whereIsItData); // Assume this is in your Redux store

    useEffect(() => {
        setLocalStep(globalStep);
    }, [globalStep]);

    useEffect(() => {
        if (selectedData && selectedData.selectedOptions && selectedData.selectedOptions[localStep]) {
            setSelectedOptionId(selectedData.selectedOptions[localStep].optionId);
        }
    }, [selectedData, localStep]);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleOptionClick = (optionsId, value) => {
        if (optionsId === '5') { // Option with id 5 is "Other"
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
            setSelectedOptionId(optionsId);
            setLocalStep(localStep + 1);
            dispatch(setStep(localStep + 1));
        }
    };

    const generateRandomId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const handleOtherSubmit = () => {
        const newId = generateRandomId();
        let updatedWhereIsItData = [...whereIsItData];

        // Find the index of the "Other" option
        const otherIndex = updatedWhereIsItData.findIndex(item => item.value === 'Other');

        if (otherIndex !== -1) {
            const otherOption = updatedWhereIsItData[otherIndex];

            // Update the "Other" option with the new response
            updatedWhereIsItData[otherIndex] = {
                optionsId: newId,
                value: otherText,
            };

            // Increment the "Other" option's id
            const newOtherOption = {
                optionsId: parseInt(otherOption.optionsId) + 1,
                value: 'Other',
            };

            updatedWhereIsItData.push(newOtherOption);

            // Dispatch the update to Redux store
            dispatch(updateOptions(updatedWhereIsItData));

            // Update the redux state with the new option
            const questionId = questions[localStep].questionId;
            const question = questions[localStep].questionValue;
            dispatch(setOption({
                step: localStep,
                questionId,
                optionId: newId,
                optionValue: otherText,
                question,
            }));

            setSelectedOptionId(newId);
            setLocalStep(localStep + 1);
            dispatch(setStep(localStep + 1));
            bottomSheetRef.current.close();
        }
    };

    const renderWhereIsIt = ({ item }) => {
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
                    onPress={() => handleOptionClick(item.optionsId.toString(), item.value)}
                >
                    <Text style={{ fontSize: 20, color: selectedOptionId === item.optionsId ? 'white' : '#498DEF', fontFamily: Fonts.FONTS_MEDIUM }}>{item.value}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#4899F1" }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingTop: 30, paddingHorizontal: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleBack}>
                        <Image
                            source={require('../../assets/icons/arrowright_.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 28, fontFamily: Fonts.FONTS_MEDIUM, top: 4, color: 'black', left: 10 }}>savhvsahxvhafcgjhsvahgscxgfc</Text>
                </View>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', borderTopRadius: 8 }}>
                <QuestionRender step={globalStep} />
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={whereIsItData}
                        renderItem={renderWhereIsIt}
                        keyExtractor={(item) => item.optionsId.toString()}
                    />
                </View>
            </View>
            <GlobalBottomSheet
                ref={bottomSheetRef}
                location="Add Other Location"
                locationLabel="Add Location"
                value={otherText}
                onChangeText={setOtherText}
                handlePress={handleOtherSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    userInputContainer: {
        fontSize: 22,
        color: 'rgb(0,0,0)',
        marginTop: 0,
        marginBottom: 5,
        borderRadius: 10,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
        paddingHorizontal: 10
    },
    view9: {
        flex: 1,
        backgroundColor: 'white',
        maxHeight: 55,
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 8,
        width: '100%',
    },
});

export default WhereIsItExterior1;
