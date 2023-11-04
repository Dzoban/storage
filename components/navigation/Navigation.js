import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function TabGroup({ userId, setIsLoggedIn }) {
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ color, focused, size }) => {
					let iconName;
					if (route.name === 'Profile') {
						iconName = focused ? 'user-alt' : 'user';
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
			})}>
			<Tab.Screen
				name="Profile"
				component={Profile}
				initialParams={{
					userId: userId,
					setIsLoggedIn: setIsLoggedIn,
				}}
			/>
		</Tab.Navigator>
	);
}

const Navigation = ({ route }) => {
	return <TabGroup userId={route.params.userId} setIsLoggedIn={route.params.setIsLoggedIn} />;
};
export default Navigation;
