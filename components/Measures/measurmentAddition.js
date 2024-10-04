import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Fonts from '../../src/fonts/fonts';
import { Line } from '../globaconstants';

const MeasurementsDetails = () => {
    const templateName = useSelector(state => state?.measuresData?.doorWindowData?.selectedTemplate);
    let selectedMeasurements;
    // let selectedTemplate;
    let selectedOptions;
    selectedMeasurements = useSelector(state => state.measuresData?.doorWindowData?.selectedMeasurements);
    selectedOptions = useSelector(state => state.measuresData?.doorWindowData?.selectedOptions);

    if (templateName?.templateId == '01') {
        if (selectedOptions[2]?.questionId === '303' && selectedOptions[2]?.answerId === '3033') {
            return (
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.heading}>Measurements</Text>
                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.Width}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.frameWidth1}</Text>
                                <Text style={styles.response}>({selectedMeasurements?.frameWidth2})</Text>
                            </View>
                        </View>

                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.Height}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.frameHeight1}</Text>
                                <Text style={styles.response}>({selectedMeasurements?.frameHeight2})</Text>
                            </View>
                        </View>

                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.Depth}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.jambDepth}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.mainView}>
                    <View>
                        {console.log('sdbcjkndsc', selectedMeasurements)}
                        <Text style={styles.heading}>Measurements</Text>
                        {selectedMeasurements?.frameWidth1 && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.Width}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.response}>{selectedMeasurements?.frameWidth1}</Text>
                                    {selectedMeasurements?.frameWidth2 && (
                                        <Text style={styles.response}>({selectedMeasurements?.frameWidth2})</Text>
                                    )}
                                </View>
                            </View>
                        )}
                        <Line />
                        {selectedMeasurements?.frameHeight1 && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.Height}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.response}>{selectedMeasurements?.frameHeight1}</Text>
                                    {selectedMeasurements?.frameHeight2 && (
                                        <Text style={styles.response}>({selectedMeasurements?.frameHeight2})</Text>
                                    )}
                                </View>
                            </View>
                        )}
                        <Line />
                    </View>
                </View>
            );
        }
    } else if (templateName?.templateId === '02') {
        if (selectedOptions && selectedOptions[1]?.optionId !== 1 && selectedOptions[3]?.questionId === '204' && selectedOptions[3]?.answerId === '3035' || selectedOptions[2]?.optionId !== 1) {
            return (
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.heading}>Measurements</Text>
                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.Width}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.frameWidth1}</Text>
                                <Text style={styles.response}>({selectedMeasurements?.frameWidth2})</Text>
                            </View>
                        </View>
                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.Height}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.frameHeight1}</Text>
                                <Text style={styles.response}>({selectedMeasurements?.frameHeight2})</Text>
                            </View>
                        </View>
                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.Depth}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.jambDepth}</Text>
                            </View>
                        </View>
                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.RoughWidth}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.roughWidth1}</Text>
                                <Text style={styles.response}>({selectedMeasurements?.roughWidth2})</Text>
                            </View>
                        </View>
                        <View style={styles.displayView}>
                            <Text style={styles.respoHeading}>{selectedMeasurements?.RoughHeight}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.response}>{selectedMeasurements?.roughHeight1}</Text>
                                <Text style={styles.response}>({selectedMeasurements?.roughHeight2})</Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
                <View style={styles.mainView}>
                    <View>
                        <Text style={styles.heading}>Measurements</Text>
                        {(selectedMeasurements?.frameWidth1 || selectedMeasurements?.frameWidth2) && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.Width}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.response}>{selectedMeasurements?.frameWidth1}</Text>
                                    <Text style={styles.response}>({selectedMeasurements?.frameWidth2})</Text>
                                </View>
                            </View>
                        )}
                        {(selectedMeasurements?.frameHeight1 || selectedMeasurements?.frameHeight2) && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.Height}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.response}>{selectedMeasurements?.frameHeight1}</Text>
                                    <Text style={styles.response}>({selectedMeasurements?.frameHeight2})</Text>
                                </View>
                            </View>
                        )}
                        {selectedMeasurements?.roughWidth1 && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.RoughWidth}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.response}>{selectedMeasurements?.roughWidth1}</Text>
                                </View>
                            </View>
                        )}
                        {selectedMeasurements?.roughHeight1 && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.RoughHeight}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={styles.response}>{selectedMeasurements?.roughHeight1}</Text>
                                </View>
                            </View>
                        )}
                        {selectedMeasurements?.jambDepth && (
                            <View style={styles.displayView}>
                                <Text style={styles.respoHeading}>{selectedMeasurements?.Depth}</Text>
                                <Text style={styles.response}>{selectedMeasurements?.jambDepth}</Text>
                            </View>
                        )}
                    </View>
                </View>
            );
        }
    }
};

const styles = StyleSheet.create({
    mainView: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 10,
        padding: 10,
    },
    heading: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF'
    },
    displayView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'center'
    },
    respoHeading: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_REGULAR,
        color: '#1F2428'
    },
    response: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#1F2428'
    }
});

export default MeasurementsDetails;
