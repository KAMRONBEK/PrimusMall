import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Icon from '../constants/icons';
import strings from '../localization/strings';
import colors from '../constants/colors';

const Catalog = ({ navigation }) => {
  const { navigate } = navigation;
  let childs = navigation.getParam('childs');
  let index = navigation.getParam('index');
  let item = navigation.getParam('item');
  let { name: title } = childs[index];
  const [selectedIndex, setselectedIndex] = useState(index)
  return (
    <View style={styles.container}>
      <View>
        <Header
          simpleTitle={title}
          backwardArrow
          rightRender
          navigation={navigation}
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.top}>
            {childs.map((e, i) => {
              return (
                <TouchableWithoutFeedback onPress={() => setselectedIndex(i)}>
                  <View
                    key={e.id}
                    style={[styles.category, i === selectedIndex && styles.active]}>
                    <Text style={[styles.text, i === selectedIndex && styles.activeText]}>
                      {e.name}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.selectorWrap}>
          <TouchableWithoutFeedback onPress={() => navigate('Filter', { item })}>
            <View style={styles.selector}>
              <Icon name="controls" size={18} />
              <Text style={styles.ml10}>{strings.filter}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback>
            <View style={styles.selector}>
              <View style={styles.icons}>
                <Ionicons name="ios-arrow-round-down" size={22} />
                <Ionicons name="ios-arrow-round-up" size={22} />
              </View>
              <Text style={styles.ml10}>{strings.byPopularity}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.container} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.superLightGray, flex: 1 },
  ml10: {
    marginLeft: 10,
  },
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
