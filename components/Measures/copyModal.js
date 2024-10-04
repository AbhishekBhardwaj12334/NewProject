import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Fonts from '../../src/fonts/fonts';
import { useDispatch, useSelector } from 'react-redux';
import { addTempResponse, setResponseIndex } from '../redux/measures';
import { Dropdown } from 'react-native-element-dropdown';

const CopyModal = ({ visible, setVisible, index }) => {
    const [selectedFloor, setSelectedFloor] = useState({});
    const [selectedSide, setSelectedSide] = useState({});
    const [selectedUnit, setSelectedUnit] = useState({});
    const [room, setRoom] = useState('');
    const dispatch = useDispatch();
    const globalIndex = useSelector(state => state.measuresData?.windowResponse?.index);
    const details = useSelector(state => state.measuresData?.doorWindowData);
    // console.log('sjncksdmcksd', JSON.stringify(details))
    const [localIndex, setLocalIndex] = useState(globalIndex);
    const labels = ['Select Floor', 'Select Room Wall', 'Select Unit Number'];
    const response = useSelector(state => state.measuresData?.windowResponse?.tempResponse);
    const floors = [
        { optionId: 1, label: '1st Floor' },
        { optionId: 2, label: '2nd Floor' },
        { optionId: 3, label: '3rd Floor' },
    ];
    const sides = [
        { optionId: 1, label: 'Front' },
        { optionId: 2, label: 'Right Side' },
        { optionId: 3, label: 'Back' },
        { optionId: 4, label: 'Left Side' },
        { optionId: 5, label: 'Garage' },
    ];
    const units = [
        { optionId: 1, label: '1' },
        { optionId: 2, label: '2' },
        { optionId: 3, label: '3' },
        { optionId: 4, label: '4' },
    ];

    const handleFloorData = (item) => {
        setSelectedFloor(item);
    }

    const handleSideData = (item) => {
        setSelectedSide(item);
    }

    const handleUnitData = (item) => {
        setSelectedUnit(item);
    };

    const dataUpdate = () => {
        const updatedDetails = {
            ...details,
            selectedOptions: details.selectedOptions.map((option, index) => {
                if (index === 1) {

                    return { ...option, optionValue: selectedFloor.label, optionId: selectedFloor.optionId };
                } else if (index === 2) {
                    // update option at index 2
                    return { ...option, optionValue: selectedSide.label, optionId: selectedSide.optionId };
                } else if (index === 3) {
                    // update option at index 3
                    return { ...option, optionValue: selectedUnit.label, optionId: selectedUnit.optionId };
                } else {
                    // return the original option for other indices
                    return option;
                }
            }),
            interiorMeasures: {
                ...details.interiorMeasures,
                roomName: room
            }
        };
        // console.log('CILIO', updatedDetails)
        return updatedDetails;
    }


    const handleComplete = () => {
        const updatedDetails = dataUpdate();
        setLocalIndex(() => {
            dispatch(setResponseIndex(response.length))
            dispatch(addTempResponse({ tempIndexResponse: updatedDetails }));
        });
        setVisible(false);
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.view1}>
                <View style={styles.view2}>
                    <View style={styles.view3}>
                        <Text style={styles.text1}>Copy</Text>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                        >
                            <Text style={{ fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, color: '#498DEF' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: 'rgba(31, 36, 40, 0.30)' }}></View>
                    <View style={styles.view4}>
                        <Text style={styles.labelText}>{labels[0]}</Text>
                        <View style={styles.pickerContainer}>
                            <Dropdown
                                style={styles.dropdown}
                                data={floors}
                                itemTextStyle={styles.dropdownItemText}
                                selectedTextStyle={styles.selectedTextStyle}
                                mode="dropdown"
                                labelField="label"
                                valueField="label"
                                placeholder="Select"
                                placeholderStyle={styles.placeholderStyle}
                                onChange={item => handleFloorData(item)}
                                value={selectedFloor}
                            />
                        </View>

                        <Text style={styles.labelText}>{labels[1]}</Text>
                        <View style={styles.pickerContainer}>
                            <Dropdown
                                style={styles.dropdown}
                                data={sides}
                                itemTextStyle={styles.dropdownItemText}
                                selectedTextStyle={styles.selectedTextStyle}
                                mode="dropdown"
                                labelField="label"
                                valueField="label"
                                placeholder="Select"
                                placeholderStyle={styles.placeholderStyle}
                                onChange={item => handleSideData(item)}
                                value={selectedSide}
                            />
                        </View>

                        <Text style={styles.labelText}>{labels[2]}</Text>
                        <View style={styles.pickerContainer}>
                            <Dropdown
                                style={styles.dropdown}
                                data={units}
                                itemTextStyle={styles.dropdownItemText}
                                selectedTextStyle={styles.selectedTextStyle}
                                mode="dropdown"
                                labelField="label"
                                valueField="label"
                                placeholder="Select"
                                placeholderStyle={styles.placeholderStyle}
                                onChange={item => handleUnitData(item)}
                                value={selectedUnit}
                            />
                            {/* {console.log('dhchbdc', selectedFloor, selectedSide, selectedUnit)} */}
                        </View>

                        <Text style={styles.labelText}>Enter Room Name</Text>
                        <TextInput
                            style={styles.textInput}
                            value={room}
                            onChangeText={(text) => setRoom(text)}
                            placeholder="Enter room name"
                            placeholderTextColor='black'
                        />
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#498DEF', borderRadius: 8 }}
                            onPress={() => handleComplete()}
                        >
                            <Text style={styles.text2}>Continue</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 15
    },
    view2: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
    },
    view3: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text1: {
        fontSize: 18,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'black'
    },
    view4: {
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 8,
        marginVertical: 5
    },
    picker: {
        height: 50,
        width: '100%'
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 8,
        padding: 8,
        color: 'black',
        marginVertical: 5
    },
    text2: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'white',
        textAlign: 'center',
        paddingVertical: 10
    },
    labelText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
        marginTop: 10
    },
    dropdown: {
        width: '100%',
        color: 'black',
        height: 50,
        paddingHorizontal: 15,
        // paddingVertical: 10,
        borderRadius: 20
    },
    dropdownItem: {
        padding: 10,
    },
    dropdownItemText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
        // paddingVertical: , // Add padding to allow for two lines
        // lineHeight: 22, // Adjust line height to give more space between lines
    },
    selectedTextStyle: {
        fontSize: 15,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    placeholderStyle: {
        color: 'black',
        fontFamily: Fonts.FONTS_REGULAR,
        fontSize: 15,
    },
});

export default CopyModal;
