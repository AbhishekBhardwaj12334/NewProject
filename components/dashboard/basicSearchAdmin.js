import React, { useState } from "react";
import { View, Text, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from "react-native";
import Fonts from '../../src/fonts/fonts';
import AnimatedInputSearch from "./animateView1";
import CalendarPickerComponent1 from "./calendarPicker";



const BasicSearch = ({ navigation }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [purchaseNumber, setPurchaseNumber] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [jobNumber, setJobNumber] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [COD, setCOD] = useState('')
    const [altPhone, setAltPhone] = useState('')
    const [projectName, setProjectName] = useState('')
    const [storeNumber, setStoreNumber] = useState('')
    const [salesAssociate, setSalesAssociate] = useState('')
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [projectUmbrella, setProjectUmbrella] = useState('')
    const [questionResponse, setQuestionResponse] = useState('')
    const [attachementName, setAttachementName] = useState('')
    const [permitNumber, setPermitNumber] = useState('')
    const [noteDetails, setNoteDetails] = useState('')
    const [itemNumber, setItemNumber] = useState('')
    const [itemDescription, setItemDescription] = useState('')
    const [lowesPRNumber, setLowesPRNumber] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleBack = () => {
        navigation.goBack('Search')
    }

    const handleGo = () => {
        navigation.navigate('GoScreen')
    }
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
                                onPress={()=>handleClear()}
                                style={{ paddingVertical: 10, borderTopWidth: 1, borderRightWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)', borderRightColor: 'rgba(31, 36, 40, 0.30)', width: 165, alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 17, fontFamily: Fonts.FONTS_REGULAR, color: 'black' }}>
                                    Ok
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { setModalVisible(false) }}
                                style={{ paddingVertical: 10, borderTopWidth: 1, borderLeftWidth: 1, borderTopColor: 'rgba(31, 36, 40, 0.30)', borderLeftColor: 'rgba(31, 36, 40, 0.30)', width: 165, alignItems: 'center' }}
                            >
                                <Text style={{ fontSize: 17, fontFamily: Fonts.FONTS_REGULAR, color: 'black' }}>
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
        // console.log("const handleClear{")
        setFirstName('');
        setLastName('');
        setPurchaseNumber('');
        setAddress('');
        setCity('');
        setJobNumber('');
        setZipCode('');
        setPhoneNumber('');
        setCOD('');
        setAltPhone('');
        setProjectName('');
        setStoreNumber('');
        setSalesAssociate('');
        setInvoiceNumber('');
        setProjectUmbrella('');
        setQuestionResponse('');
        setAttachementName('');
        setPermitNumber('');
        setNoteDetails('');
        setItemNumber('');
        setItemDescription('');
        setLowesPRNumber('');
        setSelectedStartDate(null);
        setSelectedEndDate(null)
        setModalVisible(false);
    }
    return (
        <View style={{ flex: 1 }}>
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
                <View style={styles.view2}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <View style={{ paddingTop: 20, flex: 1 }}>
                            {/* {console.log(selectedStartDate,selectedEndDate)} */}
                            <CalendarPickerComponent1
                                 selectedStartDate={selectedStartDate}
                                 selectedEndDate={selectedEndDate}
                                 modalVisible={modalVisible}
                                 onStartDateSelect={setSelectedStartDate}
                                 onEndDateSelect={setSelectedEndDate}
                                 setModalVisible={setModalVisible}
                            />
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Customer First Name'
                                    value={firstName}
                                    onChangeText={(text) => setFirstName(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Customer Last Name'
                                    value={lastName}
                                    onChangeText={(text) => setLastName(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Purchase Order Number'
                                    value={purchaseNumber}
                                    onChangeText={(text) => setPurchaseNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Address'
                                    value={address}
                                    onChangeText={(text) => setAddress(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='City'
                                    value={city}
                                    onChangeText={(text) => setCity(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Job Number'
                                    value={jobNumber}
                                    onChangeText={(text) => setJobNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Zip Code'
                                    value={zipCode}
                                    onChangeText={(text) => setZipCode(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Phone Number'
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='COD'
                                    value={COD}
                                    onChangeText={(text) => setCOD(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Alt Phone'
                                    value={altPhone}
                                    onChangeText={(text) => setAltPhone(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Project Name'
                                    value={projectName}
                                    onChangeText={(text) => setProjectName(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Store Number'
                                    value={storeNumber}
                                    onChangeText={(text) => setStoreNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Sales Associate'
                                    value={salesAssociate}
                                    onChangeText={(text) => setSalesAssociate(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Invoice Number'
                                    value={invoiceNumber}
                                    onChangeText={(text) => setInvoiceNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Project Umbrella'
                                    value={projectUmbrella}
                                    onChangeText={(text) => setProjectUmbrella(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Question Response'
                                    value={questionResponse}
                                    onChangeText={(text) => setQuestionResponse(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Attachement Name'
                                    value={attachementName}
                                    onChangeText={(text) => setAttachementName(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Permit Number'
                                    value={permitNumber}
                                    onChangeText={(text) => setPermitNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Note Detail'
                                    value={noteDetails}
                                    onChangeText={(text) => setNoteDetails(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Item Number'
                                    value={itemNumber}
                                    onChangeText={(text) => setItemNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Item Description'
                                    value={itemDescription}
                                    onChangeText={(text) => setItemDescription(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                            <View style={styles.view3}>
                                <AnimatedInputSearch
                                    label='Lowes PR Number'
                                    value={lowesPRNumber}
                                    onChangeText={(text) => setLowesPRNumber(text)}
                                    editable={true}
                                    containerStyles={styles.userInputContainer}
                                />
                            </View>
                        </View>
                    </ScrollView >
                    <View style={styles.view4}>
                        <TouchableOpacity
                            onPress={() => { setModalVisible(true) }}
                            style={{ paddingVertical: 10, backgroundColor: 'white', borderWidth: 1, borderColor: '#1FB1F0', alignItems: 'center', borderRadius: 8,flex:1,margin:10 }}
                        >
                            <Text style={styles.text2}>Clear</Text>
                        </TouchableOpacity>
                        {renderModal()}
                        <TouchableOpacity
                            onPress={() => {handleGo()}}
                            style={{ paddingVertical: 10, backgroundColor: '#46B420', borderWidth: 1, borderColor: '#46B420', alignItems: 'center', borderRadius: 8, flex:1, margin:10}}
                        >
                            <Text style={styles.text3}>Go</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}
export default BasicSearch;
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
    view2: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        // paddingTop:20
    },
    view3: {
        flex: 1,
        backgroundColor: 'white',
        maxHeight: 60,
        borderWidth: 2,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 8,
        marginBottom: 20,
        width: '100%'
    },
    userInputContainer: {
        fontSize: 20,
        color: 'rgb(0,0,0)',
        marginTop: 0,
        marginBottom: 5,
        borderRadius: 10,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'rgba(31, 36, 40, 0.30)'
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
    userInputContainer1: {
        fontSize: 20,
        color: 'rgb(0,0,0)',
        marginTop: 0,
        marginBottom: 5,
        borderRadius: 10,
        fontFamily: Fonts.FONTS_REGULAR,
        color: 'rgba(31, 36, 40, 0.30)',
        width: '88%'
    },
    view10: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        maxHeight: 60,
        borderWidth: 2,
        borderColor: 'rgba(31, 36, 40, 0.30)',
        borderRadius: 8,
        marginBottom: 20
    },
})