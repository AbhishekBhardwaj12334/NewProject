import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Fonts from '../../src/fonts/fonts';
import { useSelector } from 'react-redux';

const customLaborOptions = [
  { index: 0, label: 'Cut Wider', value: '100 USD' },
  { index: 1, label: 'Cut Taller', value: '200 USD' },
  { index: 2, label: 'Electrical Work', value: '300 USD' },
  { index: 3, label: 'Gas Line Work', value: '400 USD' },
];

const customHeading = [{ value: 0, labelTitle: 'Custom Labor', valueTitle: 'Pricing' }];

const MultipleSelectDropdown2 = ({ onPress }) => {
  const [selectedItemsCustom, setSelectedItemsCustom] = useState([]);
  const [additionalCustomText, setAdditionalCustomText] = useState('');
  const selectedCustomLabor = useSelector(state => state.measuresData.doorWindowData.additionalDetails.customLabor.itemsCustom);
  const descriptionCustom = useSelector(state => state.measuresData.doorWindowData.additionalDetails.customLabor.description);
  const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail);
  // console.log('bamvhjsgjas', JSON.stringify(selectedData))
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (selectedCustomLabor && selectedCustomLabor.length > 0) {
      setSelectedItemsCustom(selectedCustomLabor);
    }
    if (descriptionCustom) {
      setAdditionalCustomText(descriptionCustom);
    }
  }, [selectedCustomLabor, descriptionCustom]);

  useEffect(() => {
    console.log('hjxjkhkaj', JSON.stringify(selectedData))
    if (selectedData?.additionalDetails?.customLabor) {
      setSelectedItemsCustom(selectedData?.additionalDetails?.customLabor?.itemsCustom || []);
      setAdditionalCustomText(selectedData?.additionalDetails?.customLabor?.description || []);
    }
    setCounter(counter + 1)
  }, [selectedData]);

  const handleValueChange = (item) => {
    if (!selectedItemsCustom.some(selectedItem => selectedItem.label === item.label))
      setSelectedItemsCustom(prevItems => [...prevItems, item]);
  };

  useEffect(() => {
    onPress(selectedItemsCustom, additionalCustomText);
  }, [selectedItemsCustom, additionalCustomText]);

  const handleDeleteItem = (index) => {
    const updatedItemsCustom = [...selectedItemsCustom];
    updatedItemsCustom.splice(index, 1);
    setSelectedItemsCustom(updatedItemsCustom);
  };

  const renderCustomLabor = () => {
    return (
      <View style={{ borderColor: selectedItemsCustom.length > 0 ? 'black' : 'transparent' }}>
        {selectedItemsCustom.map((item, index) => (
          <View key={index}>
            {index === 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.view9}>
                  <Text style={styles.labourInput1}>{customHeading[0].labelTitle}</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.labourInput21}>{customHeading[0].valueTitle}</Text>
                </View>
              </View>
            )}
            {(index !== selectedItemsCustom.length + 1) && <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)' }} />}
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
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Custom Labor</Text>
      <View style={styles.dropdownContainer}>
        <Dropdown

          style={styles.dropdown}
          data={customLaborOptions}
          mode='dropdown'
          labelField="label"
          valueField="label"
          placeholder="Custom Labor"
          itemTextStyle={styles.dropdownItemText}
          onChange={(item) => handleValueChange(item)}
          placeholderStyle={{ color: 'black', fontFamily: Fonts.FONTS_MEDIUM, fontSize: 17 }}
          value={selectedItemsCustom.map(item => item.label)}

        />
      </View>
      {selectedItemsCustom.length > 0 &&
        <View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {selectedItemsCustom.map((item, index) => (
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
            {renderCustomLabor()}
          </View>
        </View>
      }
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'black', fontSize: 16, fontFamily: Fonts.FONTS_MEDIUM }}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          placeholderTextColor='black'
          value={additionalCustomText}
          onChangeText={setAdditionalCustomText}
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
    paddingTop: 15
  },
  label: {
    fontSize: 18,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: 'black'
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
    paddingHorizontal: 15,
    top: 5
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
    marginTop: 20
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
    paddingHorizontal: 20
  },
  labourInput1: {
    flex: 1,
    fontSize: 14,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black'
  },
  labourInput21: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black'
  },
  labourInput2: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR,
    color: '#1F2428'
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
    // maxHeight: 1000
  },
});

export default MultipleSelectDropdown2;
