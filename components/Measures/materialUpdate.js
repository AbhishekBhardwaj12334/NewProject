import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';

const MaterialRender = () => {
  const template = useSelector(state => state.measuresData?.doorWindowData?.selectedTemplate)
  let selectedMaterial;
  let descriptionMaterial;

  // Set the values inside the if-else block
  if (template?.templateId === '03') {
    selectedMaterial = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.additionalDetails?.materials?.itemsMaterial);
    descriptionMaterial = useSelector(state => state.measuresData?.allMeasures?.selectedResponseDetail?.additionalDetails?.materials?.description);
  } else {
    selectedMaterial = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.materials?.itemsMaterial);
    descriptionMaterial = useSelector(state => state.measuresData?.doorWindowData?.additionalDetails?.materials?.description);
  }
  const MaterialHeading = [
    { value: 0, labelTitle: 'Material', valueTitle: 'Pricing' },
  ];
  return (
    <View>
      {selectedMaterial && selectedMaterial.length > 0 ? (
        <View style={[styles.view8]}>
          {selectedMaterial.map((item, index) => (
            <View key={index}>
              {index === 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.view9}>
                    <Text style={styles.labourInput1}>{MaterialHeading[0].labelTitle}</Text>
                  </View>
                  <View style={styles.view10}>
                    <Text style={styles.labourInput21}>{MaterialHeading[0].valueTitle}</Text>
                  </View>
                </View>
              )}
              {(index !== selectedMaterial.length + 1) && <View style={{ borderTopWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)' }} />}
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
      ) : null}

      {descriptionMaterial ? (
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 17, fontFamily: Fonts.FONTS_MEDIUM, color: '#1F2428' }}>Description</Text>
          <Text style={{ fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, color: '#1F2428' }}>{descriptionMaterial}</Text>
          <LinearGradient
            locations={[0, 0.3, 0.7]}
            colors={['#1F2428', "#1F242822", "#ffffff"]}
            style={{ height: 1, marginVertical: 8 }}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  frameHeading: {
    fontSize: 16,
    fontFamily: Fonts.FONTS_MEDIUM,
    color: '#1F2428',
    top: 13
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
  labourInput2: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_REGULAR,
    color: '#1F2428'
  },
  labourInput21: {
    fontSize: 14,
    fontFamily: Fonts.FONTS_BOLD,
    color: 'black'
  },
});
export default MaterialRender; 
