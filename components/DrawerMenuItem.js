import React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import Icon from '../constants/icons';

const DrawerMenuItem = ({iconName, text, small, onPress}) => {
  // const { navigate } = navigation;
  return (
    <React.Fragment>
      {/* <TouchableWithoutFeedback onPress={() => navigate(redirectTo, {})}> */}
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.icon}>
            <Icon name={iconName} size={!small ? 30 : 15} />
          </View>
          <Text>{text}</Text>
        </View>
      </TouchableWithoutFeedback>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
  },
  icon: {
    flexBasis: 50,
    alignItems: 'center',
  },
});

export default DrawerMenuItem;
