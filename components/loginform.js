import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ImageBackground, Keyboard, Image, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const LoginForm = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState([])
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [user, setUser] = useState('1')
  //const [errors, setErrors] = useState('')

  const handleClear = () => {
    setName('');
    setEmail('');
    setPassword('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    /* setErrors([]);*/
  };
  const passwordRegex = /^[a-zA-Z\d]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nameRegex = /^[a-zA-Z\s]{2,30}$/

  const userImage = () => {
    setUser(Math.floor(Math.random() * 6))
  }

  const handleSubmit = () => {


    if (!name.trim()) {
      setNameError('Name is required');
      return
    } else if ((!nameRegex.test(name))) {
      setNameError('Name should be at least 2 characters');
      return
    } else {
      setNameError('')
    }

    if (!email.trim()) {
      setEmailError('Email is required');
      return
    } else if (!emailRegex.test(email)) {
      setEmailError('Invalid email address')
      return
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      return
    } else if (!passwordRegex.test(password)) {
      setPasswordError('Password must be atleast 8 characters long and alphanumeric');
      return
    } else {
      setPasswordError('')
    }


    // setNameError(nameError);
    // setEmailError(emailError);
    // setPasswordError(passwordError);


    /*let errorContent = null;
 
    if (newErrors.length > 0) {
      errorContent = (
        <View style={{ marginBottom: 10 }}>
          {newErrors.map((error, index) => (
            <Text key={index} style={{ color: 'red' }}>
              {error}
            </Text>
          ))}
        </View>
      );
    }
 
    setErrors(newErrors);
    */

    /*if (newErrors.length === 0) {
      const newUser = { name, email, password };
      setData([...data, newUser]);
      handleClear();
    }
    */

    const newUser = { name, email, password, image: Images.pics[userImage()]};
    setData([...data, newUser]);
    Keyboard.dismiss();
    handleClear();
    
  };


  const Images = {
    pics: {
      '0': require('./../assets/images/1.jpg'),
      '1': require('./../assets/images/2.jpg'),
      '2': require('./../assets/images/3.jpg'),
      '3': require('./../assets/images/4.jpg'),
      '4': require('./../assets/images/5.jpg'),
      '5': require('./../assets/images/6.jpg'),

    }
  }

  return (

    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('./../assets/images/francesco-ungaro-hqAGgNsMpEY-unsplash.jpg')}
          style={{ flex: 1, width: '100%' }}
        >
          <KeyboardAwareScrollView>

            <Text style={{ fontSize: 30, textAlign: "center", color: "#544E4C" }}>Handel Text Input </Text>
            <Text style={styles.textEntered}>Your Name* </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Your Name" placeholderTextColor={'grey'}
              onChangeText={(text) => setName(text)}
              value={name}
              autoFocus={true}
            />
            {nameError ? <Text style={styles.errorDisplay}>{nameError}</Text> : null}

            <Text style={styles.textEntered} autoFocus={true}>Your EmailID* </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your Email ID" placeholderTextColor={'grey'}
              onChangeText={(text) => setEmail(text)}
              value={email}
            //autoFocus={true}
            />
            {emailError ? <Text style={styles.errorDisplay}>{emailError}</Text> : null}

            <Text style={styles.textEntered} autoFocus={true}>Enter Password* </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Please enter a valid Password" placeholderTextColor={'grey'}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            // autoFocus = {true}
            />
            {passwordError ? <Text style={styles.errorDisplay}>{passwordError}</Text> : null}
            <View style={styles.buttonContent}>
              <Button
                color={"green"}
                title="Submit Details"
                onPress={handleSubmit}
              // autoFocus = {true}
              />
              <Button
                title="Clear Details"
                onPress={handleClear}
              //  autoFocus = {true}
              />
            </View>
          </KeyboardAwareScrollView>

        </ImageBackground>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{
          backgroundColor: 'black',
          alignItems: 'center',
          paddingVertical: 10
        }}>
          <Text style={{ fontSize: 25, color: 'white', marginVertical: 10 }}>List of logged in Users</Text>
        </View>
        <FlatList
          data={data}
          scrollEnabled
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={() => (
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 40, fontWeight: "bold" }}>No User has logged in ...</Text>
              <Text style={{ fontSize: 30, fontWeight: "bold" }}>Please log in with some valid credentials ...</Text>
            </View>
          )}
          renderItem={({ item }) =>
            <View style={styles.viewContents}>
              <View style={{padding:4}}>
                <Image style={styles.imagesStyle} source={Images.pics[Math.floor(Math.random() * 6)]} />
              </View>
              <View style={{flex:1}}>
                <Text style={styles.listContent}>{item.name}</Text>
                <Text style={styles.listContent}> {item.email}</Text>
              </View>
            </View>
          }
          ItemSeparatorComponent={() => (
            <View style={{ borderTopColor: 'black', borderTopWidth: 4 }}></View>
          )}
        />
        {/* <Image style={styles.imagesStyle} source={require('./../assets/1.jpg')}/> */}
      </View>

    </View>

    //     <View style={{ flex: 1 }}>


    //   <View style={{ flex: 1 }}>

    //   </View>

    // </View>

  );
};


const styles = StyleSheet.create({
  textInput: {
    fontSize: 18,
    color: "black",
    borderWidth: 2,
    borderColor: "grey",
    margin: 10,
    marginTop: 0,
    backgroundColor: 'white',
    borderRadius: 10
  },
  viewContents: {
    fontSize: 18,
    color: "red",
    borderWidth: 2,
    borderColor: "grey",
    backgroundColor: "lightblue",
    margin: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems:'centre'
  },
  textEntered: {
    fontSize: 20,
    margin: 10,
    marginBottom: 0,
    color: "black"
  },
  listContent: {
    fontSize: 20,
    fontWeight: "600",
    color: "red",
    padding: 4,
    flex: 1
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10
  },
  errorDisplay: {
    color: 'red',
    marginLeft: 10,
    fontSize: 18
  },
  imagesStyle: {
    height: 90,
    width: 90,
    borderRadius:10
  }
})

export default LoginForm;
