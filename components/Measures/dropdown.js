import React from "react";
import { StyleSheet, View } from 'react-native';
import { Dropdown } from "react-native-element-dropdown";
const DropdownComponent = ({ mode, search, value, onChange, data }) => {
    return (
        <View style={styles.dropdownIndexView}>
            <Dropdown
                style={styles.dropdown}
                containerStyle={styles.dropdownContainer}
                data={data}
                search={search}
                mode={mode}
                itemTextStyle={styles.dropdownItemText}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                labelField="label"
                valueField="value"
                placeholder="Select"
                searchPlaceholder="Search..."
                iconColor="black"
                iconStyle={{ width: 13, height: 25 }}
                value={value}
                onChange={onChange}
            />
        </View>
    )
}
export default DropdownComponent;
const styles = StyleSheet.create({
    dropdownIndexView: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'rgba(31, 36, 40, 0.30)',
    },
    dropdown: {
        height: 40,
        backgroundColor: 'white',
        width: '100%',
        paddingHorizontal: 8,
        borderRadius: 8
    },
    dropdownContainer: {
        width: 100
    },
    dropdownItemText: {
        fontSize: 16,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
        // paddingVertical: 2, // Add padding to allow for two lines
        lineHeight: 22, // Adjust line height to give more space between lines
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
})