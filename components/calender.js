import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import moment from 'moment';
import Fonts from '../src/fonts/fonts';
import RenderDate from './renderDate';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [startIndex, setStartIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(moment()); 
  const [jobs, setJobs] = useState([]);

  const handlePrev = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'month'));
  };
  const handlePrev1 = () => {
    setStartIndex(Math.max(0, startIndex - 5));
  };

  const handleNext = () => {
    setCurrentDate(currentDate.clone().add(1, 'month'));
  };
  const handleNext1 = () => {
    const lastDateIndex = moment(currentDate).endOf('month').date() - 1;
    setStartIndex(Math.min(lastDateIndex - 4, startIndex + 5));
  };

  const handleDatePress = (date) => {
    if (selectedDate) {
      setSelectedDate(null);
    }
    if (date.isSame(moment(), 'day')) {
      setSelectedDate(currentDate.clone());
    } else {
      setSelectedDate(date);
    }

    const randomStartTime = date.clone().startOf('day').add(10, 'hours');
    const randomEndTime = randomStartTime.clone().add(2, 'hours');
    const randomJob = { startTime: randomStartTime, endTime: randomEndTime, title: 'Random Job' };

    setJobs([randomJob]);
    // console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  const generateDates = () => {
    const startOfMonth = currentDate.clone().startOf('month');
    const endOfMonth = currentDate.clone().endOf('month');
    const today = moment(); // Get today's date

    const dates = [];

    for (let i = 0; i < 5; i++) {
      const index = startIndex + i;
      const current = startOfMonth.clone().add(index, 'days');

      if (current.isAfter(endOfMonth)) {
        break;
      }

      dates.push({
        momentObj: current.clone(),
        formattedDate: current.format('YYYY-MM-DD'),
        dayOfWeek: current.format('ddd'),
        // isToday: current.isSame(today, 'day'),
      });
    }

    return dates;
  };

  return (
    <View>
    <View style={{paddingHorizontal:15,maxHeight:200}}>
      <View style={styles.view1}>
        <TouchableOpacity onPress={handlePrev}>
          <Image
            source={require('../assets/icons/LeftIcon.png')}
            style={styles.image1}
          />
        </TouchableOpacity>
        <Text style={styles.text1}>{currentDate.format('MMMM , YYYY')}</Text>
        <TouchableOpacity onPress={handleNext}>
          <Image
            source={require('../assets/icons/RightIcon.png')}
            style={styles.image2}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.view2}>
        <TouchableOpacity onPress={handlePrev1}>
          <Image
            source={require('../assets/icons/leftButton.png')}
            style={styles.image3}
          />
        </TouchableOpacity>
        {generateDates().map((date) => (
          <TouchableOpacity
            key={date.formattedDate}
            onPress={() => handleDatePress(date.momentObj)}
          >
            <View style=
              {[
                styles.view3,
                {borderColor: date.isToday ? '#0E4CF8' : (selectedDate && selectedDate.isSame(date.momentObj, 'day') ? '#0E4CF8' : '#E8E8E7'),},
                {backgroundColor: date.isToday ? '#0E4CF8' : (selectedDate && selectedDate.isSame(date.momentObj, 'day') ? '#0E4CF8' : '#E8E8E7'),}
              ]}>
              <Text style={
                [
                  styles.text2,
                  {color: date.isToday || (selectedDate && selectedDate.isSame(date.momentObj, 'day')) ? 'white' : 'black'}
                ]}>
                {date.momentObj.format('D')}
              </Text>
              <Text style={{ 
                color: date.isToday || (selectedDate && selectedDate.isSame(date.momentObj, 'day')) ? 'white' : 'black'}}
              >
                  {date.dayOfWeek}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={handleNext1}>
          <Image
            source={require('../assets/icons/rightzButton.png')}
            style={{ height: '25%', resizeMode: 'contain' }}
          />
        </TouchableOpacity>
      </View>
    </View>
    {selectedDate && (
      <RenderDate jobs={jobs}/>
    )}
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  view1:{ 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  image1:{ 
    height: '30%', 
    resizeMode: 'contain', 
    right: 5 
  },
  text1:{ 
    fontSize: 18, 
    fontFamily: Fonts.FONTS_BOLD, 
    color: '#4899F1' 
  },
  image2:{ 
    height: '30%', 
    resizeMode: 'contain', 
    left: 5 
  },
  view2:{ 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    bottom: 5 
  },
  image3:{ 
    height: '25%', 
    resizeMode: 'contain' 
  },
  view3:{
    borderWidth: 1,
    borderRadius: 8,
    margin: 5,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 54
  },
  text2:{
    fontSize: 13,
    fontFamily: Fonts.FONTS_BOLD,
  },
})