import { StyleSheet, View, Button } from "react-native";
import Location from "./Location";
import Info from "./Info";

export default function Weather({
	refreshFunc,
	cityName,
	weather,
	temp,
	wind,
}) {
	return (
		<View style={styles.container}>
			<Location
				barStyle={styles.bar}
				name={cityName}
				weather={weather}
			></Location>
			<Info barStyle={styles.bar} temp={temp} wind={wind}></Info>
			<View>
				<Button onPress={refreshFunc} title="Refresh" color="black" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: "100%",
	},
	bar: {
		backgroundColor: "grey",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		height: "30%",
	},
});
