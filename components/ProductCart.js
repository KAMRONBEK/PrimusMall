'use strict';

import React, {useState} from 'react';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import NavigationService from '../services/NavigationServices';
import {toggleFavorite, addToCart} from '../redux/actions';

import {
    Dimensions,
    Image,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import {connect} from 'react-redux';
import {withNavigation} from 'react-navigation';

const ProductCart = ({item, index, favorite, dispatch, navigation}) => {
    // let [favIcon, setFavIcon] = useState('heart-empty');
    let favIcon = 'heart-empty';
    if (favorite[item.id]) {
        favIcon = 'heart';
    }

    const normalizePrice = (price) => {
        let normalizedPrice = "";
        let parsedPrice = price.toString();
        let last = parsedPrice.length % 3;
        let priceArr = parsedPrice.split("");
        for (let i = 0; i < last; i++) {
            normalizedPrice += priceArr[i];
            priceArr.shift(i);
            if (last - i === 1) normalizedPrice += " ";
        }
        for (let i = 0; i < priceArr.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                normalizedPrice += " "
            }
            normalizedPrice += priceArr[i]
        }
        return normalizedPrice
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                NavigationService.navigate('ProductPage', {item});
            }}>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: colors.white,
                    },
                ]}>
                <View style={styles.top}>
                    <View
                        style={[
                            styles.brand,
                            {
                                backgroundColor: item.brand_name ? colors.red : 'transparent',
                            },
                        ]}>
                        <Text
                            style={[
                                styles.brandText,
                                {
                                    color: colors.white,
                                },
                            ]}>
                            {item.brand_name}
                        </Text>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            dispatch(toggleFavorite(item));
                        }}>
                        <Icon style={styles.favorite} name={favIcon} size={25}/>
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.image}>
                    <Image
                        style={{
                            height: 120,
                            width: 120,
                        }}
                        source={{
                            uri: item.preview_image,
                        }}
                    />
                </View>
                <View style={styles.bottom}>
                    <View style={styles.titleWrap}>
                        <Text numberOfLines={1} style={styles.modelName}>
                            {item.name}
                        </Text>
                        <Text style={styles.type}>{item.category_name}</Text>
                    </View>
                    <View style={styles.priceWrap}>
                        <View style={styles.prices}>
                            {item.price && item.price.old_price_value ? (
                                <>
                                    <Text style={styles.prevPrice}>
                                        {item.price && item.price.old_price_value}
                                        {item.price && item.price.preview_text}
                                    </Text>
                                </>
                            ) : (
                                <View/>
                            )}
                            <Text
                                style={[
                                    styles.currentPrice,
                                    {
                                        color: colors.red,
                                    },
                                ]}>
                                {normalizePrice(item.price.price_value)}
                                {item.price.preview_text}
                            </Text>
                        </View>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                // dispatch(addToCart(item));
                                // navigation.navigate('Basket')
                            }}>
                            <Icon
                                name="bag"
                                size={30}
                                style={{
                                    marginRight: 20,
                                }}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: (Dimensions.get('window').width - 30) / 2,
        marginLeft: 10,
        marginTop: 10,
        paddingBottom: 0,
        borderWidth: 1,
        borderColor: '#dedede',
    },
    top: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    image: {
        width: (Dimensions.get('window').width - 30) / 2 - 20,
        margin: 10,
        borderColor: 'red',
        alignItems: 'center',
    },
    bottom: {
        paddingBottom: 10,
    },
    brand: {
        marginTop: 10,
        marginRight: 10,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        left: -5,
    },
    brandText: {
        fontSize: 12,
        paddingRight: 10,
        paddingLeft: 10,
        fontWeight: '200',
    },
    favorite: {
        marginTop: 10,
        marginRight: 10,
    },
    titleWrap: {
        marginLeft: 15,
    },
    modelName: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    type: {
        fontSize: 14,
        fontWeight: '200',
        color: colors.gray,
    },
    priceWrap: {
        marginLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    prevPrice: {
        fontSize: 12,
        opacity: 0.3,
        fontWeight: '600',
        marginBottom: 0,
        paddingBottom: 0,
    },
    currentPrice: {
        marginTop: 0,
        paddingTop: 0,
        fontSize: 16,
        fontWeight: '600',
    },
});

const mapStateToProps = ({favorite, cart}) => ({
    favorite,
    cart,
});

export default connect(mapStateToProps)(withNavigation(ProductCart));
