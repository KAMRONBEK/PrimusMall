import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function Logout() {
  return (
    <View style={styles.container}>
      <View style={styles.border} />

      <View style={styles.modal}>
        <Text style={styles.text}>Sure,you want to log out?</Text>
        <View style={styles.buttonWrap}>
          <Button title="No" color="red" style={styles.Button} />
          <Button title="Yes" color="#00d6d6" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  buttonWrap: {
    alignItems: 'center',
  },
  Button: {
    borderColor: '#00d6d6',
    borderWidth: 1,
    borderStyle: 'solid',
    color: 'red',
  },
  text: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 24,
    paddingBottom: 20,
  },
  border: {backgroundColor: '#00d6d6', height: 24, marginBottom: 20},
});
