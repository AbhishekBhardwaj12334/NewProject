import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from "react-native-modal";
import Fonts from "../../src/fonts/fonts";
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { removeImage } from '../redux/measures';
import GlobalModal from '../globalModal';
import { Linear } from '../globaconstants';

const OpenCamera = ({ onSelectPhotos }) => {
    const [imgUrls, setImgUrls] = useState([]);
    const [visible, setVisible] = useState(false);
    const selectedPhotos = useSelector(state => state.measuresData.doorWindowData.imgUrls);
    const selectedData = useSelector(state => state.measuresData.allMeasures.selectedResponseDetail);
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null); // Store index of photo to be deleted
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedData?.additionalDetails?.imgUrls) {
            setImgUrls(selectedData.additionalDetails?.imgUrls);
        }
    }, [selectedData]);

    useEffect(() => {
        onSelectPhotos(imgUrls);
    }, [imgUrls, onSelectPhotos]);

    const openCamera = async () => {
        const result = await launchCamera({ saveToPhotos: true });
        handleResult(result);
    };

    const openLibCamera = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 });
        handleResult(result);
        console.log('response', result)

    };

    const handleResult = (result) => {
        if (result.assets && result.assets.length > 0) {
            const newPhotos = result.assets.map(asset => ({
                uri: asset.uri,
                name: asset.fileName,
                size: asset.fileSize,
                path: asset.originalPath,
                type: asset.type,
                width: asset.width,
                height: asset.height,
            }));
            setImgUrls(prevUrls => [...prevUrls, ...newPhotos]);
        }
    };

    const handleCamera = () => {
        setVisible(false);
        openCamera();
    }

    const handleLibrary = () => {
        setVisible(false);
        openLibCamera();
    }

    const deleteImage = () => {
        if (deleteIndex !== null) {
            // Dispatch action to remove image from Redux store
            dispatch(removeImage(deleteIndex));

            // Remove image from local state
            const newImgUrls = [...imgUrls];
            newImgUrls.splice(deleteIndex, 1);
            setImgUrls(newImgUrls);
            setDeleteIndex(null); // Reset delete index
            setModalVisible(false);
        }
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 8, marginTop: 10 }}>
            <TouchableOpacity
                style={{ backgroundColor: '#498DEF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginBottom: 8 }}
                onPress={() => setVisible(true)}
            >
                <Text style={{ fontFamily: Fonts.FONTS_MEDIUM, fontSize: 17, color: 'white' }}>Add Photos</Text>
            </TouchableOpacity>
            <Linear />
            <Modal
                isVisible={visible}
                style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
                onBackButtonPress={() => setVisible(false)}
            >
                <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 15 }}>
                    <View style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 12 }}>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
                            onPress={handleCamera}
                        >
                            <Text style={{ fontSize: 16, fontFamily: Fonts.FONTS_BOLD, color: 'black' }}>Click Picture</Text>
                        </TouchableOpacity>
                        <LinearGradient
                            locations={[0, 0.3, 0.7]}
                            colors={["#ffffff", "#1F242822", "#ffffff"]}
                            style={{ height: 1, marginHorizontal: 10 }}
                        />
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
                            onPress={handleLibrary}
                        >
                            <Text style={{ fontSize: 16, fontFamily: Fonts.FONTS_BOLD, color: 'black' }}>Upload File</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 15, backgroundColor: 'white', borderRadius: 12 }}>
                        <TouchableOpacity
                            onPress={() => setVisible(false)}
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'center' }}
                        >
                            <Text style={{ fontSize: 16, fontFamily: Fonts.FONTS_BOLD, color: '#498DEF', }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Display added photos and their names */}
            <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <ScrollView horizontal={true}>
                    {imgUrls.map((item, index) => (
                        <View key={index} style={{ marginTop: 10, marginRight: 20 }}>
                            <View style={{ backgroundColor: 'black', borderRadius: 10 }}>
                                <Image
                                    source={{ uri: item.uri }}
                                    style={{ width: 110, height: 110, position: 'relative', borderRadius: 10 }}
                                />
                            </View>
                            <View style={{ width: 105, marginTop: 10 }}>
                                <Text style={{ fontFamily: Fonts.FONTS_REGULAR, color: 'black' }}>{item.name}</Text>
                            </View>
                            <View style={{ position: 'absolute', backgroundColor: '#CEE2FA', top: -3, right: -10, borderRadius: 10, width: 25, height: 25, justifyContent: 'center', opacity: 0.7 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setDeleteIndex(index);
                                        setModalVisible(true);
                                    }}
                                    style={{ alignItems: 'center' }}
                                >
                                    <Image
                                        source={require('../../assets/icons/Groupdeactivate.png')}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
                <GlobalModal
                    visible={modalVisible}
                    title="Are you sure?"
                    message="Do you want to delete this photo?"
                    okText="Ok"
                    cancelText="Cancel"
                    onOk={deleteImage}
                    onCancel={() => setModalVisible(false)}
                />
            </View>
        </View>
    );
}

export default OpenCamera;
