import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import AnimatedInput from "../animateView";
import Fonts from '../../src/fonts/fonts';

const GlobalBottomSheet = forwardRef(({ location, locationLabel, value, onChangeText, handlePress }, ref) => {
    const rbSheetRef = useRef(null);

    useImperativeHandle(ref, () => ({
        open: () => {
            rbSheetRef.current.open();
        },
        close: () => {
            rbSheetRef.current.close();
        }
    }));

    return (
        <View style={styles.container}>
            <RBSheet
                ref={rbSheetRef}
                height={300}
                draggable={true}
                openDuration={250}
                customStyles={{
                    container: {
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    },
                    draggableIcon: {
                        width: '30%',
                        height: 5,
                        backgroundColor: 'black'
                    }
                }}
            >
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                        <Text style={{ fontSize: 18, fontFamily: Fonts.FONTS_BOLD, color: '#498DEF' }}>{location}</Text>
                    </View>
                    <View style={{ flex: .7 }}></View>
                    <View style={styles.view9}>
                        <AnimatedInput
                            label={locationLabel}
                            value={value}
                            onChangeText={onChangeText}
                            editable={true}
                            containerStyles={styles.userInputContainer}
                        />
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ paddingBottom: 15 }}>
                        <TouchableOpacity
                            onPress={handlePress}
                            style={{ padding: 20, backgroundColor: '#498DEF', borderRadius: 10, alignItems: 'center' }}
                        >
                            <Text style={{ color: 'white', fontSize: 18, fontFamily: Fonts.FONTS_BOLD }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </RBSheet>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    headerText: {
        color: 'white',
        fontSize: 20
    },
    userInputContainer: {
        fontSize: 22,
        color: 'rgb(0,0,0)',
        marginTop: 0,
        marginBottom: 5,
        borderRadius: 10,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
        paddingHorizontal: 10
    },
    view9: {
        flex: 1,
        backgroundColor: 'white',
        maxHeight: 55,
        borderWidth: 1,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 8,
        width: '100%',
    },
});

export default GlobalBottomSheet;
