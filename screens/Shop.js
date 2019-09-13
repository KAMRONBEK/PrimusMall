import React from "react";
import {
	Text,
	View,
	StyleSheet,
	Dimensions,
	ScrollView,
	Image,
	FlatList,
	TouchableWithoutFeedback
} from "react-native";

const Shop = ({ params }) => {
	let shops = [
		{
			name: "Zara",
			imageURL:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKitgjY0BdV4NXtTh2io1s76d8SCoLilMn7EmGKaVgPllQyV_vw"
		},
		{
			name: "Lara",
			imageURL:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKitgjY0BdV4NXtTh2io1s76d8SCoLilMn7EmGKaVgPllQyV_vw"
		},
		{
			name: "Sara",
			imageURL:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKitgjY0BdV4NXtTh2io1s76d8SCoLilMn7EmGKaVgPllQyV_vw"
		},
		{
			name: "Mara",
			imageURL:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKitgjY0BdV4NXtTh2io1s76d8SCoLilMn7EmGKaVgPllQyV_vw"
		},
		{
			name: "Nara",
			imageURL:
				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQKitgjY0BdV4NXtTh2io1s76d8SCoLilMn7EmGKaVgPllQyV_vw"
		}
	];
	return (
		<ScrollView>
			<View style={styles.container}>
				<FlatList
					keyExtractor={(e, index) => index.toString()}
					numColumns={2}
					data={shops}
					renderItem={({ item, index, seperators }) => (
						<TouchableWithoutFeedback
							onPress={() => console.warn("bummmmmmmaydi")}
						>
							<View
								style={[
									styles.container,
									{
										height: 100
									}
								]}
							>
								<Image
									source={{
										uri: item.imageURL
									}}
									style={styles.temp}
								/>
							</View>
						</TouchableWithoutFeedback>
					)}
				/>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	temp: {
		height: 100,
		flexBasis: Dimensions.get("window").width / 2 - 80,
		borderWidth: 5
	}
});

export default Shop;
