import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Button,
	FlatList,
	Image,
} from "react-native";
import { useState, useContext } from "react";
import Context from "./Context";

export default function ForecastList() {
	const context = useContext(Context);

	const [tempCityName, setTempCityName] = useState("");
	const [cityName, setCityName] = useState("");
	const [weather, setWeather] = useState("");
	const [temp, setTemp] = useState("");
	const [wind, setWind] = useState("");
	const [iconId, setIconId] = useState("");

	const updateForecast = async () => {
		try {
			let res = await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${tempCityName}&limit=${context.GEOCODING_LIMIT}&appid=${context.API_KEY}`
			);
			let json = await res.json();
			const lat = json[0].lat;
			const lon = json[0].lon;
			setCityName(json[0].name);
			res = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${context.API_KEY}`
			);
			json = await res.json();
			setWeather(json.weather[0].description);
			setTemp(json.main.temp);
			setWind(json.wind.speed);
			setIconId(json.weather[0].icon);
			return true;
		} catch (error) {
			console.log(error);
		}
		return false;
	};

	return (
		<View style={styles.container}>
			<View style={styles.barTitle}>
				<Text style={styles.titleText}>Forecast List</Text>
			</View>
			<View style={styles.cityNameField}>
				<TextInput
					style={styles.cityInput}
					placeholder={"City"}
					onChangeText={(text) => {
						if (text === null || text.length === 0) {
							return;
						}
						try {
							const capitalize =
								text.charAt(0).toUpperCase() +
								text.slice(1).toLowerCase();
							setTempCityName(capitalize);
						} catch (error) {
							console.log(error);
						}
					}}
				></TextInput>
				<Button
					title="Submit"
					color="black"
					onPress={updateForecast}
				></Button>
			</View>
			{weather.length === 0 ? (
				<></>
			) : (
				<FlatList
					data={[
						{
							key: `City: ${cityName}\nWeather: ${weather}\nTemperature: ${temp}\nWind: ${wind}`,
						},
					]}
					renderItem={({ item }) => (
						<View>
							<Text style={styles.listItem}>{item.key}</Text>
							<Image
								style={styles.image}
								source={{
									uri: `http://openweathermap.org/img/wn/${iconId}@2x.png`,
								}}
							/>
						</View>
					)}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: "4.5%",
		marginTop: "6.5%",
		height: "100%",
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	barTitle: {
		backgroundColor: "grey",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		height: "16%",
	},
	titleText: {
		color: "white",
		fontSize: 33,
	},
	cityNameField: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-evenly",
		alignItems: "center",
		width: "100%",
		height: "10%",
		marginTop: "5%",
	},
	cityInput: {
		width: "70%",
		height: "70%",
		textAlign: "center",
		fontSize: 23,
		borderWidth: 1,
	},
	listItem: {
		fontSize: 25,
	},
	image: {
		width: 75,
		height: 75,
	},
});
