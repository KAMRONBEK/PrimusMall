import React, { useState } from "react";
import { Text, View, Picker, StyleSheet } from "react-native";
import strings from "../localization/strings";
import RoundButton from "../components/RoundButton";
import colors from "../constants/colors";

const Checkout_4 = ({ navigation }) => {
	const { navigate } = navigation;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{strings.deliveryDate}</Text>
			<Text
				style={{
					textAlign: "center"
				}}
			>
				picker goes here
			</Text>
			<Text style={styles.title}>{strings.timeOfDelivery}</Text>
			<Text
				style={{
					textAlign: "center"
				}}
			>
				picker goes here
			</Text>
			<RoundButton
				backgroundColor={colors.red}
				text={strings.next}
				textColor={colors.white}
				borderColor={colors.red}
				onPress={() => navigate("Checkout_5", {})}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	title: {
		textAlign: "center",
		fontSize: 22,
		padding: 20,
		fontWeight: "500"
	}
});

export default Checkout_4;
