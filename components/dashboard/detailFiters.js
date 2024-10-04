import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const dynamicData = [
  { id: 1, text: 'Installation'},
  { id: 2, text: 'Assessment'},
  { id: 3, text: 'Work Order'},
  { id: 4, text: 'Permit'},
  { id: 5, text: 'Appointments'},
  { id: 6, text: 'Crossroads'},
  { id: 7, text: 'Online Leads'},
  { id: 8, text: 'Allied Fence'},
  { id: 9, text: 'Online Work'},
];

const MyModal = (props) => {
  const [selectedTexts, setSelectedTexts] = useState([]);

  const handleTextSelection = (id) => {
    if (selectedTexts.includes(id)) {
      setSelectedTexts(selectedTexts.filter((item) => item !== id));
    } else {
      setSelectedTexts([...selectedTexts, id]);
    }
  };

  const isSelected = (id) =>selectedTexts.includes(id);

  return (
    <ScrollView style={styles.container}>
      {dynamicData.map((data) => (
        <TouchableOpacity
          key={data.id}
          style={styles.itemWrapper}
          onPress={() => handleTextSelection(data.id)}
        >
          <View style={styles.checkbox}>
            <Image
              source={isSelected(data.id) ? require('../../assets/icons/check.png') : require('../../assets/icons/empty-check.png')}
              style={styles.checkboxImage}
            />
          </View>
          <Text style={styles.text}>{data.text}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    // paddingHorizontal: 18,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxImage: {
    width: 15,
    height: 15,
  },
  text: {
    fontSize: 12,
    color: 'black',
    fontFamily: Fonts.FONTS_MEDIUM,
    // top:2
  },
});

export default MyModal;
