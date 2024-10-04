import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { Line } from "../../globaconstants";

const WindowMeasurmentAddition = () => {
    const tempResponse = useSelector(state => state.measuresData?.windowResponse?.tempResponse);
    const selectedData = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail);
    const selectedExteriors = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.exteriorMeasures)
    const selectedInteriors = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.interiorMeasures)
    const additionalDetails = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.additionalDetails);
    return (
        <View style={styles.mainView}>
            <View style={{ paddingTop: 10 }}>
                <Text style={styles.heading}>Exterior Measure</Text>
                <View style={styles.displayView}>
                    <Text style={styles.respoHeading}>{selectedExteriors?.exteriorMeasurements?.Width}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.response}>{selectedExteriors?.exteriorMeasurements?.unitWidth1}</Text>
                        <Text style={styles.response}>({selectedExteriors?.exteriorMeasurements?.unitWidth2})</Text>
                    </View>
                </View>
                <Line />
                <View style={styles.displayView}>
                    <Text style={styles.respoHeading}>{selectedExteriors?.exteriorMeasurements?.Height}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.response}>{selectedExteriors?.exteriorMeasurements?.unitHeight1}</Text>
                        <Text style={styles.response}>({selectedExteriors?.exteriorMeasurements?.unitHeight2})</Text>
                    </View>
                </View>
                <Line />
                <View style={styles.displayView}>
                    <Text style={styles.respoHeading}>{selectedExteriors?.exteriorMeasurements?.Depth}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.response}>{selectedExteriors?.exteriorMeasurements?.finishedDepth}</Text>
                    </View>
                </View>
                <Line />
            </View>
            {Object.keys(selectedInteriors?.interiorMeasurements || {}).length > 0 ? (
                <View style={{ paddingTop: 10 }}>
                    <Text style={styles.heading}>Interior Measure</Text>
                    <View style={styles.displayView}>
                        <Text style={styles.respoHeading}>{selectedInteriors?.interiorMeasurements?.Width}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.response}>{selectedInteriors?.interiorMeasurements?.unitWidth1}</Text>
                            <Text style={styles.response}>({selectedInteriors?.interiorMeasurements?.unitWidth2})</Text>
                        </View>
                    </View>
                    <Line />
                    <View style={styles.displayView}>
                        <Text style={styles.respoHeading}>{selectedInteriors?.interiorMeasurements?.Height}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.response}>{selectedInteriors?.interiorMeasurements?.unitHeight1}</Text>
                            <Text style={styles.response}>({selectedInteriors?.interiorMeasurements?.unitHeight2})</Text>
                        </View>
                    </View>
                    <Line />
                    <View style={styles.displayView}>
                        <Text style={styles.respoHeading}>{selectedInteriors?.interiorMeasurements?.Depth}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.response}>{selectedInteriors?.interiorMeasurements?.finishedDepth}</Text>
                        </View>
                    </View>
                    <Line />
                </View>
            ) : null

            }
            {selectedInteriors?.additionalInteriorMeasures?.elseNeeded.length > 0 || Object.keys(selectedInteriors?.additionalInteriorMeasures?.interiorFinish || {}).length > 0 ?
                (<View style={{ paddingTop: 10 }}>
                    <Text style={styles.heading}>Additional Details</Text>
                    {selectedInteriors?.additionalInteriorMeasures?.elseNeeded.length > 0 ? (
                        <View style={styles.displayAdd}>
                            <Text style={styles.laborSubheadings}>What Else Needed</Text>

                            <View style={{ marginTop: 7 }}>
                                {selectedInteriors?.additionalInteriorMeasures?.elseNeeded.map((item, index) => (
                                    <View key={index}>
                                        <Text style={styles.respoHeading}>
                                            {item.label}
                                        </Text>
                                        <Line />
                                    </View>
                                ))}
                            </View>
                        </View>) : null}
                    {Object.keys(selectedInteriors?.additionalInteriorMeasures?.interiorFinish || {}).length > 0 ? (
                        <View>
                            <View style={styles.displayView}>
                                <Text style={[styles.respoHeading, { marginRight: 10 }]}>Interior Finish</Text>
                                <Text style={[styles.response, { marginLeft: 2 }]}>{selectedInteriors?.additionalInteriorMeasures?.interiorFinish.label}</Text>
                            </View>
                            <Line />
                        </View>
                    ) :
                        null
                    }

                </View>) : null
            }
            {additionalDetails?.additionalNotes ? (
                <View>
                    <Text style={styles.laborSubheadings}>Additional Notes</Text>
                    <Text style={styles.respoHeading}>{additionalDetails.additionalNotes}</Text>
                    <Line />
                </View>

            ) : null
            }

        </View >
    )
}
const styles = StyleSheet.create({
    mainView: {
        borderRadius: 5,
        paddingVertical: 5
    },
    heading: {
        fontSize: 23,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#498DEF'
    },
    displayView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        alignItems: 'center'
    },
    displayAdd: {
        paddingVertical: 5,
        // alignItems: 'center'
    },
    respoHeading: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_REGULAR,
        color: '#1F2428',
        // marginRight: 10
    },
    laborSubheadings: {
        fontSize: 20,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#1F2428',
    },
    response: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: '#1F2428'
    }
});
export default WindowMeasurmentAddition;