import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import colors from "../constants/colors";
import Icon from "../constants/icons";
import strings from "../localization/strings";
import { TouchableWithoutFeedback } from "react-native";

const BlurFooter = ({
	price,
	currency,
	buttonText,
	favIcon,
	iconPress,
	onPress
}) => {
	return (
		<View
			style={[
				styles.container,
				{
					position: "absolute",
					width: Dimensions.get("window").width,
					bottom: 0,
					borderTopColor: colors.lightGray,
					borderTopWidth: 1,
					backgroundColor: colors.white,
					opacity: 0.95
				}
			]}
		>
			<View style={styles.left}>
				{price ? (
					<View style={styles.containerLeft}>
						<Text style={styles.topText}>{strings.overall}</Text>
						<View
							style={{
								flexDirection: "row",
								alignItems: "flex-end"
							}}
						>
							<Text style={styles.price}>{price}</Text>
							<Text style={styles.currency}>{currency}</Text>
						</View>
					</View>
				) : (
					<Icon name={favIcon} size={25} />
				)}
			</View>
			<View style={styles.right}>
				<TouchableWithoutFeedback onPress={onPress}>
					<View
						style={[
							styles.redButton,
							{
								backgroundColor: colors.red
							}
						]}
					>
						<Text
							style={[
								styles.buttonText,
								{
									color: colors.white
								}
							]}
						>
							{buttonText}
						</Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row"
	},
	left: {
		flex: 1,
		paddingTop: 20,
		paddingBottom: 30,
		alignItems: "center"
	},
	containerLeft: {
		alignItems: "flex-start"
	},
	topText: {
		fontSize: 17
	},
	price: {
		fontSize: 22,
		fontWeight: "900"
	},
	currency: {
		fontWeight: "900"
	},
	right: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
		// padding: 40,
		// borderWidth: 1,
	},
	redButton: {
		borderRadius: 40,
		padding: 12,
		paddingLeft: 25,
		paddingRight: 25
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "500"
	}
});

export default BlurFooter;
