import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const DetailAdditions = ({ templateType }) => {
  const selectedData = useSelector(state => {
    if (templateType === '03') {
      return state.measuresData?.allMeasures?.selectedResponseDetail;
    } else {
      return state.measuresData?.doorWindowData;
    }

    // Add more conditions as needed for different templates
    return [];
  });
  const details = useSelector(state => state.measuresData?.windowResponse)
  console.log(JSON.stringify('shjsakxkaj', JSON.stringify(details)));
  const toggleBtn = selectedData?.toggleBtn == true ? 'Yes' : 'No';


  return (
    <View>
      {selectedData?.selectedOptions.map((item, index) => (
        <View key={index}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, color: '#1F2428' }}> {item.question}</Text>
            </View>
            <View style={{ flex: .3 }}></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_MEDIUM, color: '#1F2428' }}> {item.optionValue}</Text>
            </View>
          </View>
          <LinearGradient
            locations={[0, 0.3, 0.7]}
            colors={["#ffffff", "#1F242822", "#ffffff"]}
            style={{ height: 2, marginVertical: 5 }}
          />

        </View>
      ))}
      {templateType == '03' &&
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, color: '#1F2428' }}> Nail Fin Needed</Text>
            </View>
            <View style={{ flex: .3 }}></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_MEDIUM, color: '#1F2428' }}>{toggleBtn} </Text>
            </View>
          </View>
          <LinearGradient
            locations={[0, 0.3, 0.7]}
            colors={["#ffffff", "#1F242822", "#ffffff"]}
            style={{ height: 2, marginVertical: 5 }}
          />
        </View>
      }

    </View>
  );
};

export default DetailAdditions;
