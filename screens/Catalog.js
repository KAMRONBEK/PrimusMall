import React, { useState, useEffect } from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
	ActivityIndicator,
	FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from "../components/Header";
import Icon from "../constants/icons";
import strings from "../localization/strings";
import colors from "../constants/colors";
import requests from "../api/api";
import ProductCart from "../components/ProductCart";
import { normalizeFilters } from "../utils/object";
import { sortList } from "./Sort";
import { connect } from "react-redux";

const Catalog = ({ navigation, search }) => {
	const { navigate } = navigation;
	let index = navigation.getParam("index");
	let item = navigation.getParam("item") || {};
	let items = navigation.getParam("childs") || [];
	let { name: title } = item;
	if (index !== -1 && items.length > 0) {
		title = items[index].name;
	}
	let sortIndex = navigation.getParam("sortIndex") || 0;

	const [selectedIndex, setselectedIndex] = useState(-1);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [childs, setChildren] = useState([]);
	const [fetching, setFetching] = useState(false);

	let defaultFilters = {
		perpage: 20,
		page: 1,
		category: index !== -1 && items.length > 0 ? items[index].id : item.id,
		sort: sortList[sortIndex].value,
		search,
		filters: {}
	};
	const [filters, setFilters] = useState(defaultFilters);

	let populateProducts = endReach => {
		if (!endReach) {
			setLoading(true);
		}
		let str = normalizeFilters(filters);
		requests.main
			.filterProducts(str)
			.then(res => {
				if (res.data.data && res.data.data.length > 0) {
					if (endReach) {
						setProducts([...products, ...res.data.data]);
					} else {
						setProducts(res.data.data);
					}
				}
			})
			.catch(({ response }) => console.warn(response))
			.finally(() => {
				setLoading(false);
				setFetching(false);
			});
	};
	let onEndReach = () => {
		if (fetching) return;
		setFetching(true);
		setFilters({ ...filters, page: filters.page + 1 });
	};

	useEffect(() => {
		if (index !== -1) {
			requests.main.getCategoryChilds(items[index].id).then(res => {
				setChildren(res.data.data);
			});
		}
	}, []); //eslint-disable-line
	useEffect(() => {
		populateProducts(true);
	}, [filters]); //eslint-disable-line
	useEffect(() => {
		setLoading(true);
		setProducts([]);
		setFilters({ ...filters, sort: sortList[sortIndex].value });
	}, [sortIndex]); //eslint-disable-line
	useEffect(() => {
		setLoading(true);
		setProducts([]);
		setFilters({ ...defaultFilters, search });
	}, [search]); //eslint-disable-line
	return (
		<View style={styles.container}>
			<Header
				simpleTitle={title}
				backwardArrow
				rightRender
				navigation={navigation}
			/>
			<FlatList
				extraData={[loading, selectedIndex]}
				ListHeaderComponent={() => (
					<>
						{index !== -1 && (
							<ScrollView
								horizontal
								showsHorizontalScrollIndicator={false}
							>
								<View style={styles.top}>
									{childs.map((e, i) => {
										return (
											<TouchableWithoutFeedback
												key={e.id}
												onPress={() => {
													setLoading(true);
													setProducts([]);
													setFilters({
														...defaultFilters,
														category: e.id
													});
													if (i === selectedIndex) {
														filters.category =
															item.id;
														setselectedIndex(-1);
														populateProducts();
														return;
													}
													setselectedIndex(i);
													populateProducts();
												}}
											>
												<View
													key={e.id}
													style={[
														styles.category,
														i === selectedIndex &&
															styles.active
													]}
												>
													<Text
														style={[
															styles.text,
															i ===
																selectedIndex &&
																styles.activeText
														]}
													>
														{e.name}
													</Text>
												</View>
											</TouchableWithoutFeedback>
										);
									})}
								</View>
							</ScrollView>
						)}
						<View style={styles.selectorWrap}>
							<TouchableWithoutFeedback
								onPress={() =>
									navigate("Filter", {
										item:
											selectedIndex !== -1
												? childs[selectedIndex]
												: item,
										filters: filters,
										onSubmit: arg => {
											setProducts([]);
											setLoading(true);
											setFilters({
												...filters,
												filters: arg
											});
										}
									})
								}
							>
								<View style={styles.selector}>
									<Icon name="controls" size={18} />
									<Text style={styles.ml10}>
										{strings.filter}
									</Text>
								</View>
							</TouchableWithoutFeedback>
							<TouchableWithoutFeedback
								onPress={() => navigate("Sort")}
							>
								<View style={styles.selector}>
									<View style={styles.icons}>
										<Icon
											name={sortList[sortIndex].iconName}
											size={18}
										/>
									</View>
									<Text style={styles.ml10}>
										{sortList[sortIndex].text}
									</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</>
				)}
				keyExtractor={e => e.id}
				data={products}
				onEndReachedThreshold={0.5}
				onEndReached={onEndReach}
				numColumns={2}
				renderItem={itemProps => <ProductCart {...itemProps} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	bigText: {
		fontSize: 19,
		fontWeight: "bold",
		color: colors.black,
		textAlign: "center"
	},
	container: { backgroundColor: colors.superLightGray, flex: 1 },
	ml10: {
		marginLeft: 10
	},
	top: {
		paddingTop: 20,
		paddingBottom: 20,
		alignItems: "center",
		flexDirection: "row"
	},
	active: {
		padding: 5,
		backgroundColor: "#D82525",
		borderRadius: 50,
		marginLeft: 20
	},

	category: {
		marginLeft: 10
	},
	text: {
		paddingLeft: 10,
		color: "#bababa",
		paddingRight: 10,
		fontSize: 15
	},
	activeText: {
		color: "#FFF"
	},
	selectorWrap: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		paddingBottom: 10
	},
	selector: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	icons: {
		flexDirection: "row"
	},
	centeredContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	}
});

const mapStateToProps = ({ search: { text } }) => ({
	search: text
});

export default connect(mapStateToProps)(Catalog);
