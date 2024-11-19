import React, { useEffect, useState } from 'react';
import { ImageBackground, StatusBar, Text, TouchableOpacity, View, Image, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../../src/fonts/fonts';
import Summary from './summary';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setSelectedResponseDetail, clearTemplate, setIndex, removeResponseAtIndex, setResponseIndex, changeIsUpdating, addDetails, updateDoorWindowData } from '../redux/measures';
import GlobalModal from '../globalModal';
import CopyModal from './copyModal';
import { useRoute } from '@react-navigation/native';
import NavigateBackHandler from './summaryBackHandler';
import { realmConfig } from '../realmConfig';
const { useRealm } = realmConfig;
const WindowsSummary = ({ navigation }) => {
    const details = useSelector(state => state.measuresData?.doorWindowData);
    const realm = useRealm();
    const tempResponse = useSelector(state => state.measuresData?.windowResponse?.tempResponse);
    // console.log('selectedData:', JSON.stringify(details))
    const [isUpdating, setIsUpdating] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const globalStep = useSelector(state => state.measuresData?.doorWindowData?.step);
    const globalIndex = useSelector(state => state.measuresData?.windowResponse?.index);
    const [localStep, setLocalStep] = useState(globalStep);
    const [localIndex, setLocalIndex] = useState(globalIndex);
    const [showSummary, setShowSummary] = useState(null);
    const dispatch = useDispatch();
    const { handleBackNavigation } = NavigateBackHandler({
        templateId: details?.selectedTemplate?.templateId,
        step: details?.step,
    });

    const handleBack = () => {
        // dispatch(updateDoorWindowData(tempResponse[globalIndex]));
        dispatch(setSelectedResponseDetail(tempResponse[globalIndex]));
        handleBackNavigation();
    };
    const handleEdit = (index) => {
        dispatch(updateDoorWindowData(tempResponse[index]));
        dispatch(setSelectedResponseDetail(tempResponse[index]));
        dispatch(changeIsUpdating(true));
        const newStep = localStep > 0 ? localStep - 7 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        dispatch(setResponseIndex(index));
        navigation.navigate('WindowFloor');
    };

    const handleCopy = (index) => {
        dispatch(updateDoorWindowData(tempResponse[index]));
        setModalVisible1(true);
    };

    const handleDelete = (index) => {
        dispatch(removeResponseAtIndex({ index }));
        setTimeout(() => {
            const newIndex = tempResponse.length > 1 ? (index === tempResponse.length - 1 ? index - 1 : index) : 0;
            setLocalIndex(newIndex);
            dispatch(setIndex(newIndex));
        }, 0);
        setModalVisible(false);
    };
    const handleAddDetails = (index) => {
        dispatch(setSelectedResponseDetail(tempResponse[index]));
        dispatch(updateDoorWindowData(tempResponse[index]));
        dispatch(changeIsUpdating(true));
        dispatch(setResponseIndex(index));
        navigation.navigate('WindowsAddDetails');
    };
    const handleExt = (index) => {
        dispatch(setSelectedResponseDetail(tempResponse[index]));
        dispatch(changeIsUpdating(true));
        dispatch(updateDoorWindowData(tempResponse[index]));
        const newStep = localStep > 0 ? localStep - 2 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        dispatch(setResponseIndex(index));
        navigation.navigate('ExteriorWindowMeasures');
    };

    const handleInt = (index) => {
        dispatch(setSelectedResponseDetail(tempResponse[index]));
        dispatch(changeIsUpdating(true));
        dispatch(updateDoorWindowData(tempResponse[index]));
        const newStep = localStep > 0 ? localStep - 1 : 0;
        setLocalStep(newStep);
        dispatch(setStep(newStep));
        dispatch(setResponseIndex(index));
        navigation.navigate('InteriorWindow');
    };

    const handleSummary = (index) => {
        dispatch(setSelectedResponseDetail(tempResponse[index]));
        setShowSummary(showSummary === index ? null : index);
    };

    // const handleCompleteMeasures = async () => {

    //     try {
    //         const storedData = await AsyncStorage.getItem('tempResponse');
    //         let existingData = storedData ? JSON.parse(storedData) : [];

    //         console.log('storedData:', JSON.stringify(existingData), existingData.length);
    //         console.log('TempResponse:', JSON.stringify(tempResponse));

    //         if (!Array.isArray(tempResponse)) {
    //             console.error('tempResponse is not an array or is undefined.');
    //             return;
    //         }

    //         const generateNewId = () => {
    //             const maxId = existingData.reduce((max, item) => {
    //                 const currentId = parseInt(item.id, 10);
    //                 return currentId > max ? currentId : max;
    //             }, 0);
    //             const maxIds = String(maxId + 1).padStart(3, '0');
    //             const newId = parseInt(maxIds);
    //             return newId;
    //         };

    //         const TempResponse = tempResponse.map((currentTempResponse) => {
    //             const existingItemIndex = existingData.findIndex(item => item.id === currentTempResponse.id);

    //             if (existingItemIndex !== -1) {
    //                 existingData[existingItemIndex] = { ...existingData[existingItemIndex], ...currentTempResponse };
    //             } else {
    //                 if (!currentTempResponse.id) {
    //                     const updatedTempResponse = {
    //                         ...currentTempResponse,
    //                         id: generateNewId(),
    //                     };
    //                     console.log('Updated TempResponse:', updatedTempResponse);
    //                     existingData.push(updatedTempResponse);
    //                     return updatedTempResponse;
    //                 }
    //             }

    //             return currentTempResponse;
    //         });

    //         console.log(storedData, existingData);

    //         await AsyncStorage.setItem('tempResponse', JSON.stringify(existingData));
    //         console.log('Final tempResponse saved/updated in AsyncStorage.');

    //         dispatch(clearTemplate());
    //         navigation.navigate('Templates');
    //     } catch (error) {
    //         console.error('Error saving/updating tempResponse in handleCompleteMeasures:', error);
    //     }
    // };

    const handleCompleteMeasures = async () => {
        try {
            const existingData = realm.objects('MeasuresResponse');
            console.log('existingData:', existingData);

            if (!Array.isArray(tempResponse)) {
                console.error('tempResponse is not an array or is undefined.');
                return;
            }
            let currentMaxId = existingData.max('id') || 0;

            const generateNewId = () => {
                currentMaxId += 1;
                return currentMaxId;
            };

            const updatedTempResponse = tempResponse.map((response) =>
                response?.id ? response : { ...response, id: generateNewId() }
            );

            console.log('Updated TempResponse:', updatedTempResponse);

            realm.write(() => {
                updatedTempResponse.forEach((currentTempResponse) => {
                    const existingItem = existingData.filtered(`id = "${currentTempResponse.id}"`)[0];

                    if (existingItem) {
                        existingItem.details = JSON.stringify({
                            ...JSON.parse(existingItem.details),
                            ...currentTempResponse
                        });
                    } else {
                        realm.create('MeasuresResponse', {
                            id: currentTempResponse.id,
                            template: currentTempResponse?.selectedTemplate?.templateId,
                            details: JSON.stringify(currentTempResponse),
                        });
                    }
                });
            });

            console.log('Final tempResponse saved/updated in Realm DB.');

            dispatch(clearTemplate());
            navigation.navigate('Templates');
        } catch (error) {
            console.error('Error saving/updating tempResponse in handleCompleteMeasures:', error);
        }
    };


    const renderData = tempResponse.map((item, index) => {
        const unitHeading = `${tempResponse[index].selectedOptions[1].optionValue[0]}${tempResponse[index].selectedOptions[2].optionValue[0]}${tempResponse[index].selectedOptions[3].optionValue[0]}-${tempResponse[index].interiorMeasures.roomName}`;

        const measurements = `${tempResponse[index]?.exteriorMeasures?.exteriorMeasurements?.unitHeight1}(${tempResponse[index]?.exteriorMeasures?.exteriorMeasurements?.unitHeight2})X${tempResponse[index]?.exteriorMeasures?.exteriorMeasurements?.unitWidth1}(${tempResponse[index]?.exteriorMeasures?.exteriorMeasurements?.unitWidth2})`

        const currentData = tempResponse[index];

        const Basic = currentData?.additionalDetails?.basicLabor?.itemsBasic?.length > 0 && currentData?.additionalDetails?.basicLabor?.description;

        const Custom = currentData?.additionalDetails?.customLabor?.itemsCustom?.length > 0 && currentData?.additionalDetails?.customLabor?.description;

        const Material = currentData?.additionalDetails?.materials?.itemsMaterial?.length > 0 && currentData?.additionalDetails?.materials?.description;

        const Interior = currentData?.interiorMeasures?.roomName;

        return (
            <View
                key={index}
                style={[styles.borderView,
                {
                    borderColor: index === globalIndex ? '#7ab843' : 'rgba(31, 36, 40, 0.30)',
                    borderWidth: index === globalIndex ? 2 : 1
                }]}
            >
                <View style={{ paddingVertical: 10 }}>
                    <View style={styles.rowView}>
                        <View style={styles.rowView1}>
                            <View style={styles.imageView}>
                                <Image source={require('../../assets/images/window1.png')} style={styles.windowImage} resizeMode='contain' />
                            </View>
                            <View>
                                <Text style={styles.unitHeading}>{unitHeading}</Text>
                                <Text style={styles.measurements}>{measurements}</Text>
                            </View>
                        </View>
                        <View style={styles.rowView2}>
                            <TouchableOpacity
                                style={styles.touchableInline}
                                onPress={() => handleEdit(index)}
                            >
                                <Image source={require('../../assets/images/edit.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.touchableInline, { right: 5 }]}
                                onPress={() => handleCopy(index)}
                            >
                                <Image source={require('../../assets/images/copy.png')} style={{ width: 17, height: 17 }} resizeMode='contain' />
                            </TouchableOpacity>
                            {tempResponse.length !== 1 ?
                                (<TouchableOpacity
                                    style={styles.touchableInline1}
                                    onPress={() => setModalVisible(true)}
                                >
                                    <Image source={require('../../assets/images/delete.png')} style={{ width: 15, height: 15 }} resizeMode='contain' />
                                </TouchableOpacity>) :
                                null
                            }
                        </View>
                    </View>
                    <View style={styles.emptyView}></View>
                    <View style={{ paddingHorizontal: 5 }}>
                        <Text style={styles.statusText}>Status</Text>
                        <View style={styles.btnsView}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => handleExt(index)}>
                                    <Image
                                        source={require('../../assets/images/Vector.png')}
                                        style={styles.vectorImage}
                                        tintColor={'#7ab843'}
                                    />
                                    <Text style={styles.btnText}>EXT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleInt(index)}>
                                    <Image
                                        source={require('../../assets/images/Vector.png')}
                                        style={styles.vectorImage}
                                        tintColor={Interior ? '#7ab843' : 'grey'}
                                    />
                                    <Text style={styles.btnText}>INT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAddDetails(index)}>
                                    <Image
                                        source={require('../../assets/images/Vector.png')}
                                        style={styles.vectorImage}
                                        tintColor={Basic ? '#7ab843' : 'grey'}
                                    />
                                    <Text style={styles.btnText}>BASIC</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAddDetails(index)}>
                                    <Image
                                        source={require('../../assets/images/Vector.png')}
                                        style={styles.vectorImage}
                                        tintColor={Custom ? '#7ab843' : 'grey'}
                                    />
                                    <Text style={styles.btnText}>CSMT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleAddDetails(index)}>
                                    <Image
                                        source={require('../../assets/images/Vector.png')}
                                        style={styles.vectorImage}
                                        tintColor={Material ? '#7ab843' : 'grey'}
                                    />
                                    <Text style={styles.btnText}>MAT</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity style={styles.downTouchable} onPress={() => handleSummary(index)}>
                                    <Image source={showSummary === index ? require('../../assets/images/dropDown.png') : require('../../assets/images/dropDown.png')} style={styles.dropDownImage} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    {showSummary === index && <Summary index={index} />}
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
                        index={index}
                    />


                </View>
            </View>
        );
    });

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', paddingVertical: StatusBar.currentHeight, paddingHorizontal: 15, alignItems: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image source={require('../../assets/icons/arrowright_.png')} style={styles.backImage} />
                        </TouchableOpacity>
                        <Text style={styles.summaryHeader}>Windows Summary</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.viewJobBtn}>
                            <Text style={{ fontSize: 13, color: 'white', textAlign: 'center', fontFamily: Fonts.FONTS_REGULAR }}>View All Jobs</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#F7F9F9', }}>
                    <ScrollView style={styles.mainView}>
                        <View style={{ marginBottom: 10 }}>
                            {renderData}
                        </View>
                    </ScrollView>
                    <View style={{ paddingHorizontal: 15, paddingBottom: 10 }}>
                        <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                style={styles.completeBtn}
                                onPress={() => setModalVisible2(true)}
                            >
                                <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', fontFamily: Fonts.FONTS_REGULAR }}>Complete Measures</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 0.5 }}></View>
                            <TouchableOpacity
                                style={styles.completeBtn}
                            >
                                <Text style={{ fontSize: 15, color: 'white', textAlign: 'center', fontFamily: Fonts.FONTS_REGULAR }}>Submit For Review</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <GlobalModal
                    visible={modalVisible2}
                    title="Are you sure?"
                    message="Do you want to Submit Data?"
                    okText="Ok"
                    cancelText="Cancel"
                    onOk={() => handleCompleteMeasures()}
                    onCancel={() => setModalVisible2(false)}
                />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    backImage: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    summaryHeader: {
        fontSize: 22,
        left: 5,
        fontFamily: Fonts.FONTS_BOLD,
        color: '#1F2428',
        top: 3
    },
    mainView: {
        // marginBottom: 10,
        flex: 1,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 15,
    },
    borderView: {
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 2,
        marginBottom: 10,
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowView1: {
        flex: 1,
        flexDirection: 'row'
    },
    imageView: {
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: 'white',
        opacity: 1
    },
    windowImage: {
        width: 20,
        height: 20,
    },
    unitHeading: {
        fontFamily: Fonts.FONTS_BOLD,
        color: 'black',
        top: 2,
        fontSize: 15,
        left: 5
    },
    measurements: {
        color: '#BDC3C7',
        fontFamily: Fonts.FONTS_REGULAR,
        fontSize: 13,
        left: 5
    },
    rowView2: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    touchableInline: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFEFE',
        right: 10
    },
    touchableInline1: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FDFEFE',
    },
    statusText: {
        fontSize: 15,
        fontFamily: Fonts.FONTS_BOLD,
        color: 'black'
    },
    emptyView: {
        marginVertical: 2,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(31, 36, 40, 0.30)'
    },
    btnsView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnText: {
        position: 'absolute',
        left: 10,
        top: 2,
        fontSize: 8,
        textAlignVertical: 'center'
    },
    vectorImage: {
        width: 40,
        height: 15,
        position: 'relative'
    },
    downTouchable: {
        height: 10,
        width: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: '#498DEF',
        padding: 15,
    },
    dropDownImage: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
    },
    viewJobBtn: {
        alignItems: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 8,
        backgroundColor: '#498DEF',
        borderRadius: 10
    },
    completeBtn: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#498DEF',
        borderRadius: 10
    }
});

export default WindowsSummary;