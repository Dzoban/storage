import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import Navigation from './components/navigation/Navigation';
import Login from './components/screens/Login';

const Stack = createNativeStackNavigator();

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const handleLogin = () => {
		console.log('login');
		setIsLoggedIn(true);
	};

	// const handleLogout = () => {
	// 	setIsLoggedIn(false);
	// };

	return (
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
							handleLogin: handleLogin,
						}}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
