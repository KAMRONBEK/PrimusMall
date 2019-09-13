import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import TextInputField from "../components/TextInputField";
import strings from "../localization/strings";
import RoundButton from "../components/RoundButton";
import colors from "../constants/colors";

const Checkout_3 = ({ navigation }) => {
	let { navigate } = navigation;
	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Адрес доставки</Text>
			<TextInputField
				iconName="location-1"
				legend={strings.city}
				secondaryIconName="close"
			/>
			<TextInputField
				iconName="compass"
				legend={strings.district}
				secondaryIconName="close"
			/>
			<TextInputField
				iconName="compass"
				legend={strings.street}
				secondaryIconName="close"
			/>
			<TextInputField
				iconName="home"
				legend={strings.home}
				secondaryIconName="close"
			/>
			<TextInputField
				iconName="home"
				legend={strings.apartment}
				secondaryIconName="close"
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
				onPress={() => navigate("Checkout_4", {})}
			/>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 50,
		paddingTop: 0
	},
	title: {
		textAlign: "center",
		fontSize: 22,
		padding: 40,
		fontWeight: "500"
	}
});

export default Checkout_3;
