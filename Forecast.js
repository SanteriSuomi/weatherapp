import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import Weather from "./Weather";
import { useState, useContext } from "react";
import Context from "./Context";
import * as Location from "expo-location";

export default function Forecast() {
	const context = useContext(Context);

	const [tempCityName, setTempCityName] = useState("");
	const [cityName, setCityName] = useState("");
	const [weather, setWeather] = useState("");
	const [temp, setTemp] = useState("");
	const [wind, setWind] = useState("");

	const updateForecastWithCity = async () => {
		try {
			let res = await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${tempCityName}&limit=${context.GEOCODING_LIMIT}&appid=${context.API_KEY}`
			);
			let json = await res.json();
			setTempCityName(json.fi);
			const lat = json[0].lat;
			const lon = json[0].lon;
			await updateForecast(lat, lon);
		} catch (error) {
			console.log(error);
		}
	};

	const updateForecastWithGPS = async () => {
		try {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}
			let loc = await Location.getCurrentPositionAsync({});
			await updateForecast(loc.coords.latitude, loc.coords.longitude);
		} catch (error) {
			console.log(error);
		}
	};

	const updateForecast = async (lat, lon) => {
		try {
			let res = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${context.API_KEY}`
			);
			let json = await res.json();
			setCityName(json.name);
			setWeather(json.weather[0]);
			setTemp(json.main.temp);
			setWind(json.wind.speed);
			return true;
		} catch (error) {
			console.log(error);
		}
		return false;
	};

	return (
		<View style={styles.container}>
			<View style={styles.barTitle}>
				<Text style={styles.titleText}>Forecast</Text>
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
					onPress={async () => {
						let res = await updateForecastWithCity();
						if (res) {
							setCityName(tempCityName);
						}
					}}
				></Button>
				<Button
					title="Use GPS"
					color="black"
					onPress={async () => {
						await updateForecastWithGPS();
					}}
				></Button>
			</View>
			<Weather
				refreshFunc={updateForecast}
				cityName={cityName}
				weather={weather}
				temp={temp}
				wind={wind}
			></Weather>
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
		justifyContent: "center",
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
		width: "50%",
		height: "70%",
		textAlign: "center",
		fontSize: 23,
		borderWidth: 1,
	},
});
