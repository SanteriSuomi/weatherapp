import { Text, View, Image, StyleSheet } from "react-native";

export default function Location({ barStyle, name, weather }) {
	return (
		<View style={barStyle}>
			<View style={styles.innerBox}>
				<Text style={styles.text}>{name}</Text>
				<View style={styles.mid}></View>
				<Image
					style={styles.image}
					source={{
						uri: `http://openweathermap.org/img/wn/${weather.icon}@2x.png`,
					}}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: "white",
		fontSize: 30,
	},
	innerBox: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: 75,
		height: 75,
	},
	mid: {
		marginLeft: "6%",
		marginRight: "6%",
	},
});
