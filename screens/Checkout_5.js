import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Pill from "../components/Pill";
import strings from "../localization/strings";
import colors from "../constants/colors";

const Checkout_5 = ({ navigation }) => {
	let { navigate } = navigation;
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
				<Pill
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
				/>
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

export default Checkout_5;
