import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import strings from '../localization/strings';
import colors from '../constants/colors';
import Pill from '../components/Pill';
import { connect } from 'react-redux';
import requests from '../api/api'
import { setOrder } from '../redux/actions/order';


const Checkout_2 = ({ navigation, dispatch, order }) => {
	const [state, setState] = useState([])
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		requests.main.getShippingTypes().then(res => {
			setState(res.data)
		}).finally(() => setLoading(false))
	}, [])
	let icons = { "1": "location-1", "2": "shipping-truck", "3": 'lightning' }
	const { navigate } = navigation;
	return (
		<View style={styles.container}>
			{loading ? <View style={styles.centeredContainer}><ActivityIndicator size={'large'} color={colors.orange} /></View> : <View>
				<Text style={[styles.title, {
					borderBottomColor: colors.lightGray
				}]}>{strings.howToReceiveOrder}</Text>
				{state && state.map(e => {
					return <Pill
						iconName={icons[e.code]}
						title={e.name}
						deliveryPeriod={e.price_value}
						onPress={() => {
							console.warn(order);
							dispatch(setOrder({ shipping_type_id: e.id }))
							navigate('Checkout_3', {})
						}}
					/>
				})}
			</View>}
		</View>
	);
};

const styles = StyleSheet.create({
	centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
	container: {
		flexDirection: 'column', flex: 1
	},
	title: {
		textAlign: 'center',
		fontSize: 22,
		padding: 40,
		fontWeight: '500',
		borderBottomWidth: 1,
	},
});

const mapStateToProps = ({ order }) => ({
	order
})



export default connect(mapStateToProps)(Checkout_2);
