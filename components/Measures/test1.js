import React, {useRef} from 'react'
import { moduleName } from 'react-native';
import { BottomSheet } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';

const PreviewImageBottomSheet = () => {
    const bottomSheetRef = useRef(null);
    const selectedPhotos = useSelector(state => state.measuresData.imgUrls);
    const openBottomSheet = () => {
        bottomSheetRef.current.expand();

        return (
            <View>
                {selectedPhotos.map((item, index) => (
                    <View>
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
                    </View>
                ))}
            </View>
        )
    };
}
export default PreviewImageBottomSheet;
