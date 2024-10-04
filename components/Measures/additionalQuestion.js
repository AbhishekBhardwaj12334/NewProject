import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import ToggleSwitch from 'toggle-switch-react-native';
import Fonts from '../../src/fonts/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { Linear } from '../globaconstants';
import { useDispatch, useSelector } from 'react-redux';
import { updateAdditionalQuestions } from '../redux/measures';

const AdditionalQuestion = ({ onPress }) => {
    const AdditionalQuestions = useSelector(state => state.measuresData.doorWindowData?.additionalDetails?.additionalQuestions);
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.additionalDetails?.additionalQuestions);
    const details = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.additionalQuestions)
    const dispatch = useDispatch();
    console.log('sdcsdcndc', AdditionalQuestions)
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');
    const [selectedOptions, setSelectedOptions] = useState(AdditionalQuestions.map(addQues => addQues.isToggled));

    useEffect(() => {
        if (details) {
            const updatedQuestions = details?.map((questions, index) => questions.isToggled);
            setSelectedOptions(updatedQuestions);
        } else {
            const updatedQuestions = selectedData?.map((questions, index) => questions.isToggled);
            setSelectedOptions(updatedQuestions);
        }
    }, [additionalNotes]);
    const handleTextChange = (text) => {
        setAdditionalNotes(text)
    }
    const toggleOption = (index) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[index] = !updatedOptions[index];
        setSelectedOptions(updatedOptions);
        dispatch(updateAdditionalQuestions({
            index: index,
            isToggled: updatedOptions[index]
        }))
    };


    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={{ backgroundColor: 'white' }}>
                <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: Fonts.FONTS_BOLD, color: '#498DEF', marginBottom: 20 }}>
                    Some More Exterior Door Questions
                </Text>
                {AdditionalQuestions.map((question, index) => (
                    <View key={index}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 18, fontFamily: Fonts.FONTS_MEDIUM, color: 'black' }}>{question.Question}</Text>
                            </View>
                            <ToggleSwitch
                                isOn={selectedOptions[index]}
                                onColor="#498DEF"
                                offColor="grey"
                                onToggle={() => toggleOption(index)}
                            />
                        </View>
                        <Linear />
                    </View>

                ))}

            </View>
        </View>
    );
};

export default AdditionalQuestion;
