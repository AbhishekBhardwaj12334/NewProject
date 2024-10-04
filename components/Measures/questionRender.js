import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addedQuestion } from '../redux/measures';
import Fonts from '../../src/fonts/fonts'

const QuestionRender = ({ step }) => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.measuresData.doorWindowData.addQuestions);
    // console.log(questions)

    useEffect(() => {
        if (questions.length > 0 && step >= 0 && step < questions.length - 1) {
            const currentQuestion = questions[step];
            dispatch(addedQuestion({ questionId: currentQuestion.questionId, value: currentQuestion.questionValue }));
        }
    }, [step, questions]);

    if (questions.length > 0 && step >= 0 && step < questions.length) {
        const currentQuestion = questions[step];
        return (
            <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ color: '#498DEF', fontSize: 22, fontFamily: Fonts.FONTS_MEDIUM }}>{currentQuestion.questionValue}</Text>
            </View>
        )
    } else {
        return null;
    }
}
export default QuestionRender;