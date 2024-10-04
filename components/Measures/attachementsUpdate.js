import React, { useRef, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteImage } from '../redux/measures';
import Fonts from '../../src/fonts/fonts';
import BottomSheet from 'react-native-simple-bottom-sheet';

const AttachmentRender = () => {
    const [isEditingName, setIsEditingName] = useState(false);
    const selectedPhotos = useSelector(state => state.measuresData.doorWindowData.imgUrls);
    const dispatch = useDispatch();

    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [fileExtension, setFileExtension] = useState('');

    const handlePress = (index) => {
        setSelectedImageIndex(index);
        const name = selectedPhotos[index]?.name;
        const [fileNameWithoutExtension, extension] = name.split('.');
        setFileName(fileNameWithoutExtension);
        setFileExtension(extension);
        setIsBottomSheetVisible(true);
    };

    const [fileName, setFileName] = useState('');

    const handleDelete = (index) => {
        dispatch(deleteImage(index));
    };
    const handleSave = () => {
        setIsEditingName(false);
        setIsBottomSheetVisible(false);
        const updatedFileName = `${fileName}.${fileExtension}`;
        // console.log(updatedFileName);
    };
    return (
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {selectedPhotos.map((item, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => handlePress(index)}>
                            <View style={{ marginTop: 10, marginRight: 20 }}>
                                <View style={{ backgroundColor: 'black', borderRadius: 10 }}>
                                    <Image
                                        source={{ uri: item.uri }}
                                        style={{ width: 110, height: 110, position: 'relative', borderRadius: 10, resizeMode: 'contain' }}
                                    />
                                </View>
                                <View style={{ width: 105, marginTop: 10 }}>
                                    <Text numberOfLines={2}>{item.name}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ position: 'absolute', backgroundColor: '#CEE2FA', top: 3, right: 20, borderRadius: 10, width: 25, height: 25, justifyContent: 'center', opacity: 0.7 }}>
                            <TouchableOpacity onPress={() => handleDelete(index)} style={{ alignItems: 'center' }}>
                                <Image source={require('../../assets/icons/Groupdeactivate.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {isBottomSheetVisible && (
                <BottomSheet
                    isOpen={true}
                    style={{ flex: 1, width: '100%', backgroundColor: 'white' }}
                    onClose={() => setIsBottomSheetVisible(false)}
                >
                    <View style={{ paddingVertical: 20 }}>
                        <Text
                            style={{ textAlign: 'center', fontSize: 20, fontFamily: Fonts.FONTS_BOLD, bottom: 25 }}
                        >
                            Preview Image
                        </Text>
                        <View>
                            <Image
                                source={{ uri: selectedPhotos[selectedImageIndex]?.uri }} style={{ width: 150, height: 150, alignSelf: 'center', bottom: 10, borderRadius: 15 }}
                            />
                        </View>
                        {isEditingName ? (
                            <View>
                                <TextInput
                                    style={{ fontSize: 16, fontFamily: Fonts.FONTS_MEDIUM, borderWidth: 1, color: 'black' }}
                                    value={fileName}
                                    onChangeText={setFileName}
                                />
                                {/* {console.log(fileName)} */}
                                <TouchableOpacity onPress={handleSave} style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: 16, fontFamily: Fonts.FONTS_MEDIUM, color: 'blue' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, fontFamily: Fonts.FONTS_MEDIUM }}>
                                    {selectedPhotos[selectedImageIndex]?.name}
                                </Text>
                                <TouchableOpacity onPress={() => setIsEditingName(true)} style={{ marginLeft: 10 }}>
                                    <Image
                                        source={require('../../assets/icons/Group228.png')}
                                        style={{ resizeMode: 'contain', width: 20, height: 20 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </BottomSheet>
            )}
        </View>
    );
};

export default AttachmentRender;
