import React, { useEffect, useState, useTransition } from "react";
import { View, StatusBar, Text, Image, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from "react-redux";
import Fonts from '../../src/fonts/fonts'
import NavigateBackHandler from "./summaryBackHandler";
import { useTranslation } from "react-i18next";

const JobDetailsPage = ({ navigation }) => {
    const details = useSelector(state => state.measuresData?.doorWindowData);
    const { t } = useTranslation();
    console.log(details)
    const disable = details?.selectedTemplate && JSON.stringify(details.selectedTemplate) === '{}';

    const { handleBackNavigation } = NavigateBackHandler({
        templateId: details?.selectedTemplate?.templateId,
        step: details?.step,
    });

    const handleMeasuresScreen = () => {
        console.log('navigationMeasures', navigation)
        handleBackNavigation();
    }

    const handleSettings = () => {
        navigation.navigate('Settings')
    }
    const handleMeasures = () => {
        navigation.navigate('Templates')
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View
                    style={{ flexDirection: 'row', alignItems: 'center', marginTop: StatusBar.currentHeight, paddingHorizontal: 15, paddingBottom: 15 }}>
                    {/* <TouchableOpacity onPress={handleBack}>
                        <Image
                            source={require('../../assets/icons/arrowright_.png')}
                            style={{ width: 20, height: 20, resizeMode: 'contain' }}

                        />
                    </TouchableOpacity> */}
                    <Text
                        style={{ flex: 1, fontSize: 26, fontFamily: Fonts.FONTS_MEDIUM, color: '#000' }}
                        numberOfLines={1}
                    >
                        {t("job-DetailsPage")}
                    </Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            style={[
                                styles.viewJobBtn,
                                { borderColor: disable ? 'grey' : '#498DEF', marginRight: 10 },
                            ]}
                            disabled={disable}
                            onPress={() => handleMeasuresScreen()}
                        >
                            <Text
                                style={[
                                    styles.btnText,
                                    { color: disable ? 'grey' : '#498DEF' }
                                ]}>
                                {t("measures")}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.viewJobBtn,
                                // { borderColor: disable ? 'grey' : '#498DEF' },
                            ]}
                            // disabled={disable}
                            onPress={() => handleSettings()}
                        >
                            <Text
                                style={[
                                    styles.btnText,
                                    // { color: disable ? 'grey' : '#498DEF' }
                                ]}>
                                {t("settings")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
                    <TouchableOpacity
                        style={styles.measuresBtn}
                        onPress={() => handleMeasures()}
                    >
                        <Text style={styles.measuresBtnText}>{t("measures")}</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}
export default JobDetailsPage;
const styles = StyleSheet.create({
    viewJobBtn: {
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#498DEF',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        // marginRight: 5
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
    measuresBtn: {
        backgroundColor: '#498DEF',
        borderColor: '#498DEF',
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 10
        // flex: 1
    },
    measuresBtnText: {
        color: 'white',
        fontSize: 20,
    }
})
