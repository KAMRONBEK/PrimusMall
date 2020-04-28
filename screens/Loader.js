import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import requests from "../api/api";
import { userLoaded, cartLoaded, favoritesLoaded } from "../redux/actions";

const Loader = ({ user, dispatch, navigation }) => {
	let bootstrap = async () => {
		let token = await AsyncStorage.getItem("@token");
		let cart =
			(await AsyncStorage.getItem("@cart")) ||
			JSON.stringify({ items: [] });
		let favorites = (await AsyncStorage.getItem("@favorites")) || "{}";
		dispatch(cartLoaded(JSON.parse(cart)));
		dispatch(favoritesLoaded(JSON.parse(favorites)));
		dispatch(userLoaded({ token }));
		if (!token) {
			navigation.navigate("Main");
			return;
		}
		requests.user
			.getUser(token)
			.then(res => {
				dispatch(userLoaded({ token, data: res.data.data }));
				navigation.navigate("Main");
			})
			.catch(res => {
				console.warn(res);
				navigation.navigate("Main");
			});
	};
	useEffect(() => {
		bootstrap();
	}, []);
	return (
		<View style={styles.container}>
			<ActivityIndicator size={"large"} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

const mapStateToProps = ({ user }) => ({
	user: user.data,
	token: user.token
});

export default connect(mapStateToProps)(Loader);
