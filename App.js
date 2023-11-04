import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Navigation from './components/navigation/Navigation';
import Login from './components/screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserId] = useState('');

	return (
		<>
			<NavigationContainer>
				<Stack.Navigator>
					{isLoggedIn ? (
						<>
							<Stack.Screen
								name="Navigation"
								component={Navigation}
								options={{
									headerShown: false,
								}}
								initialParams={{
									userId: userId,
									setIsLoggedIn: setIsLoggedIn,
								}}
							/>
						</>
					) : (
						<Stack.Screen
							name="Login"
							component={Login}
							options={{
								headerShown: false,
							}}
							initialParams={{
								setUserId: setUserId,
								setIsLoggedIn: setIsLoggedIn,
							}}
						/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
			<Toast />
		</>
	);
};

export default App;
