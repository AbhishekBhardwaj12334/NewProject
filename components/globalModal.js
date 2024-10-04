import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GlobalModal = ({ visible, title, message, okText, cancelText, onOk, onCancel }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.view1}>
                <View style={styles.view2}>
                    <View style={styles.view3}>
                        <Text style={styles.text1}>{title}</Text>
                        <Text style={styles.text2}>{message}</Text>
                    </View>
                    <View style={styles.view4}>
                        <TouchableOpacity
                            onPress={onOk}
                            style={styles.touchable}
                        >
                            <Text style={styles.text3}>{okText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={onCancel}
                            style={styles.touchable}
                        >
                            <Text style={styles.text3}>{cancelText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    view1: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 15
    },
    view2: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
    view3: {
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    text1: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: Fonts.FONTS_MEDIUM,
        color: 'black'
    },
    text2: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black',
    },
    view4: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 8,
        justifyContent: 'space-between',
    },
    touchable: {
        flex: 1,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderTopColor: 'rgba(31, 36, 40, 0.30)',
        borderRightColor: 'rgba(31, 36, 40, 0.30)',
        alignItems: 'center'
    },
    text3: {
        fontSize: 17,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'black'
    },
})

export default GlobalModal;
