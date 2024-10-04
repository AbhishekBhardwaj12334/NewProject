import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, ImageBackground } from 'react-native';
import TextValue from '../textInsideView';

const { width } = Dimensions.get('window');
const cardWidth = 1 * width; // Adjusted width for each card (considering padding)
const spaceBetweenColumns = 15;

const DynamicCardGrid = () => {
  const cardsData = [
    { id: 1, ratio: 100, text: 'Assesment', subText: 140,imagePath:require('../../assets/icons/AssesmentIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
    { id: 2, ratio: 100, text: 'Installation',subText: 137,imagePath:require('../../assets/icons/InstallerIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
    { id: 3, ratio: 100, text: 'Work Order',subText:1,imagePath:require('../../assets/icons/WorkOrderIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
    { id: 4, ratio: 100, text: 'Crossroads', subText:0,imagePath:require('../../assets/icons/OtherIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
    { id: 5, ratio: 60, text: 'Permit',subText:1,imagePath:require('../../assets/icons/PermitIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
    { id: 6, ratio: 60, text: 'Appointments' ,subText: 5,imagePath:require('../../assets/icons/OnlineAppointmentIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
    { id: 7, ratio: 60, text: 'Online Leads', subText: 0,imagePath1:require('../../assets/icons/MaskIcon.png'),imagePath:require('../../assets/icons/OtherIcon.png')},
    { id: 8, ratio: 60, text: 'Allied Fence', subText: 2,imagePath1:require('../../assets/icons/MaskIcon.png'),imagePath:require('../../assets/icons/OtherIcon.png')},
    { id: 9, ratio: 60, text: 'Online', subText: 0,imagePath:require('../../assets/icons/OtherIcon.png'),imagePath1:require('../../assets/icons/MaskIcon.png')},
  ];

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.column}>
        {cardsData.slice(0, 4).map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, { height: (card.ratio / 150) * cardWidth, marginBottom: 10 }]}
            onPress={() => console.log(`Card ${card.id} Pressed`)}
          >
            <View key={card.id} style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row',alignItems:'center'}}>
                    <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_REGULAR, color: 'white' }}>
                        {card.text}
                    </Text>
                    <Image
                        source={require('../../assets/icons/arrowRight.png')}
                        style={{ height: 10, width: 10, resizeMode: 'contain', left: 10 }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 21, fontFamily: Fonts.FONTS_BOLD, color: 'white' }}>{card.subText}</Text>
                    <ImageBackground
                      source={card.imagePath1} 
                      style={{width:165,height:165,right:22,top:27,borderRadius:20}}
                    >
                    <Image
                      source={card.imagePath}
                      style={{width:130,height:110,left:25,top:30}}
                    />
                    </ImageBackground>
                </View>
            </View>        
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ width: spaceBetweenColumns }} />
      <View style={styles.column}>
        {cardsData.slice(4).map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, { height: (card.ratio / 150) * cardWidth, marginBottom: 10,  }]}
            onPress={() => console.log(`Card ${card.id} Pressed`)}
          >
            <View key={card.id} style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', alignItems:'center'}}>
                    <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_REGULAR, color: 'white' }}>
                        {card.text}
                    </Text>
                    <Image
                        source={require('../../assets/icons/arrowRight.png')}
                        style={{ height: 10, width: 10, resizeMode: 'contain', left: 10 }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 21, fontFamily: Fonts.FONTS_BOLD, color: 'white' }}>{card.subText}</Text>
                    <ImageBackground
                      source={card.imagePath1}
                      style={{height:115,width:115,left:30,bottom:29,borderBottomRightRadius:22}}
                      >
                      <Image
                        source={card.imagePath}
                        style={{width:80,height:80,top:20,left:20}}
                      />
                      </ImageBackground>
                </View>
            </View>        
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 20,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  card: {
    borderRadius: 20,
    backgroundColor: '#498DEF',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:10,
    elevation: 5, // for shadow (Android)
    shadowColor: 'rgba(0, 0, 0, 0.3)', // for shadow (iOS)
    shadowOpacity: 0.8, // for shadow (iOS)
    shadowRadius: 5, // for shadow (iOS)
    shadowOffset: { width: 0, height: 2 }, // for shadow (iOS)
  },
  cardText: {
    fontSize: 18,
  },
});

export default DynamicCardGrid;
