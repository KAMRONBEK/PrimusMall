import React, { useState } from "react";
import TextInputField from "../components/TextInputField";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
	TouchableWithoutFeedbackComponent,
	Clipboard
} from "react-native";
import RoundButton from "../components/RoundButton";
import colors from "../constants/colors";
import BlackButton from "../components/BlackButton";
import api from "../api/api";
import { connect } from "react-redux";
import manager from "../oauth/OAuthManager";
import { userLoggedIn } from "../redux/actions/user";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import requests from "../api/api";

const Login = ({ navigation, dispatch, user }) => {
	const [state, setState] = useState({ username: "+998" });
	const [loading, setloading] = useState(false);
	const [error, setError] = useState("");
	const { navigate } = navigation;
	let login = () => {
		setloading(true);
		api.auth
			.login(state)
			.then(res => {
				dispatch(userLoggedIn(res.data));
				navigate("Profile");
			})
			.catch(({ response: res }) => {
				setError(res.data.error);
			})
			.finally(e => {
				setloading(false);
			});
	};
	let updateState = (key, value) => {
		setState({ ...state, [key]: value });
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Вход</Text>
			{/* <LoginButton
        loginBehaviorAndroid="web_only"
        permissions={['public_profile', 'email']}
        onLoginFinished={(error, result) => {
          alert(JSON.stringify(result));
          if (error) {
            console.warn('login has error: ' + result.error);
          } else if (result.isCancelled) {
            console.warn('login is cancelled.');
          } else {
            AccessToken.getCurrentAccessToken().then(data => {
              console.warn();
            });
          }
          console.warn(error);
        }}
        onLogoutFinished={() => console.warn('logout.')}
      /> */}
			<View>
				<View style={styles.error}>
					<Text style={styles.errorText}>{error}</Text>
				</View>
				<TextInputField
					placeholder={"Email"}
					iconName={"e-mail"}
					legend={"Email"}
					secondaryIconName={"close"}
					onChangeText={e => updateState("email", e)}
					value={state.email}
				/>
				<TextInputField
					placeholder={"Password"}
					iconName={"lock"}
					secondaryIconName={"eye-off"}
					legend={"Пароль"}
					secureTextEntry={true}
					value={state.password}
					onChangeText={text => updateState("password", text)}
				/>
			</View>
			<View style={styles.mt50}>
				<RoundButton
					isFilled
					backgroundColor={colors.red}
					text={"ВОЙТИ"}
					textColor={colors.white}
					onPress={login}
					loading={loading}
				/>
			</View>
			<View style={styles.mt}>
				<RoundButton
					isFilled
					backgroundColor={colors.white}
					text={"РЕГИСТРАЦИЯ"}
					textColor={colors.black}
					onPress={() => navigate("Register", {})}
				/>
			</View>
			<View style={styles.footer}>
				<Text>ВОЙТИ ЧЕРЕЗ:</Text>
				<View style={styles.iconsWrapper}>
					<TouchableWithoutFeedback
						onPress={() => {
							manager
								.authorize("google", { scopes: "profile" })
								.then(response => {
									requests.auth
										.social(
											"Google",
											response.response.credentials
												.accessToken
										)
										.then(res => {
											// console.warn(res.data);
											dispatch(
												userLoggedIn({
													...user,
													...res.data
												})
											);
											navigation.navigate("Profile");
										});
								})
								.catch(error => {
									console.warn(error);
								})
								.finally(res => {
									console.warn(res);
								});
							// LoginManager.logOut();
						}}
					>
						<View>
							<BlackButton iconName="google-plus" />
						</View>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback
						onPress={() => {
							// manager
							//   .authorize('facebook', {scopes: 'profile,email'})
							//   .then(response => {
							//     console.warn(response);
							//   })
							//   .catch(error => {
							//     console.warn(error);
							//   })
							//   .finally(res => {
							//     console.warn(res);
							//   });
							LoginManager.logInWithPermissions([
								"public_profile",
								"email"
							]).then(
								result => {
									setloading(true);
									console.warn(result);
									if (result.isCancelled) {
										console.warn("Login cancelled");
										setloading(false);
									} else {
										console.warn(result.grantedPermissions);
										AccessToken.getCurrentAccessToken()
											.then(data => {
												console.warn(data);
												requests.auth
													.social(
														"Facebook",
														data.accessToken
													)
													.then(res => {
														console.warn(res.data);
														dispatch(
															userLoggedIn({
																...user,
																...res.data
															})
														);
														navigation.navigate(
															"Profile"
														);
													});
												// Clipboard.setString(JSON.stringify(data));
												// let request = new GraphRequest('/me', (err, res) => {
												//   console.warn(err, res);
												// });
												// new GraphRequestManager().addRequest(request).start();
											})
											.finally(() => {
												setloading(false);
												setTimeout(() => {
													LoginManager.logOut();
												}, 60000);
											});
									}
								},
								function(error) {
									console.warn(
										"Login fail with error: " + error
									);
									LoginManager.logOut();
								}
							);
						}}
					>
						<View>
							<BlackButton iconName="facebook" />
						</View>
					</TouchableWithoutFeedback>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		marginBottom: 25,
		fontWeight: "600",
		fontSize: 30
	},
	footer: {
		marginTop: 30,
		alignItems: "center"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	iconsWrapper: {
		marginTop: 20,
		flexDirection: "row",
		justifyContent: "space-around",
		width: Dimensions.get("window").width / 3
	},
	mt4: {
		marginTop: 10
	},
	mt50: {
		marginTop: 50
	},
	error: {
		padding: 15
	},
	errorText: {
		fontSize: 18,
		color: colors.red
	}
});

const mapStateToProps = ({ user }) => ({
	user
});

export default connect(mapStateToProps)(Login);
