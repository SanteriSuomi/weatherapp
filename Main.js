import { View, Button, StyleSheet } from "react-native";

export default function Main({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.buttonWrapper}>
				<Button
					title="Forecast"
					onPress={() => {
						navigation.navigate("Forecast");
					}}
				></Button>
			</View>
			<View style={styles.buttonWrapper}>
				<Button
					title="Forecast List"
					onPress={() => {
						navigation.navigate("ForecastList");
					}}
				></Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: "3%",
		display: "flex",
		flexDirection: "column",
		maxWidth: "100%",
	},
	buttonWrapper: {
		marginTop: "4%",
		maxWidth: "50%",
		marginLeft: "auto",
		marginRight: "auto",
	},
});
