import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, ScrollView, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDispatch } from 'react-redux';
import { setMeasurements } from '../redux/measures'; // Import the action creator

const DropdownExample = () => {
    const [jambDepth, setJambDepth] = useState('');
    const [selectedValues, setSelectedValues] = useState({});
    const dispatch = useDispatch();

    const minuteMeasures = [
        { label: '1/8', value: '1/8' },
        { label: '1/4', value: '1/4' },
        { label: '3/8', value: '3/8' },
        { label: '1/2', value: '1/2' },
        { label: '5/8', value: '5/8' },
        { label: '3/4', value: '3/4' },
        { label: '7/8', value: '7/8' },
    ];

    const headings = ["Frame Height", "Frame Width", "Rough Width", "Rough Opening"];

    const initialDropdownData = [
        {
            dropdowns: [
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...Array.from({ length: 181 }, (_, i) => ({ label: `${i + 20}`, value: `${i + 20}` }))] },
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...minuteMeasures] }
            ]
        },
        {
            dropdowns: [
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...Array.from({ length: 91 }, (_, i) => ({ label: `${i + 60}`, value: `${i + 60}` }))] },
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...minuteMeasures] }
            ]
        },
        {
            dropdowns: [
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...Array.from({ length: 181 }, (_, i) => ({ label: `${i + 20}`, value: `${i + 20}` }))] },
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...minuteMeasures] }
            ]
        },
        {
            dropdowns: [
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...Array.from({ length: 91 }, (_, i) => ({ label: `${i + 60}`, value: `${i + 60}` }))] },
                { selectedValue: '', options: [{ label: 'Select', value: '' }, ...minuteMeasures] }
            ]
        }
    ];

    const [dropdownData, setDropdownData] = useState(initialDropdownData);

    const handleValueChange = (headingIndex, dropdownIndex, value) => {
        // Update selected values state
        setSelectedValues(prevValues => ({
            ...prevValues,
            [`${headings[headingIndex]}${dropdownIndex}`]: value
        }));

        // Update dropdownData state to reflect the selected value
        setDropdownData(prevData => {
            const newData = [...prevData];
            newData[headingIndex].dropdowns[dropdownIndex].selectedValue = value;
            return newData;
        });
    };

    const handleBack = () => {
        setStep(--step);
        navigation.goBack();
    };

    const handleSubmit = (jambDepth) => {
        const Width = 'Width';
        const Height = 'Height';
        const Depth = 'Depth';
        const RoughHeight = 'Rough Height';
        const RoughWidth = 'Rough Width';
        const frameHeight = `${selectedValues['Frame Height0']}(${selectedValues['Frame Height1']})`;
        const frameWidth = `${selectedValues['Frame Width0']}(${selectedValues['Frame Width1']})`;
        const roughWidth = `${selectedValues['Rough Width0']}(${selectedValues['Rough Width1']})`;
        const roughHeight = `${selectedValues['Rough Opening0']}(${selectedValues['Rough Opening1']})`;

        dispatch(setMeasurements({
            jambDepth: jambDepth,
            frameHeight: frameHeight,
            frameWidth: frameWidth,
            roughWidth: roughWidth,
            roughHeight: roughHeight,
            Width,
            Height,
            Depth,
            RoughWidth,
            RoughHeight
        }));
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'} />
            <ImageBackground source={require('../../assets/images/screenbackground.png')} style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", paddingTop: 20, paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack}>
                            <Image
                                source={require('../../assets/icons/arrowright_.png')}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 28, fontFamily: Fonts.FONTS_MEDIUM, top: 4, color: 'black', left: 10 }}>Exterior Doors</Text>
                    </View>
                </View>
                <View style={{ flex: 1, paddingVertical: 10, paddingHorizontal: 20,backgroundColor:'white' }}>
                    <Text style={{ fontSize: 19, fontFamily: Fonts.FONTS_MEDIUM, color: '#498DEF' }}>Non-Standard Size Form</Text>
                    <ScrollView>
                        {dropdownData.map((data, headingIndex) => (
                            <View key={headingIndex} style={{ borderWidth: 1, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 20, borderRadius: 10, borderColor: 'rgba(31, 36, 40, 0.30)' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#498DEF' }}>{headings[headingIndex]}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                                    {data.dropdowns.map((dropdown, dropdownIndex) => (
                                        <React.Fragment key={dropdownIndex}>
                                            <View style={{ flex: 1, borderWidth: 1, borderRadius: 10, borderColor: 'rgba(31, 36, 40, 0.30)', paddingHorizontal: 10 }}>
                                                <Picker
                                                    mode='dropdown'
                                                    selectedValue={dropdown.selectedValue}
                                                    onValueChange={(itemValue) => handleValueChange(headingIndex, dropdownIndex, itemValue)}
                                                >
                                                    {dropdown.options.map((option, optionIndex) => (
                                                        <Picker.Item
                                                            key={optionIndex}
                                                            label={option.label}
                                                            value={option.value}
                                                        />
                                                    ))}
                                                </Picker>
                                            </View>
                                            {dropdownIndex === 0 && <View style={{ flex: 1.5 }} />}
                                        </React.Fragment>
                                    ))}
                                </View>
                            </View>
                        ))}
                        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: 'rgba(31, 36, 40, 0.30)', paddingHorizontal: 15, paddingVertical: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#498DEF' }}>Jamb Depth</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput
                                    style={{ borderWidth: 1, borderRadius: 10, borderColor: 'rgba(31, 36, 40, 0.30)', paddingHorizontal: 10, flex: 1, paddingVertical: 13, fontFamily: Fonts.FONTS_MEDIUM, fontSize: 16 }}
                                    placeholder="Jamb Depth"
                                    value={jambDepth}
                                    onChangeText={setJambDepth}
                                />
                                <View style={{ flex: 2.5 }}></View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white', paddingHorizontal: 15 }}>
                    <TouchableOpacity
                        style={{ flex: 1, backgroundColor: '#498DEF', paddingVertical: 20, borderRadius: 10, bottom: 10, alignItems: 'center' }}
                        onPress={handleSubmit}
                    >
                        <Text style={{ fontSize: 18, fontFamily: Fonts.FONTS_MEDIUM, color: 'white' }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

export default DropdownExample;