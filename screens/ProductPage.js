import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableWithoutFeedback, LayoutAnimation } from 'react-native';
import BlurFooter from '../components/BlurFooter';
import colors from '../constants/colors';
import strings from '../localization/strings';
import Carousel from 'react-native-snap-carousel';
import requests from '../api/api'
import { connect } from 'react-redux';
import { addToCart, toggleFavorite } from '../redux/actions';

const ProductPage = ({ navigation, dispatch, favorite }) => {
  let data = navigation.getParam('item')
  const [item, setItem] = useState(data);
  const [pickingSize, setPickingSize] = useState(false);
  const [offerIndex, setOfferIndex] = useState(-1)
  let store = item.store || {};
  useEffect(() => {
    requests.main.getProduct(data.id).then((res) => {
      setItem(res.data.data)
    }).catch(({ response }) => console.warn(response));
  }, [])
  return (
    <React.Fragment>
      <ScrollView>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.superLightGray,
            },
          ]}>
          {item.images && item.preview_image && <View
            style={[
              {
                backgroundColor: colors.white,
              },
            ]}>
            <Carousel
              loop={true}
              containerCustomStyle={{ overflow: 'visible' }}
              layout={'stack'}
              sliderWidth={Dimensions.get('window').width - 60}
              itemWidth={Dimensions.get('window').width - 60}
              data={[{ image: item.preview_image }, ...item.images]}
              renderItem={({ item: element }) => <Image
                source={{
                  uri:
                    element.image,
                }}
                resizeMode={'cover'}
                style={{
                  height: 300,
                  width: Dimensions.get('window').width - 60,
                }}
              />}
              layoutCardOffset={`18`} />
            <View style={styles.newTag}>
              <View style={styles.whiteDot} />
              <Text style={styles.tagText}>New!</Text>
            </View>
          </View>}
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 12,
              }}>
              {item.category && item.category.name}
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 12,
              }}>
              Артикул: {item.code}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
              <Text
                style={[
                  styles.price,
                  {
                    color: colors.red,
                  },
                ]}>
                {item.price && item.price.price_value}
              </Text>
              <Text
                style={[
                  styles.currency,
                  {
                    color: colors.red,
                  },
                ]}>
                {' '}
                сум
              </Text>
            </View>
            {item.offer && item.offer.length > 0 ? <>
              <TouchableWithoutFeedback onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInOut)
                setPickingSize(!pickingSize)
              }}>
                <Text
                  style={[
                    styles.selectSize,
                    {
                      color: colors.blue,
                    },
                  ]}>
                  {strings.pickSize}
                </Text>
              </TouchableWithoutFeedback>
              {pickingSize && <View style={styles.offerContainer}>
                {item.offer.map((e, i) => {
                  return <TouchableWithoutFeedback onPress={() => {
                    setOfferIndex(i === offerIndex ? -1 : i)
                  }}>
                    <Text style={[styles.singleOffer, i === offerIndex && styles.activeOffer]}>{e.name}</Text>
                  </TouchableWithoutFeedback>
                })}
              </View>}</> : null}
          </View>
          <View style={styles.about}>
            <Text style={[styles.name, { paddingBottom: 20 }]}>{strings.aboutProduct}</Text>
            <Text style={styles.title}>{item.description}</Text>
            {/* <Text style={styles.up}>{strings.upperMaterial}</Text>
            <Text style={styles.down}>{strings.fauxLeather}</Text>
            <Text style={styles.up}>{strings.innerMaterial}</Text>
            <Text style={styles.down}>{strings.fauxFur}</Text>
            <Text style={styles.up}>{strings.outsoleMaterial}</Text>
            <Text style={styles.down}>{strings.thermoplasticRubber}</Text> */}
            {/* <Text
              style={[
                styles.selectSize,
                {
                  color: colors.blue,
                },
              ]}>
              Подробнее
            </Text> */}
          </View>
          <View style={styles.shop}>
            <Text style={styles.title}>{strings.shop}</Text>
            {store.logo && <View style={styles.nikeWrap}>
              <Text style={styles.nike}>{store.name}</Text>
              <Image
                source={{
                  uri:
                    store.logo.path,
                }}
                style={{
                  width: 100,
                  height: 53,
                }}
                resizeMode="cover"
              />
            </View>
            }
            <Text
              style={[
                styles.paragraph,
                {
                  marginBottom: 10,
                },
              ]}>
              {store.content}
            </Text>
            <Text style={styles.shopTitle}>{strings.address}</Text>
            <Text style={styles.paragraph}>
              {store.address}
            </Text>
            <Text style={styles.shopTitle}>{strings.phone}</Text>
            <Text style={styles.paragraph}>{store.pmall_phone}</Text>
            {/* <Text style={styles.shopTitle}>{strings.workingHours}</Text>
            <Text style={styles.paragraph}>с 10:00 до 22:00 (без обеда).</Text> */}
          </View>
        </View>
      </ScrollView>
      <BlurFooter favIcon={favorite[item.id] ? "heart" : "heart-empty"} onLeftPress={() => dispatch(toggleFavorite(item))} onPress={() => {
        dispatch(addToCart({ ...item, offerIndex }))
      }} buttonText="В корзину" />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  newTag: {
    padding: 5,
    backgroundColor: 'red',
    width: 80,
    height: 33,
    borderRadius: 33,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    position: 'absolute',
    transform: [{ translateY: -100 }]
  },
  whiteDot: {
    backgroundColor: 'white',
    height: 5,
    width: 5,
    left: -6,
    borderRadius: 5,
  },
  tagText: {
    fontSize: 20,
    color: 'white',
  },
  banner: {
    paddingTop: 30,
    justifyContent: 'center',
    width: Dimensions.get('window').width - 60,
  },
  name: {
    marginTop: 40,
    fontSize: 22,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    marginTop: 12,
    fontWeight: '500',
  },
  selectSize: {
    fontSize: 15,
    fontWeight: '900',
    marginTop: 12,
  },
  about: {
    marginTop: 20,
  },
  title: {
    fontSize: 19,
    fontWeight: '800',
  },
  up: {
    fontSize: 17,
    marginTop: 10,
  },
  down: {
    fontSize: 17,
    fontWeight: '800',
  },
  shop: {
    marginTop: 50,
    paddingBottom: 100,
  },
  nikeWrap: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nike: {
    fontSize: 32,
    fontWeight: '600',
    flex: 1,
  },
  shopTitle: {
    fontSize: 19,
    fontWeight: '800',
    marginTop: 20,
  },
  paragraph: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '200',
    opacity: 0.6,
  },
  offerContainer: {
    flexDirection: 'row',
  },
  singleOffer: {
    padding: 10,
    color: colors.darkGray,
    fontSize: 16,
  },
  activeOffer: {
    padding: 10,
    color: colors.red,
    fontSize: 16,
  }
});

const mapStateToProps = ({ favorite }) => ({
  favorite
})



export default connect(mapStateToProps)(ProductPage);
