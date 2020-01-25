import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Pill from "../components/Pill";
import strings from "../localization/strings";
import colors from "../constants/colors";
import requests from "../api/api";
import click from '../assets/image/click.png'
import payme from '../assets/image/payme.png'
import { connect } from "react-redux";
import { setOrder } from '../redux/actions/order'

const Checkout_5 = ({ navigation, dispatch, order }) => {
	let { navigate } = navigation;
	const [data, setData] = useState([]);
	useEffect(() => {
		requests.main.getPaymentMethods().then(res => {
			setData(res.data)
		})
	}, [])
	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<Text
					style={[
						styles.title,
						{
							borderColor: colors.lightGray
						}
					]}
				>
					{strings.selectPaymentMethod}
				</Text>
				{data && data.map((e) => {
					let image = null;
					if (e.name.toLowerCase() === 'payme') {
						image = payme
					}
					if (e.name.toLowerCase() === 'click') {
						image = click
					}
					return <Pill
						headerCenter
						title={e.name}
						image={image}
						iconName="bank_card"
						onPress={() => {
							dispatch(setOrder({ payment_method_id: e.id }));
							navigation.navigate('Checkout_6');
						}}
					/>
				})}
				{/* <Pill
					iconName="bank_card"
					title={strings.viaTheCard}
					headerCenter
					onPress={() => navigate("Checkout_6", {})}
				/>
				<Pill
					iconName="bank_card"
					title={strings.inCash}
					headerCenter
					onPress={() => navigate("Checkout_6", {})}
				/> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		flex: 1
	},

	content: {
		top: -40
	},
	title: {
		textAlign: "center",
		fontSize: 22,
		padding: 40,
		paddingTop: 0,
		fontWeight: "500",
		borderBottomWidth: 1
	}
});

const mapStateToProps = ({ order }) => ({
	order
})

export default connect(mapStateToProps)(Checkout_5);
