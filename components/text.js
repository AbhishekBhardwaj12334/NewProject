import React, { useState } from 'react';
import { moduleName, View, StyleSheet, TextInput, Button, Text, TouchableOpacity, Alert, Switch, SectionList, Pressable, TouchableNativeFeedback, ToastAndroid, Appearance } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Demo = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const handleSubmit = () => {
        Alert.alert('Details', 'Are you sure you want to Submit?', [
            { text: 'Yes', onPress: () => console.log('Data name:', name, 'age:', age, 'gender:', gender, 'Submitted') },
            { text: 'No', onPress: () => handleNo() }
        ])
    }
    const handleNo = () => {
        console.log('dsvjhskajd')
        setName('');
        setAge('');
        setGender('')
    }

    const DATA = [
        {
            title: "Main Items",
            data: ["Pizza", "Burgers"]
        },
        {
            title: "Sides",
            data: ["French Fries", "Onion Rings"]
        },
        {
            title: "Drinks",
            data: ["Coca Cola", "Sprite"]
        },
        {
            title: "Desserts",
            data: ["Ice-Creams", "Shakes"]
        }
    ]
    const [count, setCount] = useState(0);
    const [rippleOverflow, setRippleOverflow] = useState(false)

    const showToast = () => {
        ToastAndroid.show("Welcome to Coding Knowledge", ToastAndroid.SHORT)
    };

    const colorSchema = Appearance.getColorScheme();
    console.log(colorSchema)
    const showToastwithGravity = () => {
        ToastAndroid.showWithGravity(
            "Welcome to the Coding Knowledge",
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        )
    };

    const showToastwithGravityAndOffset = () => {
        ToastAndroid.showWithGravityAndOffset(
            "Welcome to the Coding Knowledge",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            100,
            400
        )
    }

    const Item = ({ title }) => (
        <View style={styles.textHeader}>
            <Text > {title} </Text>
        </View>
    )

    return (
        <View style={[{ backgroundColor: colorSchema === 'light' ? 'white' : 'black' }, styles.container]}>
            <TextInput
                style={
                    [{ backgroundColor: colorSchema === 'light' ? 'grey' : 'white', color: colorSchema === 'light' ? 'white' : 'grey' },
                    styles.textInput]}
                value={name}
                onChangeText={(text) => setName(text)}
                keyboardType='default'
                placeholder="Enter Name"
                placeholderTextColor={colorSchema === 'light' ? 'white' : 'grey'}
            />
            <TextInput
                style={
                    [{ backgroundColor: colorSchema === 'light' ? 'grey' : 'white', color: colorSchema === 'light' ? 'white' : 'grey' }, styles.textInput]}
                value={age}
                onChangeText={(text) => setAge(text)}
                keyboardType='number-pad'
                placeholder="Enter Age"
                placeholderTextColor={colorSchema === 'light' ? 'white' : 'grey'}
            />
            {/* <TextInput
                style={styles.textInput}
                value={gender}
                onChangeText={(text) => setGender(text)}
                keyboardType='default'
                placeholder='Enter Gender'
            />
            <TouchableOpacity
                style={styles.touchableSubmit}
                onPress={() => handleSubmit()}
            >
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity> */}
            <Text>{name} {age} {gender}</Text>
            {/* <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
            <Text>{count}</Text>
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? 'red' : 'yellow' }, styles.pressable]}
                onPress={() => setCount(count + 1)}
            >
                {({ pressed }) => <Text> {pressed ? 'Pressed' : 'Press Me'}</Text>}
            </Pressable>
             */}
            {/* <TouchableNativeFeedback
                onPress={() => setRippleOverflow(!rippleOverflow)}
                background={TouchableNativeFeedback.Ripple("red",rippleOverflow)}
            />
            <View style={styles.touchable}>
                <Text style={styles.text}>TouchableNativeFeedback</Text>
            </View> */}
            {/* <TouchableOpacity style={styles.touchable} onPress={showToast}>
                <Text>ShowWithButton</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable} onPress={showToastwithGravity}>
                <Text>ShowWithButton</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.touchable} onPress={showToastwithGravityAndOffset}>
                <Text>showToastwithGravityAndOffset</Text>
            </TouchableOpacity> */}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1
    },
    textInput: {

        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 8,
        margin: 10
    },
    touchableSubmit: {
        marginTop: 10,
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 10
    },
    submitText: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white'
    },
    header: {
        fontSize: 20,
        color: 'black'
    },
    textHeader: {
        backgroundColor: 'yellow',
        padding: 10,
        marginVertical: 5
    },
    pressable: {
        fontSize: 60
    },
    touchable: {
        // flex: 1,
        backgroundColor: 'blue',
        alignContent: 'center',
        justifyContent: 'center'
        // flex: 1,
        // borderColor: 'black',
        // borderWidth: 3
    },
    text: {
        alignSelf: 'center'
    }


})

export default Demo;