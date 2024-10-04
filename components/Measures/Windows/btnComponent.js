import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useSelector } from "react-redux";

const ButtonComponent = ({ templateId, step }) => {
    const navigation = useNavigation()
    const tempResponse = useSelector(state => state.measuresData?.windowResponse?.tempResponse);
    const templateName = useSelector(state => state.measuresData?.doorWindowData);
    const localStep = useSelector(state => state.measuresData?.doorWindowData?.step);
    let disable
    if (templateName?.selectedTemplate?.templateId == '03') {
        disable = tempResponse.length === 0
    } else if (templateName?.selectedTemplate?.templateId == '01' || templateName?.selectedTemplate?.templateId == '02') {
        disable = templateName?.selectedOptions.length === 0
    }
    console.log(tempResponse.length)
    console.log('sdcjsdckjn', templateName?.selectedOptions.length)
    const handleSummary = () => {
        if (templateName?.selectedTemplate?.templateId == '03') {
            navigation.navigate('WindowSummary', { templateId: templateName?.selectedTemplate?.templateId, step: templateName?.step })
            { console.log('fvfvfdv', templateName?.selectedTemplate?.templateId, templateName?.step) }
        } else if (templateName?.selectedTemplate?.templateId == '01' || templateName?.selectedTemplate?.templateId == '02') {
            navigation.navigate('SummaryAll', { templateId: templateName?.selectedTemplate?.templateId, step: templateName?.step })

        }
    }
    const handleJobBtn = () => {
        navigation.navigate('JobDetailsPage', { templateId: templateName?.selectedTemplate?.templateId, step: templateName?.step });
    }
    return (
        <View style={styles.btnView}>
            <TouchableOpacity
                style={[styles.viewJobBtn, { marginRight: 5 }]}
                onPress={() => handleJobBtn()}
            >
                <Text style={styles.btnText}>View Job</Text>
            </TouchableOpacity>
            {localStep > -1 ?
                (<TouchableOpacity style={[
                    styles.viewJobBtn,
                    { borderColor: disable ? 'grey' : '#498DEF' },
                ]}
                    onPress={() => handleSummary()}
                    disabled={disable}
                >
                    <Text style={[
                        styles.btnText,
                        { color: disable ? 'grey' : '#498DEF' }
                    ]}>
                        Summary
                    </Text>
                </TouchableOpacity>) : null
            }
        </View>
    )
}
export default ButtonComponent;
const styles = StyleSheet.create({
    viewJobBtn: {
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: '#498DEF',
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 13,
        color: '#498DEF',
        textAlign: 'center',
        fontFamily: Fonts.FONTS_MEDIUM
    }
})
