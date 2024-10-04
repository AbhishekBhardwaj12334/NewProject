import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Fonts from '../../src/fonts/fonts';
import { useSelector } from 'react-redux';

const basicLabor = [
  { index: 0, label: 'AB', value: '100 USD' },
  { index: 1, label: 'CD', value: '200 USD' },
  { index: 2, label: 'EF', value: '300 USD' },
  { index: 3, label: 'GH', value: '400 USD' },
  { index: 4, label: 'IJ', value: '500 USD' },
];

const basicHeading = [
  { value: 0, labelTitle: 'Basic Labor', valueTitle: 'Pricing' },
];

const MultipleSelectDropdown1 = ({ onPress }) => {
  const [selectedItemsBasic, setSelectedItemsBasic] = useState([]);
  const [additionalBasicText, setAdditionalBasicText] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const selectedBasicLabor = useSelector(state => state.measuresData.doorWindowData.additionalDetails.basicLabor.itemsBasic);
  const descriptionBasic = useSelector(state => state.measuresData.doorWindowData.additionalDetails.basicLabor.description);
  const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail);

  useEffect(() => {
    if (selectedBasicLabor && selectedBasicLabor.length > 0) {
      setSelectedItemsBasic(selectedBasicLabor);
    }
    if (descriptionBasic) {
      setAdditionalBasicText(descriptionBasic);
    }
  }, [selectedBasicLabor, descriptionBasic]);

  const handleValueChange = (item) => {
    if (!selectedItemsBasic.some(selectedItem => selectedItem.label === item.label)) {
      setSelectedItemsBasic(prevItems => [...prevItems, item]);
      // setIsDropdownVisible(false);  // Close the dropdown after a selection is made
    }
  };

  useEffect(() => {
    // console.log("jgjgfgfjhds", JSON.stringify(selectedData))
    if (selectedData?.additionalDetails?.basicLabor) {
      setSelectedItemsBasic(selectedData?.additionalDetails?.basicLabor?.itemsBasic || []);
      setAdditionalBasicText(selectedData?.additionalDetails?.basicLabor?.description || '');
    }
  }, [selectedData]);

  useEffect(() => {
    onPress(selectedItemsBasic, additionalBasicText);
  }, [selectedItemsBasic, additionalBasicText]);

  const handleDeleteItem = (index) => {
    const updatedItemsBasic = [...selectedItemsBasic];
    updatedItemsBasic.splice(index, 1);
    setSelectedItemsBasic(updatedItemsBasic);
  };

  const renderBasicLabor = () => {
    return (
      <View style={{ borderColor: selectedItemsBasic.length > 0 ? 'black' : 'transparent' }}>
        {selectedItemsBasic.map((item, index) => (
          <View key={index}>
            {index === 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.view9}>
                  <Text style={styles.labourInput1}>{basicHeading[0].labelTitle}</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.labourInput21}>{basicHeading[0].valueTitle}</Text>
                </View>
              </View>
            )}
            {(index !== selectedItemsBasic.length + 1) && <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)' }} />}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.view9}>
                <Text style={styles.labourInput1}>{item.label}</Text>
              </View>
              <View style={styles.view10}>
                <Text style={styles.labourInput2}>{item.value}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Basic Labor</Text>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          data={basicLabor}
          itemTextStyle={styles.textStyle}
          selectedTextStyle={styles.textStyle}
          mode='dropdown'
          labelField="label"
          valueField="label"
          placeholder="Basic Labor"
          placeholderStyle={{ color: 'black', fontFamily: Fonts.FONTS_MEDIUM, fontSize: 17 }}
          onChange={(item) => handleValueChange(item)}
          value={selectedItemsBasic.map(item => item.label)}
        />
      </View>
      {selectedItemsBasic.length > 0 &&
        <View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {selectedItemsBasic.map((item, index) => (
                <View key={index} style={styles.selectedItem}>
                  <Text style={styles.selectedItemText}>{item.label}</Text>
                  <TouchableOpacity onPress={() => handleDeleteItem(index)}>
                    <Image
                      source={require('../../assets/icons/AdvanceFilter.png')}
                      style={styles.deleteIcon}
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={styles.view8}>
            {renderBasicLabor()}
          </View>
        </View>
      }
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'black', fontSize: 16, fontFamily: Fonts.FONTS_MEDIUM }}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          placeholderTextColor='black'
          value={additionalBasicText}
          onChangeText={setAdditionalBasicText}
          multiline={true}
          numberOfLines={6}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  label: {
    fontSize: 18,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  dropdown: {
    width: '100%',
    color: 'black',
    height: 50,
    paddingHorizontal: 15
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'black',
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
  textStyle: {
    fontSize: 17,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black',
  }
});

export default MultipleSelectDropdown1;
