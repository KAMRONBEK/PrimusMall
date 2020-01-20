import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

const BannerItem = ({ item, index }) => {
    if (!item) {
        return null;
    }
    let { image } = item || {}
    return (
        <View>
            <Image source={{ uri: image.path }} style={[styles.image, index % 2 === 0 && { marginRight: 20 }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 400,
        width: Dimensions.get('window').width / 2 - 10,
        marginVertical: 8
    }
})


export default BannerItem
