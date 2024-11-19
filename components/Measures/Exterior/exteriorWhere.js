import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOption, setStep } from '../../redux/measures';
import Fonts from '../../../src/fonts/fonts';
import QuestionRender from '../questionRender';
import GlobalBottomSheet from '../globalRBSheet';
import ButtonComponent from '../Windows/btnComponent';
import fonts from '../../../src/fonts/fonts';
// import { updateWhereIsItData } from '../../redux/ext&intOption';
// import { updateWhereIsItData } from '../../redux/stormOptions';

const WhereIsItExterior = ({ navigation }) => {
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.selectedOptions);
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const details = useSelector(state => state.measuresData?.doorWindowData)
    const [localStep, setLocalStep] = useState(globalStep);
    console.log('cmdkmcd', localStep)
    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [otherText, setOtherText] = useState('');
    const bottomSheetRef = useRef(null);
    const data = useSelector(state => {
        if (templateName.templateId === '01') {
            return state.stormsecurityOptionsData.stormOptionArray.whereIsItData
        } else if (templateName.templateId === '02') {
            return state.exteriorOptionsData.optionArray.whereIsItData
        }
    })
    const [whereIsItData, setWhereIsItData] = useState(data);
    console.log('WhereIsItData', whereIsItData)
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
    }, [selectedData, localStep]);

    const handleBack = () => {
        // console.log('navigation', navigation)
        const newStep = localStep - 1;
        dispatch(setStep(newStep));
        navigation.navigate('Response');
    };

    const handleOptionClick = (optionsId, value) => {
        if (optionsId === whereIsItData.length) {
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
            setLocalStep(localStep + 1);
            dispatch(setStep(localStep + 1));
            navigation.navigate('TypeData');
        } else {
            setSelectedOptionId(optionsId)
            setLocalStep(localStep + 1);
            dispatch(setStep(localStep + 1));
            navigation.navigate('TypeData');
        }
    };

    const handleOtherSubmit = () => {
        const otherOptionIndex = whereIsItData.findIndex(option => option.optionsId ? option.value === 'Other' : null);
        const otherOption = whereIsItData[otherOptionIndex];
        const newOptionId = otherOption.optionsId;
        const incrementedOtherOptionId = Math.max(...whereIsItData.map(option => option.optionsId)) + 1;

        const newOption = {
            optionsId: newOptionId,
            value: otherText,
        };

        const updatedOtherOption = {
            ...otherOption,
            optionsId: incrementedOtherOptionId,
        };

        const updatedData = [
            ...whereIsItData.slice(0, otherOptionIndex),
            newOption,
            updatedOtherOption,
            ...whereIsItData.slice(otherOptionIndex + 1)
        ];
        setWhereIsItData(updatedData);
        setOtherText('');
        bottomSheetRef.current.close();
        // dispatch(updateWhereIsItData(updatedData))
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
                    onPress={() => handleOptionClick(item.optionsId, item.value)}
                >
                    <Text style={{ fontSize: 20, color: selectedOptionId === item.optionsId ? 'white' : '#498DEF', fontFamily: Fonts.FONTS_MEDIUM }}>{item.value}</Text>
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
                    <ButtonComponent templateId={templateName?.templateId} step={localStep} />
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', borderTopRadius: 8 }}>
                    <QuestionRender step={globalStep} />
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={whereIsItData}
                            renderItem={renderWhereIsIt}
                            keyExtractor={(item) => item.optionsId.toString()}
                        />
                        <GlobalBottomSheet
                            ref={bottomSheetRef}
                            location="Add Other Location"
                            locationLabel="Add Location"
                            value={otherText}
                            onChangeText={setOtherText}
                            handlePress={handleOtherSubmit}
                        />
                    </View>
                </View>
            </ImageBackground>
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
    btnView: {
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 13,
        color: '#498DEF',
        textAlign: 'center',
        fontFamily: Fonts.FONTS_MEDIUM
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingHorizontal: 15,
        marginTop: StatusBar.currentHeight,
        paddingBottom: 15
    },
});

export default WhereIsItExterior;
