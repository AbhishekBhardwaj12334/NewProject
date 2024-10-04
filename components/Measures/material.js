import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Fonts from '../../src/fonts/fonts';
import { useSelector } from 'react-redux';

const materialOptions = [
  { index: '00', label: 'Cut Wider', value: '100 USD' },
  { index: '01', label: 'Cut Taller', value: '200 USD' },
  { index: '02', label: 'Electrical Work', value: '300 USD' },
  { index: '03', label: 'Gas Line Work', value: '400 USD' },
];

const materialHeading = [{ value: 0, labelTitle: 'Material', valueTitle: 'Pricing' }];

const MultipleSelectDropdown3 = ({ onPress }) => {
  const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail)
  const [selectedItemsMaterial, setSelectedItemsMaterial] = useState([]);
  const [additionalMaterialText, setAdditionalMaterialText] = useState('');
  const selectedMaterial = useSelector(state => state.measuresData.doorWindowData.additionalDetails.materials.itemsMaterial);
  const descriptionMaterial = useSelector(state => state.measuresData.doorWindowData.additionalDetails.materials.description);

  useEffect(() => {
    if (selectedMaterial && selectedMaterial.length > 0) {
      setSelectedItemsMaterial(selectedMaterial);
    }
    if (descriptionMaterial) {
      setAdditionalMaterialText(descriptionMaterial);
    }
  }, [selectedMaterial, descriptionMaterial]);

  useEffect(() => {
    if (selectedData && selectedData?.additionalDetails?.materials) {
      setSelectedItemsMaterial(selectedData?.additionalDetails?.materials?.itemsMaterial || []);
      setAdditionalMaterialText(selectedData?.additionalDetails?.materials?.description || '');
    }
  }, [selectedData]);

  const handleValueChange = (item) => {
    if (!selectedItemsMaterial.some(material => material.label === item.label)) {
      setSelectedItemsMaterial(prevItems => [...prevItems, item]);
    }
  };

  useEffect(() => {
    onPress(selectedItemsMaterial, additionalMaterialText);
  }, [selectedItemsMaterial, additionalMaterialText]);

  const handleDeleteItem = (index) => {
    const updatedItemsMaterial = [...selectedItemsMaterial];
    updatedItemsMaterial.splice(index, 1);
    setSelectedItemsMaterial(updatedItemsMaterial);
  };

  const renderMaterial = () => {
    return (
      <View style={{ borderColor: selectedItemsMaterial.length > 0 ? 'black' : 'transparent' }}>
        {selectedItemsMaterial.map((item, index) => (
          <View key={index}>
            {index === 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.view9}>
                  <Text style={styles.labourInput1}>{materialHeading[0].labelTitle}</Text>
                </View>
                <View style={styles.view10}>
                  <Text style={styles.labourInput21}>{materialHeading[0].valueTitle}</Text>
                </View>
              </View>
            )}
            {(index !== selectedItemsMaterial.length + 1) && <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)' }} />}
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
      <Text style={styles.label}>Material</Text>
      <View style={styles.dropdownContainer}>
        <Dropdown
          style={styles.dropdown}
          data={materialOptions}
          mode='dropdown'
          labelField="label"
          valueField="label"
          placeholder="Material"
          placeholderStyle={{ color: 'black', fontFamily: Fonts.FONTS_MEDIUM, fontSize: 17 }}
          itemTextStyle={styles.dropdownItemText}
          value={selectedItemsMaterial.map(item => item.label)}
          onChange={(item) => handleValueChange(item)}
        />
      </View>
      {selectedItemsMaterial.length > 0 &&
        <View>
          <View style={{ flexDirection: 'row', backgroundColor: 'white', alignItems: 'center' }}>
            <ScrollView style={{ flex: 1 }} horizontal={true} showsHorizontalScrollIndicator={false}>
              {selectedItemsMaterial.map((item, index) => (
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
          {/* <View style={styles.view8}>
            {renderMaterial()}
          </View> */}
        </View>
      }
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: 'black', fontSize: 16, fontFamily: Fonts.FONTS_MEDIUM }}>Description</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Description"
          placeholderTextColor='black'
          value={additionalMaterialText}
          onChangeText={setAdditionalMaterialText}
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
  labourInput21: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black',
  },
  labourInput2: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR,
    color: '#1F2428',
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

export default MultipleSelectDropdown3;
