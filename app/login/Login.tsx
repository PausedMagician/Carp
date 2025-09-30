import { useAuth } from "@/hooks/UseAuth";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	TextInputSubmitEditingEvent,
} from "react-native";
import { TextInput } from "react-native";

import { useRef } from "react";

export default function LoginScreen() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const usernameInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const auth = useAuth();

	const login = () => {
		if (username === "") { usernameInputRef.current?.focus(); return; }
		if (password === "") { passwordInputRef.current?.focus(); return; }
		auth.login(username, password);
	};

	return (
		<View style={styles.container}>
			<Image source={require("@/assets/fish.png")} style={styles.logo} />
			<View style={styles.form}>
				<View>
					<TextInput
                        ref={usernameInputRef}
						style={styles.input}
						onChangeText={setUsername}
                        placeholder="Username..."
						onSubmitEditing={() => {passwordInputRef.current?.focus();}}
					/>
					<TextInput
                        ref={passwordInputRef}
						style={styles.input}
						onChangeText={setPassword}
						onSubmitEditing={login}
						placeholder="Password..."
                        secureTextEntry={true}
					/>
				</View>
				<TouchableOpacity
					style={[styles.input, styles.button]}
					onPress={login}>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
			</View>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignSelf: "center",
        position: "relative"
	},
    logo: {
        position: "absolute",
        bottom: "60%",
        width: 300,
        height: 300,
    },
	form: {
		display: "flex",
		justifyContent: "space-between",
		width: 300,
		height: 300,
		padding: 25,
		paddingTop: 75,
		backgroundColor: "#DDDBFF",
		borderRadius: 7,
	},
	input: {
		color: "#EAE9FC",
		backgroundColor: "#2F27CE",
		borderRadius: 7,
		marginBottom: 10,
		padding: 8,
	},
	button: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#EAE9FC",
	},
});
