import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import strings from '../localization/strings';

export default function Favorite() {
	return (
		<View style={styles.container}>
			<Text>{strings.noFavoriteItem}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
