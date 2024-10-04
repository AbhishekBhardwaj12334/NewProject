import React from "react";
import { View, Text, Image } from 'react-native';
import Fonts from '../src/fonts/fonts'

const TextValue = ({route}) => {
    const cardsData = [
        { id: 1, ratio: 100, text: 'Assesment', subText: 140},
        { id: 2, ratio: 100, text: 'Installation',subText: 137},
        { id: 3, ratio: 100, text: 'Work Order',subText:1 },
        { id: 4, ratio: 100, text: 'Crossroads', subText:0 },
        { id: 5, ratio: 60, text: 'Permit',subText:1 },
        { id: 6, ratio: 60, text: 'Online Appointments' ,subText: 5 },
        { id: 7, ratio: 60, text: 'Online Leads', subText: 0},
        { id: 8, ratio: 60, text: 'Allied Fence', subText: 2 },
        { id: 9, ratio: 60, text: 'Online', subText: 0 },
      ];
    return (
            <View>
                {cardsData.slice(0, 4).map((card) => (
                <View key={card.id} style={{ flex: 1, paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', backgroundColor: '#498DEF' }}>
                    <Text style={{ fontSize: 14, fontFamily: Fonts.FONTS_REGULAR, color: 'white' }}>
                        {card.text}
                    </Text>
                    <Image
                        source={require('../assets/icons/arrowRight.png')}
                        style={{ height: 10, width: 10, resizeMode: 'contain', left: 10 }}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 21, fontFamily: Fonts.FONTS_BOLD, color: 'white' }}>{card.subText}</Text>
                </View>
            </View>        
            ))}
            </View>

        )
    }
    export default TextValue;
 