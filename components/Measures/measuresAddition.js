import React, { useEffect, useState } from 'react'
import { ImageBackground, StatusBar, View, TouchableOpacity, Image, Text, moduleName, StyleSheet } from 'react-native';
import { addQuestions, setIndex, setSelectedResponseDetail, removeResponseAtIndex, updateDoorWindowData, addTempResponse, changeIsUpdating, setStep, setResponseIndex } from '../redux/measures';
import { useDispatch, useSelector } from 'react-redux';
import { questionsExterior, questionsInterior, questionsSecurity } from './questionPage';
import Fonts from '../../src/fonts/fonts'
import GlobalModal from '../globalModal';
import CopyModal from './copyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComponent from './Windows/btnComponent';
import { useNavigation } from '@react-navigation/native';
const MeasuresAddition = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const tempWindowIndex = useSelector(state => state.measuresData?.windowResponse?.index)
    const [modalVisible, setModalVisible] = useState(false);
    const globalIndex = useSelector(state => state.measuresData.doorWindowData.index);
    const globalStep = useSelector(state => state?.measuresData?.doorWindowData?.step);
    const [localIndex, setLocalIndex] = useState(globalIndex);
    const [localStep, setLocalStep] = useState(globalStep);
    const [modalVisible1, setModalVisible1] = useState(false);
    const templateName = useSelector(state => state.measuresData.doorWindowData.selectedTemplate);
    const [response, setResponse] = useState([]);
    const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail);
    console.log('dhcbdjc', localStep)
    useEffect(() => {
        const getData = async () => {
            try {
                let storedData
                if (templateName.templateId == '03') {
                    storedData = await AsyncStorage.getItem('tempResponse');
                } else if (templateName.templateId == '02') {
                    storedData = await AsyncStorage.getItem('eIDoorData')
                } else {
                    storedData = await AsyncStorage.getItem('stormData')
                }
                if (storedData !== null) {
                    let parsedData = JSON.parse(storedData);
                    setResponse(parsedData);
                    console.log('Fetched AsyncStorage Data:', parsedData);
                } else {
                    console.log('No data found');
                }
            } catch (error) {
                console.log('Error fetching data from AsyncStorage:', error);
            }
        };
        getData();
    }, []);
    const handleNewMeasures = () => {
        if (response.length >= 1) {
            const newIndex = response.length;
            setLocalIndex(newIndex)
            dispatch(setIndex(newIndex));
            const newStep = localStep + 1
            setLocalStep(newStep)
            dispatch(setStep(newStep));
        }
        else {
            const newIndex = 0;
            setLocalIndex(newIndex)
            dispatch(setIndex(newIndex));
            const newStep = localStep + 1
            setLocalStep(newStep)
            dispatch(setStep(newStep));
        }
        dispatch(setSelectedResponseDetail({}));
        if (templateName.templateId === '03') {
            navigation.navigate('WindowType')
        } else {
            navigation.navigate('WhereIsItData');
        }
    }

    const handleBack = () => {
        console.log('navigation:', navigation); // Check if navigation is defined
        if (navigation) {
            navigation.navigate('Templates')
        } else {
            console.error('Navigation is undefined!');
        }
    };

    const handleResponse = (index) => {
        dispatch(setSelectedResponseDetail(response[index]));
        dispatch(updateDoorWindowData(response[index]));
        dispatch(setStep(0));
        if (templateName.templateId === '03') {
            const newIndex = tempWindowIndex + 1
            dispatch(setResponseIndex(newIndex));
            dispatch(addTempResponse({ tempIndexResponse: response[index] }));
            dispatch(changeIsUpdating(true));
            navigation.navigate('WindowType')
        } else {
            navigation.navigate('WhereIsItData');
        }
    };



    const renderData = response.map((item, index) => {
        if (templateName.templateId == '03') {
            unitHeading = `${response[index].selectedOptions[1].optionValue[0]}${response[index].selectedOptions[2].optionValue[0]}${response[index].selectedOptions[3].optionValue[0]}-${response[index].interiorMeasures.roomName}`;
        } else {
            unitHeading = `Door ${index + 1}`
        }
        return (
            <TouchableOpacity
                key={index}
                style={styles.borderView}
                onPress={() => handleResponse(index)}
            >
                <View style={{ paddingVertical: 10 }}>
                    <View style={styles.rowView}>
                        <View style={styles.rowView1}>
                            <View>
                                <Text style={styles.unitHeading}>{unitHeading}</Text>
                            </View>
                        </View>
                    </View>
                    <GlobalModal
                        visible={modalVisible}
                        title="Are you sure?"
                        message="Do you want to Delete?"
                        okText="Ok"
                        cancelText="Cancel"
                        onOk={() => handleDelete(index)}
                        onCancel={() => setModalVisible(false)}
                    />
                    <CopyModal
                        visible={modalVisible1}
                        setVisible={setModalVisible1}
                    />
                </View>
            </TouchableOpacity>
        );
    });

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', marginTop: StatusBar.currentHeight, paddingHorizontal: 15, paddingBottom: 15 }}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image
                                source={require('../../assets/icons/arrowright_.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}

                            />
                        </TouchableOpacity>
                        <Text
                            style={{ flex: 1, fontSize: 26, fontFamily: Fonts.FONTS_MEDIUM, color: '#000' }}
                            numberOfLines={1}
                        >
                            {templateName.value}
                        </Text>
                        <ButtonComponent />
                    </View>
                    <View
                        style={styles.mainView}>
                        {response.length > 0 ?
                            (
                                <View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 20 }}>

                                    {renderData}
                                </View>

                            ) : (<View style={{ flex: 1, paddingHorizontal: 15, paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>

                                <Text style={{ fontSize: 17, fontFamily: Fonts.FONTS_REGULAR, color: '#498DEF' }}>No Measures Found</Text>
                            </View>)
                        }
                        <View style={{ paddingHorizontal: 15 }}>
                            <TouchableOpacity
                                style={{ alignItems: 'flex-end' }}
                                onPress={() => handleNewMeasures()}
                            >
                                <Image source={require('../../assets/images/Button.png')} style={{ height: 50, width: 50 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: '#F7F9F9',
        flex: 1,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        // paddingHorizontal: 15,
        paddingVertical: 10
    },
    borderView: {
        borderWidth: 1,
        borderColor: '#498DEF',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#498DEF'
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    rowView1: {
        flex: 1,
        flexDirection: 'row'
    },
    imageView: {
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        backgroundColor: 'white',
        opacity: 1
    },
    windowImage: {
        width: 30,
        height: 30,
    },
    unitHeading: {
        fontFamily: Fonts.FONTS_BOLD,
        color: 'white',
        top: 2,
        fontSize: 17,
        left: 5
    },
    viewJobBtn: {
        alignItems: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#498DEF'
    },
    buttonText: {
        fontSize: 13,
        color: '#498DEF',
        textAlign: 'center',
        fontFamily: Fonts.FONTS_MEDIUM
    }
})
export default MeasuresAddition;