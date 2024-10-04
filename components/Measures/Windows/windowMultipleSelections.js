import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Fonts from '../../../src/fonts/fonts';
import { useSelector } from 'react-redux';

const whatElseNeededData = [
    { id: 0, label: 'R&R Blinds Needed', },
    { id: 1, label: 'Sheetrock Damage/Rot Visible' },
    { id: 2, label: 'FurnitureObstruction Needs Moved' },
    { id: 3, label: 'R&R Alarm Needed' },
    { id: 4, label: 'Obscure Glass Needed' },
    { id: 5, label: 'Tempered Glass Needed' },
];

const InteriorFinish = [
    { id: 1, label: "Sheetrock entire opening" },
    { id: 2, label: "Sheetrock 3 sides w/wood sill" },
    { id: 3, label: "Trimmed/Cased 4 sides no returns" },
    { id: 4, label: "Returns Trimmed/Cased all 4 side" },
    { id: 5, label: "Returns Trimmed/Cased top and sides with sill" },
    { id: 6, label: "Tile or ceramic" },
];


const WindowMultipleSelection = ({ onPress }) => {
    const [selectedItemsNeeded, setSelectedItemsNeeded] = useState([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const selectedData = useSelector(state => state.measuresData.allMeasures?.selectedResponseDetail?.interiorMeasures?.additionalInteriorMeasures);
    const tempResponse = useSelector(state => state.measuresData?.windowResponse?.tempResponse || []);
    const tempWindowIndex = useSelector(state => state.measuresData?.windowResponse?.index);
    const [interiorFinish, setInteriorFinish] = useState([]);
    const interiorMeasurements = tempResponse[tempWindowIndex]?.interiorMeasures?.additionalInteriorMeasures;

    const handleValueChange = (item) => {
        // Check if the item is already selected
        if (!selectedItemsNeeded.some(selectedItem => selectedItem.label === item.label)) {
            setSelectedItemsNeeded(prevItems => [...prevItems, item]);
        }
    };
    const handleInteriorFinish = (item) => {
        setInteriorFinish(item)
    }

    useEffect(() => {
        // console.log('jsdcjdsnc', selectedItemsNeeded)
        if (selectedData) {
            setSelectedItemsNeeded(interiorMeasurements?.elseNeeded);
            setInteriorFinish(interiorMeasurements?.interiorFinish);
        } else if (interiorMeasurements) {
            setSelectedItemsNeeded(interiorMeasurements?.elseNeeded);
            setInteriorFinish(interiorMeasurements?.interiorFinish);
        }
    }, [interiorMeasurements, selectedData]);
    useEffect(() => {
        onPress({ selectedItemsNeeded, interiorFinish });
    }, [selectedItemsNeeded, interiorFinish]);

    const handleDeleteItem = (itemToDelete) => {
        setSelectedItemsNeeded(prevItems => prevItems.filter(item => item.label !== itemToDelete.label));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>What Else Needed?</Text>
            <View style={styles.dropdownContainer}>
                <Dropdown
                    style={styles.dropdown}
                    data={whatElseNeededData}
                    mode='dropdown'
                    labelField="label"
                    valueField="label"
                    placeholder="Select"
                    itemTextStyle={styles.dropdownItemText}
                    placeholderStyle={{ color: 'black', fontFamily: Fonts.FONTS_REGULAR, fontSize: 15 }}
                    onChange={item => handleValueChange(item)}
                    value={selectedItemsNeeded?.map(item => item.label)}
                />
            </View>
            {selectedItemsNeeded?.length > 0 &&
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
                        <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
                            {selectedItemsNeeded?.map((item) => (
                                <View key={item.label} style={styles.selectedItem}>
                                    <Text style={styles.selectedItemText}>{item.label}</Text>
                                    <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                                        <Image source={require('../../../assets/icons/AdvanceFilter.png')} style={styles.deleteIcon} />
                                    </TouchableOpacity>
                                </View>
                            ))}

                        </ScrollView>
                    </View>
                </View>
            }
            <View style={{ marginTop: 10 }}>
                <Text style={styles.label}>Interior Finish</Text>
                <View style={styles.dropdownContainer}>
                    <Dropdown
                        style={styles.dropdown}
                        data={InteriorFinish}
                        itemTextStyle={styles.dropdownItemText}
                        selectedTextStyle={styles.selectedTextStyle}
                        mode="dropdown"
                        labelField="label"
                        valueField="label"
                        placeholder="Select"
                        placeholderStyle={styles.placeholderStyle}
                        onChange={item => handleInteriorFinish(item)}
                        value={interiorFinish}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingHorizontal: 15,
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    dropdownContainer: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        marginBottom: 10,
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
    selectedItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 15,
        paddingVertical: 4,
        marginRight: 10,
        borderRadius: 5,
    },
    selectedItemText: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_REGULAR,
    },
    deleteIcon: {
        width: 20,
        height: 20,
        marginLeft: 5,
    },
    view8: {
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 5,
        marginTop: 20,
    },
    view9: {
        flex: 1,
        borderRightWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        padding: 5,
    },
    view10: {
        flex: 2,
        padding: 5,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        paddingHorizontal: 20,
    },
    labourInput1: {
        flex: 1,
        fontSize: 14,
        fontFamily: Fonts.FONTS_BOLD,
        color: 'black',
    },
    labourInput2: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_REGULAR,
        color: '#1F2428',
    },
    labourInput21: {
        fontSize: 14,
        fontFamily: Fonts.FONTS_BOLD,
        color: 'black',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        paddingHorizontal: 10,
        fontSize: 15,
        fontFamily: Fonts.FONTS_REGULAR,
        textAlignVertical: 'top',
        color: 'black',
    },
});

export default WindowMultipleSelection;
