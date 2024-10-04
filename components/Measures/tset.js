import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { updateSelectedValue } from '../redux/measures';

const Dropdown = () => {
  const dispatch = useDispatch();
  const selectedDropdowns = useSelector(state => state.selectedDropdowns);

  const minuteMeasures = [
    { label: '1/8', value: '1/8' },
    { label: '1/4', value: '1/4' },
    { label: '3/8', value: '3/8' },
    { label: '1/2', value: '1/2' },
    { label: '5/8', value: '5/8' },
    { label: '3/4', value: '3/4' },
    { label: '7/8', value: '7/8' },
  ];

  const headings = ["Frame Height", "Frame Width", "Rough Width", "Rough Opening"];

  const initialDropdownData = [
    {
      dropdowns: [
        { selectedValue: 0, options: Array.from({ length: 181 }, (_, i) => ({ label: `${i + 20}`, value: `${i + 20}` })) },
        { selectedValue: 0, options: minuteMeasures }
      ]
    },
    {
      dropdowns: [
        { selectedValue: 0, options: Array.from({ length: 91 }, (_, i) => ({ label: `${i + 60}`, value: `${i + 60}` })) },
        { selectedValue: 0, options: minuteMeasures }
      ]
    },
    {
      dropdowns: [
        { selectedValue: 0, options: Array.from({ length: 181 }, (_, i) => ({ label: `${i + 20}`, value: `${i + 20}` })) },
        { selectedValue: 0, options: minuteMeasures }
      ]
    },
    {
      dropdowns: [
        { selectedValue: 0, options: Array.from({ length: 91 }, (_, i) => ({ label: `${i + 60}`, value: `${i + 60}` })) },
        { selectedValue: 0, options: minuteMeasures }
      ]
    }
  ];

  const [dropdownData, setDropdownData] = useState(initialDropdownData);

  useEffect(() => {
    // Dispatch updated selected values to Redux
    const data = dropdownData.map((data, index) => ({
        heading: headings[index], // Include the heading for each dropdown
        selectedValue: data.dropdowns.map(dropdown => dropdown.selectedValue)
    }));
    dispatch(updateSelectedValue({ data }));
}, [dropdownData, dispatch]);

const handleValueChange = (headingIndex, dropdownIndex, value) => {
    setDropdownData(prevDropdownData => {
        const updatedData = [...prevDropdownData];
        updatedData[headingIndex].dropdowns[dropdownIndex].selectedValue = value;
        return updatedData;
    });
};

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      {dropdownData.map((data, headingIndex) => (
        <View key={headingIndex} style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 20, borderRadius: 10, borderColor: 'rgba(31, 36, 40, 0.30)' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#498DEF' }}>{headings[headingIndex]}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            {data.dropdowns.map((dropdown, dropdownIndex) => (
              <View key={dropdownIndex} style={{ flex: 1, marginRight: 10, borderWidth: 1, borderRadius: 10, borderColor: 'rgba(31, 36, 40, 0.30)' }}>
                {dropdown && dropdown.options && (
                  <Picker
                    mode='dropdown'
                    selectedValue={dropdown.selectedValue.toString()}
                    onValueChange={(itemValue) => handleValueChange(headingIndex, dropdownIndex, itemValue)}
                  >
                    {dropdown.options.map((option, optionIndex) => (
                      <Picker.Item
                        key={optionIndex}
                        label={option.label}
                        value={option.value}
                      />
                    ))}
                  </Picker>
                )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Dropdown;
