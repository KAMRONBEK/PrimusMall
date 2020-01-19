import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { connect } from "react-redux";
import strings from '../localization/strings';
import ProductCart from "../components/ProductCart";

let Favorite = ({ favorite }) => {
	if (favorite && Object.keys(favorite).length > 0) {
		return <FlatList
			keyExtractor={e => e.id.toString()}
			data={Object.keys(favorite).map(key => favorite[key])}
			numColumns={2}
			renderItem={(itemProps) => <ProductCart {...itemProps} />} />
	}
	return (
		<View style={styles.container}>
			<Text>{strings.noFavoriteItem}</Text>
		</View>
	);
}

let mapStateToProps = ({ favorite }) => ({ favorite });

export default connect(mapStateToProps)(Favorite)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
