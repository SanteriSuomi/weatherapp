import { Text, View, StyleSheet } from "react-native";

export default function Location({ barStyle, temp, wind }) {
	return (
		<View style={barStyle}>
			<View style={styles.innerBox}>
				<View>
					<Text style={styles.text}>Temperature</Text>
					<Text style={styles.text}>{`${temp}°C`}</Text>
				</View>
				<View style={styles.mid}></View>
				<View>
					<Text style={styles.text}>Wind Speed</Text>
					<Text style={styles.text}>{`${wind}m/s`}</Text>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "white",
		fontSize: 25,
	},
	innerBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	mid: {
		marginLeft: "4%",
		marginRight: "4%",
	},
});
