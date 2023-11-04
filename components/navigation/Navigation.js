import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function TabGroup({ userId }) {
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ color, focused, size }) => {
					let iconName;
					if (route.name === 'Profile') {
						iconName = 'user';
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
			})}>
			<Tab.Screen
				name="Profile"
				component={Profile}
				initialParams={{
					userId: userId,
				}}
			/>
		</Tab.Navigator>
	);
}

const Navigation = ({ route }) => {
	return <TabGroup userId={route.params.userId} />;
};
export default Navigation;
