import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, FlatList, StatusBar, Image, ImageBackground } from 'react-native';
import Fonts from '../../../src/fonts/fonts';
import { setOption, setStep, setToggleBtn } from '../../redux/measures';
import { useDispatch, useSelector } from 'react-redux';
import QuestionRender from '../questionRender';
import GlobalBottomSheet from '../globalRBSheet';
import { Linear } from '../../globaconstants';
import LinearGradient from 'react-native-linear-gradient';
import ToggleSwitch from 'toggle-switch-react-native';
import ButtonComponent from './btnComponent';

const BuildingExterior = ({ navigation }) => {
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.selectedOptions);
    const globalStep = useSelector(state => state.measuresData.doorWindowData.step);
    const toggleBtn = useSelector(state => state.measuresData.doorWindowData.toggleBtn)
    // console.log('toggleBtn11', toggleBtn)
    const [localStep, setLocalStep] = useState(globalStep);
    const dispatch = useDispatch();
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    const [selectedOptionId, setSelectedOptionId] = useState(null);
    const [otherText, setOtherText] = useState('');
    const bottomSheetRef = useRef(null);
    const data = useSelector(state => state.windowOptionsData.windowOptionsArray.buildingExterior)
    const [buildingExterior, setBuildingExterior] = useState(data);
    const details = useSelector(state => state.measuresData?.doorWindowData);

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
        setIsNailingFinNeeded(details?.toggleBtn)
    }, [selectedData, details, localStep]);

    const [isNailingFinNeeded, setIsNailingFinNeeded] = useState(false);

    const toggleNailingFin = () => {
        setIsNailingFinNeeded(!isNailingFinNeeded);
        dispatch(setToggleBtn(!toggleBtn))
        // console.log('toggleBtn', toggleBtn)
    };

    const handleBack = () => {
        console.log(localStep)
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        console.log(newStep)
        navigation.goBack();
    };


    const handleOptionClick = (optionsId, value) => {
        if (optionsId === buildingExterior.length) {
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
            navigation.navigate('ExteriorWindowMeasures');
        }
    };

    const handleOtherSubmit = () => {
        const otherOptionIndex = buildingExterior.findIndex(option => option.optionsId ? option.value === 'Other' : null);
        const otherOption = buildingExterior[otherOptionIndex];
        const newOptionId = otherOption.optionsId;
        const incrementedOtherOptionId = Math.max(...buildingExterior.map(option => option.optionsId)) + 1;

        const newOption = {
            optionsId: newOptionId,
            value: otherText,
        };

        const updatedOtherOption = {
            ...otherOption,
            optionsId: incrementedOtherOptionId,
        };

        const updatedData = [
            ...buildingExterior.slice(0, otherOptionIndex),
            newOption,
            updatedOtherOption,
            ...buildingExterior.slice(otherOptionIndex + 1)
        ];
        setBuildingExterior(updatedData);
        setOtherText('');
        bottomSheetRef.current.close();
        // dispatch(updatewindowUnitNumber(updatedData))
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
                    <View style={{ paddingHorizontal: 15 }}>
                        <LinearGradient
                            locations={[0, 0.3, 0.7]}
                            colors={["#ffffff", "#1F242822", "#ffffff"]}
                            style={{ height: 3, marginBottom: 10 }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10 }}>
                            <Text style={{ fontSize: 17, color: 'black' }}>Nailing Fin Needed</Text>
                            <ToggleSwitch
                                isOn={isNailingFinNeeded}
                                onColor="#498DEF"
                                offColor="grey"
                                onToggle={toggleNailingFin}
                            />
                            {console.log('jdojddjfoijejdjjdjkd', isNailingFinNeeded, toggleBtn)}
                        </View>
                        <LinearGradient
                            locations={[0, 0.3, 0.7]}
                            colors={["#ffffff", "#1F242822", "#ffffff"]}
                            style={{ height: 3, marginTop: 10 }}
                        />
                    </View>
                    <FlatList
                        data={buildingExterior}
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
                </View >
            </ImageBackground>
        </View >
    );
};

export default BuildingExterior;
