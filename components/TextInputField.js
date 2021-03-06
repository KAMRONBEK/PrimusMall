import React, { useState } from 'react';

import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import colors from '../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from '../constants/icons';

const TextInputField = ({
  width,
  placeholder,
  iconName,
  legend,
  secondaryIconName,
  secureTextEntry: secure,
  notEntry,
  textValue,
  noBorder,
  textWeight = '400',
  value,
  fontSize = 14,
  onChangeText = () => { },
}) => {
  let [borderColor, setBorderColor] = useState(colors.lightGray);
  const [secureTextEntry, setSecureTextEntry] = useState(secure)
  return (
    <View
      style={[
        styles.container,
        {
          width: width != null ? width : null,
        },
      ]}>
      <Text style={styles.legend}>{legend}</Text>
      <View
        style={[
          styles.input,
          {
            borderColor: !noBorder ? borderColor : colors.white,
            marginTop: notEntry ? 10 : 0,
          },
        ]}>
        <View style={styles.iconWrap}>
          <Icon
            name={iconName}
            size={15}
            style={{ marginRight: 10, marginLeft: -5 }}
          />
        </View>
        {!notEntry ? (
          <TextInput
            numberOfLines={1}
            onChangeText={text => {
              onChangeText(text);
            }}
            onFocus={() => {
              setBorderColor(colors.red);
            }}
            onEndEditing={() => {
              setBorderColor(colors.lightGray);
            }}
            value={value || textValue}
            placeholder={placeholder}
            style={[styles.inputField, { fontSize, fontWeight: textWeight }]}
            secureTextEntry={secureTextEntry}
          />
        ) : (
            <Text
              style={{
                fontWeight: textWeight != '' ? textWeight : '400',
                fontSize,
              }}>
              {textValue}
            </Text>
          )}
        <TouchableOpacity onPress={() => {
          if (secure) {
            setSecureTextEntry(!secureTextEntry)
            return;
          }
          onChangeText(null)
        }}>
          <MaterialCommunityIcons
            name={secondaryIconName}
            size={18}
            style={{ opacity: 0.5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    borderColor: colors.red,
    marginTop: 5,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingRight: 5,
  },
  iconWrap: {
    width: 50,
    alignItems: 'center',
  },
  inputField: {
    width: Dimensions.get('window').width / 2,
    // flex: 1,
    fontSize: 15,
  },
  legend: {
    opacity: 0.3,
    marginBottom: -5,
  },
});

export default TextInputField;
