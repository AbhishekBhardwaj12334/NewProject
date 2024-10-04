import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import Fonts from '../src/fonts/fonts'

const AnimatedInput = ({ label, value, onChangeText, secureTextEntry, containerStyles, editable }) => {
  const [isFocused, setIsFocused] = useState(false);
  const labelPosition = new Animated.Value(value ? 0 : 18);

  useEffect(() => {
    Animated.timing(labelPosition, {
      toValue: isFocused || value ? -14 : 12,
      duration: 2,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value, labelPosition]);

  const handleFocus = () => {
    if (value !== '') {
      setIsFocused(true);
    }

  };

  const handleBlur = () => {
    if (value == '') {
      setIsFocused(false);
    }
  };

  return (
    <View style={[styles.container, containerStyles]}>
      <View style={styles.inputContainer}>
        <Animated.Text
          style={[
            styles.label,
            {
              transform: [{ translateY: labelPosition }],
              color: isFocused ? 'rgba(31, 37, 40, 0.30)' : 'rgba(31, 36, 40, 0.30)',
              zIndex: isFocused || value ? 1 : 0,
              backgroundColor: isFocused || value ? 'white' : 'transparent'
            },
          ]}
        >
          {label}
        </Animated.Text>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          editable={editable}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputContainer: {
    position: 'relative',

  },
  label: {
    position: 'absolute',
    left: 15,
    // top: -15,
    fontSize: 18,
    fontFamily: Fonts.FONTS_REGULAR,
    height: 24,
    textAlign: 'center',
    // width:'auto'
  },
  input: {
    height: 60,
    width: '100%',
    // borderWidth: 1,
    fontSize: 18,
    paddingLeft: 15,
    marginTop: 40,
    borderRadius: 8,
    fontFamily: Fonts.FONTS_MEDIUM,
    bottom: 41,
    color: 'black'
  },
});

export default AnimatedInput;