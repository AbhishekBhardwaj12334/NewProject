import { View, Text } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment'; 
import Fonts from '../src/fonts/fonts';
import { Linear } from './globaconstants';

const isTimeWithinJob = (currentTime, job) => {
  return currentTime.isBetween(job.startTime, job.endTime);
};

const RenderDate = () => {
  const generateRandomJobs = () => {
    const randomJobs = [];
    for (let i = 0; i < 3; i++) {
      const randomStartTime = moment().startOf('day').add(Math.floor(Math.random() * 24), 'hours');
      const randomDuration = 1 + Math.floor(Math.random() * 3); // 1, 2, or 3 hours
      const randomEndTime = randomStartTime.clone().add(randomDuration, 'hours');

      randomJobs.push({
        startTime: randomStartTime,
        endTime: randomEndTime,
        title: `Job ${i + 1}`,
        customerName: `Customer ${i + 1}`,
        jobTitle: `Job Title ${i + 1}`,
        additionalText: `Additional Text ${i + 1}`,
      });
  
    }
    return randomJobs;
  };

  const jobs = generateRandomJobs();

  return (
    <KeyboardAwareScrollView>
      <View style={{ flex: 1, paddingBottom: 260 }}>
        {Array.from({ length: 24 }).map((_, index) => {
          const currentTime = moment().startOf('day').add(index, 'hours');
          const overlappingJobs = jobs.filter(job =>
            isTimeWithinJob(currentTime, job)
          );

          return (
            <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 30, position: 'relative' }}>
              <Text style={{ fontSize: 12, fontFamily: Fonts.FONTS_BOLD, color: 'black' }}>
                {index % 12 === 0 ? '00' : (index % 12).toString().padStart(2, '0')}:{'00'}{' '}
                {index < 12 ? 'AM' : 'PM'}
              </Text>
              <Linear/>
              {overlappingJobs.map((job, jobIndex) => (
                <View key={jobIndex} style={{flex:1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <KeyboardAwareScrollView>
                  <View style={{ backgroundColor: 'blue', padding: 8, borderRadius: 5 }}>
                    
                    <Text style={{ fontSize: 12, color: 'black' }}>
                      Customer: {job.customerName}{'\n'}
                      Job Title: {job.jobTitle}{'\n'}
                      Start Time: {job.startTime.format('hh:mm A')}{'\n'}
                      End Time: {job.endTime.format('hh:mm A')}{'\n'}
                      Additional Text: {job.additionalText}
                    </Text>                    
                  </View>
                  </KeyboardAwareScrollView>
                </View>
              ))}
            </View>
          );
        })}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RenderDate;
