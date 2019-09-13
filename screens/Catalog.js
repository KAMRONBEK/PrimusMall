import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import strings from '../localization/strings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from '../constants/icons';
import {TouchableWithoutFeedback} from 'react-native';
import {NavigationEvents} from 'react-navigation';

const Catalog = ({navigation}) => {
  const {navigate} = navigation;
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.top}>
          <View style={[styles.category, styles.active]}>
            <Text style={[styles.text, styles.activeText]}>
              {strings.sneakers}
            </Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.boots}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.slippons}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.gumshoes}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.slippons}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.gumshoes}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.slippons}</Text>
          </View>
          <View style={styles.category}>
            <Text style={styles.text}>{strings.gumshoes}</Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.selectorWrap}>
        <TouchableWithoutFeedback onPress={() => navigate('Filter')}>
          <View style={styles.selector}>
            <Icon name="controls" size={18} />
            <Text
              style={{
                marginLeft: 10,
              }}>
              {strings.filter}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.selector}>
            <View style={styles.icons}>
              <Ionicons name="ios-arrow-round-down" size={22} />
              <Ionicons name="ios-arrow-round-up" size={22} />
            </View>
            <Text
              style={{
                marginLeft: 10,
              }}>
              {strings.byPopularity}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  top: {
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  active: {
    padding: 5,
    backgroundColor: '#D82525',
    borderRadius: 50,
    marginLeft: 20,
  },

  category: {
    marginLeft: 10,
  },
  text: {
    paddingLeft: 10,
    color: '#bababa',
    paddingRight: 10,
    fontSize: 15,
  },
  activeText: {
    color: '#FFF',
  },
  selectorWrap: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
});

export default Catalog;
