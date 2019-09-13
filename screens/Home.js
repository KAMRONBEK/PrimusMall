import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	Text,
	View,
	TouchableWithoutFeedback,
	StatusBar
} from "react-native";
import RoundButton from "../components/RoundButton";
import strings from "../localization/strings";
import colors from "../constants/colors";

export default function Home({ navigation, language }) {
	let [name, setName] = useState(0);
	const { navigate } = navigation;

	useEffect(() => {
		setInterval(() => {
			setName(name++);
		}, 1000);
	}, []);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>{strings.selectLanguage}</Text>
			<RoundButton
				onPress={() => navigate("Login", {})}
				text={strings.ru}
				borderColor={colors.black}
			/>
			<RoundButton
				text={strings.uz}
				borderColor={colors.black}
				onPress={() => {
					navigate("Login", {});
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	title: {
		marginBottom: 30,
		fontWeight: "400",
		fontSize: 30
	}
});
