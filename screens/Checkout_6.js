import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import image from "../assets/image/payme.png";
import strings from "../localization/strings";
import colors from "../constants/colors";
import RoundButton from "../components/RoundButton";

const Chackout_6 = ({ navigation }) => {
	const { navigate } = navigation;
	return (
		<View style={styles.container}>
			<View style={styles.top}>
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
					<Image
						source={image}
						resizeMode="contain"
						style={{
							flex: 1,
							width: 80,
							height: null
						}}
					/>
				</View>
			</View>
			<View style={styles.middle}>
				<Text
					style={{
						fontSize: 18,
						paddingBottom: 20,
						paddingTop: 10
					}}
				>
					{strings.order}#65658
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
						<Text style={styles.text}>400 000</Text>
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
						<Text style={styles.text}>400 000</Text>
						<Text style={styles.text}> сум</Text>
					</View>
				</View>
			</View>
			<View style={styles.bottom}>
				<RoundButton
					textColor={colors.white}
					borderColor={colors.red}
					backgroundColor={colors.red}
					text={strings.pay}
					onPress={() => (navigate("Main"), {})}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
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

export default Chackout_6;
