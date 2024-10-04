import {useState} from "react";
import { View, Text, ImageBackground, StyleSheet, StatusBar, TouchableOpacity, Image, ScrollView, Modal} from 'react-native';
import Fonts from '../../src/fonts/fonts';
import MyModal from "./detailFiters";
import JobList from "./jobList";

const AdminSearch = ({ navigation }) => {

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleClearSelection = () => {
        setSelectedCheckboxes([]);
        setModalVisible(false)
    };

    const handleBack = () => {
        navigation.goBack('Search')
    }

    const handleGo = () => {
        navigation.navigate('GoScreen')
    }

    const [modalVisible, setModalVisible] = useState(false);
    function renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View
                    style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View
                        style={{ backgroundColor: 'white', borderRadius: 10 }}>
                        <View
                            style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                            <Text style={{ textAlign: 'center', fontSize: 20, fontFamily: Fonts.FONTS_MEDIUM, color: 'black' }}>Clear</Text>
                            <Text style={{ textAlign: 'center', fontSize: 15, fontFamily: Fonts.FONTS_REGULAR, color: 'black' }}>
                                Are you sure you want to clear
                            </Text>
                        </View>
                        <View style={styles.view5}>
                            <TouchableOpacity
                                onPress={handleClearSelection}
                                style={{ paddingVertical: 10, borderTopWidth: 1, borderRightWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)', borderRightColor: 'rgba(31, 36, 40, 0.30)',flex:1, alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 17, fontFamily: Fonts.FONTS_REGULAR, color: 'black' }}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setModalVisible(false) }}
                                style={{ paddingVertical: 10, flex:1,borderTopWidth: 1, borderLeftWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)', borderLeftColor: 'rgba(31, 36, 40, 0.30)', alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 17, fontFamily: Fonts.FONTS_REGULAR, color: 'black'}}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </Modal>

        );
    }
    const handleClear = () => {
        console.log('hhiosajkj');
        setModalVisible(false);
    }
    return(
        <View style={{flex:1}}>
            <ImageBackground 
                source={require('../../assets/images/screenbackground.png')}
                style={{ flex: 1 }}
            >
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
                <View style={styles.view1}>
                    <TouchableOpacity
                        onPress={handleBack}
                        style={styles.touchable1}
                    >
                        <Image
                            source={require('../../assets/icons/arrowright_.png')}
                            style={styles.image1}
                        />
                    </TouchableOpacity>
                    <Text style={styles.text1}> Search Jobs </Text>
                </View>
                <View style={{flex:1,flexDirection:'row'}}>
                    <JobList/>
                    <View style={{flex:2,paddingHorizontal:10,paddingVertical:10,backgroundColor:'white'}}>
                        <MyModal isSelected={selectedCheckboxes}/>
                        <View style={styles.view4}>
                        <TouchableOpacity
                            onPress={() => { setModalVisible(true) }}
                            style={{ paddingVertical: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#1FB1F0',flex:1,margin:5, alignItems: 'center', borderRadius: 8 }}
                        >
                            <Text style={styles.text2}>Clear</Text>
                        </TouchableOpacity>
                        {renderModal()}
                        <TouchableOpacity
                            style={{ paddingVertical: 10, backgroundColor: '#46B420', borderWidth: 1, borderColor: '#46B420',flex:1,margin:5, alignItems: 'center', borderRadius: 8 }}
                            onPress={() => {handleGo()}}
                        >
                            <Text style={styles.text3}>Go</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    touchable1: {
        flex: 1,
        maxWidth: 20,
        marginRight: 30,
        top: 3
    },
    image1: {
        width: 20,
        height: 100,
        resizeMode: 'contain',

    },
    text1: {
        fontSize: 28,
        fontFamily: Fonts.FONTS_MEDIUM,
        top: 6,
        color: 'black'
    },
    view4: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        justifyContent: 'space-between',
        // paddingHorizontal:10
    },
    text2: {
        fontSize: 17,
        fontFamily: Fonts.FONTS_REGULAR,
        color: '#1592E3'
    },
    text3: {
        fontSize: 17,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'white'
    },
    view5: {
        flexDirection: 'row',
        alignItems: 'center',
        // paddingVertical: 8,
        justifyContent: 'space-between',
    },
})
export default AdminSearch; 