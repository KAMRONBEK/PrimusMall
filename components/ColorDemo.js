import React from "react";
import { View, StyleSheet } from "react-native";

const ColorDemo = ({ color }) => {
	return (
		<View
			style={[
				styles.container,
				{
					backgroundColor: color,
					borderWidth: color == "white" || color == "#fff" ? 1 : 0,
					borderColor: "black"
				}
			]}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 15,
		width: 15,
		borderRadius: 3,
		transform: [{ rotate: "45deg" }]
	}
});

export default ColorDemo;
