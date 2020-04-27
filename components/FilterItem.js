import React from "react";
import {
	Text,
	View,
	StyleSheet,
	CheckBox,
	TouchableWithoutFeedback
} from "react-native";
import Icon from "../constants/icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../constants/colors";
import ColorDemo from "../components/ColorDemo";

const FilterItem = ({
	text,
	subFilterList = null,
	setData,
	filters,
	setFilters = () => {},
	id,
	index,
	item
}) => {
	let isLink = !!subFilterList;
	let toggleCheckbox = val => {
		if (!filters[id]) {
			let f = { ...filters, [id]: { [item.slug]: true } };
			setFilters(f);
			return;
		}
		if (filters[id] && filters[id][item.slug] === true) {
			let f = { ...filters };
			delete f[id][item.slug];
			setFilters(f);
			return;
		}
		let newVal = { ...filters[id], [item.slug]: true };
		let f = { ...filters, [id]: newVal };
		setFilters(f);
	};
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				if (isLink) {
					setData(subFilterList, text, true, item);
					return;
				}
				toggleCheckbox();
			}}
		>
			<View
				style={[
					styles.container,
					{
						borderColor: colors.superLightGray
					}
				]}
			>
				<React.Fragment>
					<View style={styles.left} />
					<View style={styles.middle}>
						<Text style={styles.title}>{text}</Text>
					</View>
					<View style={styles.right}>
						{isLink ? (
							<View>
								<FontAwesome name="angle-right" size={20} />
							</View>
						) : (
							<CheckBox
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								checkedColor="red"
								value={filters[id] && filters[id][item.slug]}
								onPress={toggleCheckbox}
							/>
						)}
					</View>
				</React.Fragment>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderTopWidth: 1,
		paddingTop: 20,
		paddingBottom: 20
	},
	left: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	middle: {
		paddingLeft: 10,
		flex: 5,
		justifyContent: "center",
		alignItems: "flex-start"
	},
	title: {
		fontSize: 16
	},
	right: {
		flex: 1,
		marginRight: 20,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default FilterItem;
