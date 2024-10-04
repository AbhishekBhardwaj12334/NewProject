import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Line } from "../globaconstants";
import LinearGradient from "react-native-linear-gradient";

const QuestionsDisplay = () => {
    const additionalDetails = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails);
    // console.log('Adddjkdsckncdk', additionalQuestions);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={styles.section}>
                <Text style={styles.title}>Additional Questions</Text>
                {additionalDetails?.additionalQuestions.map((question, index) => (
                    <View key={index}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, color: '#1F2428' }}> {question.Question}</Text>
                            </View>
                            {/* <View style={{ flex: .5 }}></View> */}

                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                {question.isToggled == true ?
                                    <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_MEDIUM, color: '#1F2428' }}> Yes</Text> :
                                    <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_MEDIUM, color: '#1F2428' }}> No</Text>
                                }
                            </View>
                        </View>
                        <LinearGradient
                            locations={[0, 0.3, 0.7]}
                            colors={["#ffffff", "#1F242822", "#ffffff"]}
                            style={{ height: 2, marginVertical: 5 }}
                        />
                    </View>
                ))}
                {additionalDetails?.additionalNotes ? (
                    <View>

                        <Text style={styles.title1}>Additional Note</Text>
                        <Text style={{ fontSize: 15, color: 'black' }}>{additionalDetails?.additionalNotes}</Text>
                    </View>
                ) : null
                }
            </View>
        </View>
    )
}
export default QuestionsDisplay;
const styles = StyleSheet.create({
    section: {
        paddingHorizontal: 10,
        // margin: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 5,
        paddingVertical: 10
    },
    title: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF'
    },
    title1: {
        fontSize: 17,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'black',
    }
})