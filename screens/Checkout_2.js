import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import strings from '../localization/strings';
import colors from '../constants/colors';
import Icon from '../constants/icons';
import Pill from '../components/Pill';


const Checkout_2 = ({ navigation }) => {
	const { navigate } = navigation;
	return (
		<View style={styles.container}>
			<Text style={[styles.title, {
				borderBottomColor: colors.lightGray
			}]}>{strings.howToReceiveOrder}</Text>
			<Pill
				iconName='location-1'
				title={strings.freeDelivery}
				deliveryPeriod={25}
				onPress={() => navigate('Checkout_3', {})}
			/>
			<Pill
				iconName='shipping-truck'
				title={strings.freeDelivery}
				deliveryPeriod={25}
				shippingPrice='15 000'
				currency=' сум'
				onPress={() => navigate('Checkout_3', {})}
			/>
			<Pill
				iconName='lightning'
				title={strings.freeDelivery}
				deliveryPeriod={25}
				shippingPrice='15 000'
				currency=' сум'
				onPress={() => navigate('Checkout_3', {})}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column'
	},
	title: {
		textAlign: 'center',
		fontSize: 22,
		padding: 40,
		fontWeight: '500',
		borderBottomWidth: 1,
	},
});

export default Checkout_2;
