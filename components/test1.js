import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text, Modal } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import AnimatedInputSearch from "./dashboard/animateView1";
const CalendarPickerComponent1 = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false); // State to control calendar visibility
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null); // Reset end date when start date changes
    }
  };

  const handleDone = () => {
    setCalendarVisible(false);
    setModalVisible(false); // Close modal when Done button is pressed
  };

  return (
    <View style={styles.container}>
        <View style={styles.view10}>
        <AnimatedInputSearch
          label='Date Range'
          value={selectedStartDate && selectedEndDate ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}` : ''}
          onChangeText={(text) => setSelectedStartDate && setSelectedEndDate(text)}
          editable={true}
          containerStyles={styles.userInputContainer1}
        />
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require('../assets/icons/schedule.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={true}
              minDate={new Date()} // Set minimum date as today
              selectedStartDate={selectedStartDate}
              selectedEndDate={selectedEndDate}
              onDateChange={onDateChange}
              selectedDayStyle={styles.selectedDay}
            />
            <TouchableOpacity onPress={handleDone} style={styles.doneButton}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  userInputContainer1: {
    fontSize: 20,
    color: 'rgb(0,0,0)',
    marginTop: 0,
    marginBottom: 5,
    borderRadius: 10,
    fontFamily: Fonts.FONTS_REGULAR,
    color: 'rgba(31, 36, 40, 0.30)',
    width: '88%'
},
view10: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    maxHeight: 60,
    borderWidth: 2,
    borderColor: 'rgba(31, 36, 40, 0.30)',
    borderRadius: 8,
    marginBottom: 20
},
  image: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  selectedDay: {
    backgroundColor: 'blue', // Customize the background color of selected dates
  },
  doneButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  doneText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Arial', // Customize font family if needed
  },
});

export default CalendarPickerComponent1;
