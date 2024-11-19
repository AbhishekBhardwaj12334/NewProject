{/* Display added photos and their names */ }
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
</View >