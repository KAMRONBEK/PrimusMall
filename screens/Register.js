import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import TextInputField from "../components/TextInputField";

import RoundButton from "../components/RoundButton";
import colors from "../constants/colors";

export default function Register({ navigation }) {
	const { navigate } = navigation;
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Регистрация</Text>
			<TextInputField
				placeholder={"Введите свое имя"}
				iconName={"user"}
				legend={"Имя"}
				secondaryIconName={"close"}
			></TextInputField>
			<TextInputField
				placeholder={"Введите свою фамилию"}
				iconName={"user"}
				legend={"Фамилия"}
				secondaryIconName={"close"}
			></TextInputField>
			<TextInputField
				placeholder={"Введите номер телефона"}
				iconName={"phone"}
				legend={"Номер телефона"}
				secondaryIconName={"close"}
			></TextInputField>
			<TextInputField
				placeholder={"Введите пароль"}
				iconName={"lock"}
				legend={"Пароль"}
				secondaryIconName={"eye-off"}
				secureTextEntry={true}
			></TextInputField>
			<RoundButton
				isFilled
				backgroundColor={colors.red}
				textColor={colors.white}
				text={"Далее"}
				onPress={() => navigate("Main", {})}
			></RoundButton>
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
