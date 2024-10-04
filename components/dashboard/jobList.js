import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Fonts from '../../src/fonts/fonts';

const JobList = () => {
    const jobList = [
        { id: 1, text: 'Status'},
        { id: 2, text: 'Type'},
        { id: 3, text: 'Category'},
        { id: 4, text: 'Store'},
        { id: 5, text: 'Activity Status'},
        { id: 6, text: 'Activity'},
        { id: 7, text: 'ActivityOwner'},
        { id: 8, text: 'Responsible User'},
        { id: 9, text: 'Schedule User'},
        { id: 10, text: 'Tags'},
        { id: 11, text: 'Attachment'},
    ]
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemPress = (id) => {
        setSelectedItem(id);
    };

    return (
        <View style={{ flex: 1,justifyContent:'center'}}>
            <ScrollView style={styles.container}>
                {jobList.map((data) => (
                    <TouchableOpacity
                        style={[
                            styles.item,
                            selectedItem === data.id && styles.selectedItem
                        ]}
                        key={data.id}
                        onPress={() => handleItemPress(data.id)}
                    >
                        <Text style={{ fontSize: 12, fontFamily:Fonts. FONTS_MEDIUM, color: 'black' }}>{data.text}</Text>
                    </TouchableOpacity>
                        
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems:'center'
    },
    item: {
        width: '100%',
        paddingVertical: 20,
        paddingHorizontal:8
        // alignItems:'center'
        // borderBottomWidth: 1,
        // borderBottomColor: '#ccc',
    },
    selectedItem: {
        backgroundColor: 'white',
    }
})  

export default JobList;
