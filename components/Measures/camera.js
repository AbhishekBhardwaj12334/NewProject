import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from "react-native-modal";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { request, PERMISSIONS } from 'react-native-permissions';
import Fonts from "../../src/fonts/fonts";
import LinearGradient from 'react-native-linear-gradient';

const OpenCamera = ({ onSelectPhotos, limit }) => {
    const [visible, setVisible] = useState(false);
    const openCamera = async () => {
        request(PERMISSIONS.ANDROID.CAMERA).then(async (status) => {
            if (status === 'granted') {
                console.log('granted')
                const result = await launchCamera({ saveToPhotos: true });
                console.log('skjcjbdsb')
                handleResult(result);
            } else {
                console.warn("Camera permission denied");
            }
        });
    };

    const openLibCamera = async () => {
        request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(async (status) => {
            if (status === 'granted') {
                console.log('granted')
                const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: limit });
                handleResult(result);
            } else {
                console.warn("Library permission denied");
            }
        });
    };

    const handleResult = (result) => {
        console.log('VAHSHBAHB', result)
        if (result.didCancel) {
            console.log("User canceled the image picker.");
            return;
        }
        if (result.errorCode) {
            console.error("Image picker error:", result.errorCode);
            return;
        }
        if (result.assets) {
            const photos = result.assets.map(asset => ({
                uri: asset.uri,
                name: asset.fileName,
                size: asset.fileSize,
                type: asset.type,
                width: asset.width,
                height: asset.height,
            }));
            onSelectPhotos(photos); // Pass selected photos to parent
        }
    };

    const handleCamera = () => {
        setVisible(false);
        openCamera();
    };

    const handleLibrary = () => {
        setVisible(false);
        openLibCamera();
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 15, paddingVertical: 8, marginTop: 10 }}>
            {/* Button to open the bottom sheet */}
            <TouchableOpacity
                style={{ backgroundColor: '#498DEF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10 }}
                onPress={() => setVisible(true)}
            >
                <Text style={{ fontFamily: Fonts.FONTS_MEDIUM, fontSize: 17, color: 'white' }}>Add Photos</Text>
            </TouchableOpacity>

            {/* Bottom sheet modal */}
            <Modal
                isVisible={visible}
                style={{ width: '100%', marginLeft: 0, marginBottom: 0 }}
                onBackButtonPress={() => setVisible(false)}
            >
                <View style={{ position: 'absolute', bottom: 0, width: '100%', padding: 15 }}>
                    <View style={{ backgroundColor: 'white', paddingVertical: 10, paddingHorizontal: 10, borderRadius: 12 }}>
                        {/* Camera option */}
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

                        {/* Library option */}
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}
                            onPress={handleLibrary}
                        >
                            <Text style={{ fontSize: 16, fontFamily: Fonts.FONTS_BOLD, color: 'black' }}>Upload File</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Cancel button */}
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
        </View>
    );
};

export default OpenCamera;
