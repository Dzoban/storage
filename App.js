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

	console.log('user id from app: ', userId);

	const handleLogin = () => {
		setIsLoggedIn(true);
		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: 'Successfully login!',
		});
	};

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
								setUserId: setUserId,
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
