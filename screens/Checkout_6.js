import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import payme from "../assets/image/payme.png";
import click from "../assets/image/click.png";
import strings from "../localization/strings";
import colors from "../constants/colors";
import RoundButton from "../components/RoundButton";
import requests from "../api/api";
import { connect } from 'react-redux'
import { emptyCart } from "../redux/actions";

const Chackout_6 = ({ navigation, order, token, cart, dispatch }) => {
	const { navigate } = navigation;
	const [loading, setLoading] = useState(true)
	const [data, setData] = useState({})
	useEffect(() => {
		let orderCart = cart.items.map(e => ({ offer_id: e.offer[e.offerIndex].id, quantity: e.count }))
		console.warn(orderCart);

		requests.user.createOrder({ ...order, cart: orderCart }, token)
			.then(res => {
				setData(res.data)
				console.warn(res.data);
			})
			.catch(({ response }) => console.warn(response))
			.finally(() => setLoading(false))
	}, [])
	if (loading) {
		return <View style={styles.centeredContainer}>
			<ActivityIndicator size={"large"} color={colors.orange} />
		</View>
	}

	let confirm = () => {
		dispatch(emptyCart());
		navigation.navigate('Profile');
	}
	return (
		<View style={styles.container}>
			{order.order.payment_method_id !== 4 && <View style={styles.top}>
				<Text
					style={[
						styles.title,
						{
							color: colors.green
						}
					]}
				>
					{strings.payVia}
				</Text>
				<View>
					{order.order.payment_method_id === 2 ? <Image
						source={payme}
						resizeMode="contain"
						style={{
							flex: 1,
							width: 80,
							height: null
						}}
					/> : order.order.payment_method_id === 3 ? <Image
						source={click}
						resizeMode="contain"
						style={{
							flex: 1,
							width: 80,
							height: null
						}}
					/> : null}
				</View>
			</View>
			}
			<View style={styles.middle}>
				<Text
					style={{
						fontSize: 18,
						paddingBottom: 20,
						paddingTop: 10
					}}
				>
					{strings.order} {data.id}
				</Text>
				<View style={styles.topBorder}>
					<Text
						style={{
							fontWeight: "100",
							paddingRight: 40
						}}
					>
						{strings.orderPrice}
					</Text>
					<View
						style={{
							flexDirection: "row"
						}}
					>
						<Text style={styles.text}>{data.total_price}</Text>
						<Text style={styles.text}> сум</Text>
					</View>
				</View>
				<View style={styles.topBorder}>
					<Text
						style={{
							fontWeight: "500",
							paddingRight: 40
						}}
					>
						{strings.totalPrice}
					</Text>
					<View
						style={{
							flexDirection: "row"
						}}
					>
						<Text style={styles.text}>{data.total_price}</Text>
						<Text style={styles.text}> сум</Text>
					</View>
				</View>
			</View>
			<View style={styles.bottom}>
				<RoundButton
					textColor={colors.white}
					borderColor={colors.red}
					backgroundColor={colors.red}
					text={strings.confirm}
					onPress={confirm}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	centeredContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1
	},
	top: {
		flex: 1,
		flexDirection: "row",
		paddingLeft: 20,
		paddingRight: 20,
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		fontSize: 22,
		fontWeight: "200",
		paddingRight: 20
	},
	middle: {
		flex: 1,
		paddingLeft: 60,
		paddingRight: 60
	},
	topBorder: {
		paddingTop: 20,
		paddingBottom: 30,
		borderTopWidth: 1,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	text: {
		paddingLeft: 5
	},
	bottom: {
		flex: 1,
		justifyContent: "center"
	}
});

const mapStateToProps = ({ order, user: { token }, cart }) => ({
	token, order, cart
})

export default connect(mapStateToProps)(Chackout_6);
