import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import Icon from '../constants/icons';
import strings from '../localization/strings';
import colors from '../constants/colors';
import requests from '../api/api';
import ProductCart from '../components/ProductCart'

const Catalog = ({ navigation }) => {
  const { navigate } = navigation;
  let index = navigation.getParam('index');
  let item = navigation.getParam('item');
  let { name: title } = childs[index];
  const [selectedIndex, setselectedIndex] = useState(index);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childs, setChildren] = useState([]);
  let filters = {};
  let normalizeFilters = (data) => {
    return Object.keys(data).reduce((prev, key) => {
      return `${prev + key}=${filters[key]}`
    }, "?")
  }
  let populateProducts = () => {
    setLoading(true)
    requests.main.filterProducts(normalizeFilters(filters))
      .then(res => { setProducts(res.data.data) })
      .catch(({ response }) => console.warn(response))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    filters['category'] = item.id;
    populateProducts();
    requests.main.getCategoryChilds(item.id).then(res=>{
      setChildren(res.data.data)
    })
  }, []);
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
                <TouchableWithoutFeedback onPress={() => {
                  filters['category'] = e.id;
                  setselectedIndex(i);
                  populateProducts();
                }}>
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
      <View style={styles.container}>
        {!loading && products.length > 0 ?
          <FlatList
            keyExtractor={e => e.id}
            data={products}
            numColumns={2}
            renderItem={(itemProps) => <ProductCart {...itemProps} />} /> :
          <View style={styles.centeredContainer}>
            {loading ? <ActivityIndicator size={'large'} color={colors.orange} /> : <Text style={styles.bigText}>{strings.noItems}</Text>}
          </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bigText: { fontSize: 19, fontWeight: 'bold', color: colors.black, textAlign: 'center' },
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
    paddingBottom: 10
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icons: {
    flexDirection: 'row',
  }, centeredContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});

export default Catalog;
