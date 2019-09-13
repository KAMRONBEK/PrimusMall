import React, {useState} from 'react';

import {TextInput, Text, StyleSheet, View, Dimensions} from 'react-native';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from '../constants/icons';

const TextInputField = ({
  placeholder,
  iconName,
  legend,
  secondaryIconName,
  secureTextEntry,
  notEntry,
  textValue,
  noBorder,
  textWeight,
}) => {
  let [text, setText] = useState('');

  return (
    <View style={{borderColor: colors.red, marginTop: 10}}>
      <Text style={styles.legend}>{legend}</Text>
      <View
        style={[
          styles.input,
          {
            borderColor: !noBorder ? colors.red : colors.white,
          },
        ]}>
        <View style={styles.iconWrap}>
          <Icon
            name={iconName}
            size={15}
            style={{paddingRight: 20, marginLeft: -5}}
          />
        </View>
        {!notEntry ? (
          <TextInput
            onChangeText={text => {
              setText(text);
            }}
            value={text}
            placeholder={placeholder}
            style={[styles.inputField]}
            secureTextEntry={secureTextEntry}
          />
        ) : (
          <Text
            style={{
              fontWeight: textWeight != '' ? textWeight : '400',
            }}>
            {textValue}
          </Text>
        )}
        <MaterialCommunityIcons
          name={secondaryIconName}
          size={18}
          style={{opacity: 0.5}}></MaterialCommunityIcons>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    padding: 5,
  },
  iconWrap: {
    width: 50,
    alignItems: 'center',
  },
  inputField: {
    width: Dimensions.get('window').width / 2,
    fontSize: 20,
  },
  legend: {
    opacity: 0.3,
  },
});

export default TextInputField;
