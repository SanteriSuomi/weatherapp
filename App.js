import "react-native-gesture-handler";
import React from "react";
import Main from "./Main";
import ForecastList from "./ForecastList";
import Forecast from "./Forecast";
import Context from "./Context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function App() {
	return (
		<Context.Provider
			value={{
				API_KEY: "0e454711c650626c44105f8aa9d4942f",
				GEOCODING_LIMIT: 1,
			}}
		>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Main">
					<Stack.Screen
						name="Main"
						title="Main"
						component={Main}
					></Stack.Screen>
					<Stack.Screen
						name="Forecast"
						title="Forecast"
						component={Forecast}
					></Stack.Screen>
					<Stack.Screen
						name="ForecastList"
						title="ForecastList"
						component={ForecastList}
					></Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>
		</Context.Provider>
	);
}
