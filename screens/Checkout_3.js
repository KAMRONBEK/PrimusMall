import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import TextInputField from "../components/TextInputField";
import strings from "../localization/strings";
import RoundButton from "../components/RoundButton";
import colors from "../constants/colors";
import { connect } from "react-redux";
import { setShippingAddress } from "../redux/actions/order";

const Checkout_3 = ({ navigation, shipping_address, dispatch }) => {
	let { navigate } = navigation;
	let confirmAddress = () => {
		let { state, city, street, house, flat } = shipping_address;
		if (!state || !city || !street || !house || !flat) {
			alert(strings.provideValidData);
			return;
		}
		navigate("Checkout_5", {});
	};
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Адрес доставки</Text>
			<TextInputField
				iconName="location-1"
				legend={strings.city}
				secondaryIconName="close"
				textValue={shipping_address.state}
				onChangeText={state => {
					dispatch(setShippingAddress({ state }));
				}}
			/>
			<TextInputField
				iconName="compass"
				legend={strings.district}
				secondaryIconName="close"
				textValue={shipping_address.city}
				onChangeText={city => {
					dispatch(setShippingAddress({ city }));
				}}
			/>
			<TextInputField
				iconName="compass"
				legend={strings.street}
				secondaryIconName="close"
				textValue={shipping_address.street}
				onChangeText={street => {
					dispatch(setShippingAddress({ street }));
				}}
			/>
			<TextInputField
				iconName="home"
				legend={strings.home}
				secondaryIconName="close"
				textValue={shipping_address.house}
				onChangeText={house => {
					dispatch(setShippingAddress({ house }));
				}}
			/>
			<TextInputField
				iconName="home"
				legend={strings.apartment}
				secondaryIconName="close"
				textValue={shipping_address.flat}
				onChangeText={flat => {
					dispatch(setShippingAddress({ flat }));
				}}
			/>
			<View
				style={{
					paddingTop: 10
				}}
			/>
			<RoundButton
				borderColor={colors.red}
				backgroundColor={colors.red}
				text={strings.next}
				textColor={colors.white}
				onPress={confirmAddress}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 50,
		// paddingTop: 0
		paddingTop: 0
	},
	title: {
		textAlign: "center",
		fontSize: 22,
		padding: 40,
		fontWeight: "500"
	}
});

const mapStateToProps = ({ order: { shipping_address } }) => ({
	shipping_address
});

export default connect(mapStateToProps)(Checkout_3);
