import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Product from '../screens/Product';
import Products from '../screens/Products';
import Profile from '../screens/Profile';
import Users from '../screens/Users';
import User from '../screens/User';

const Stack = createNativeStackNavigator();
const StackUsers = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackGroup() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Products" component={Products} />
			<Stack.Screen name="Product" component={Product} />
		</Stack.Navigator>
	);
}
function StackGroupUsers() {
	return (
		<StackUsers.Navigator>
			<StackUsers.Screen name="Users" component={Users} />
			<StackUsers.Screen name="User" component={User} />
		</StackUsers.Navigator>
	);
}

function TabGroup({ userId, setIsLoggedIn, isAdmin }) {
	if (isAdmin) {
		return (
			<Tab.Navigator
				screenOptions={({ route, navigation }) => ({
					tabBarIcon: ({ color, focused, size }) => {
						let iconName;
						if (route.name === 'Profile') {
							iconName = focused ? 'user-alt' : 'user';
						}
						if (route.name === 'StackGroup') {
							iconName = 'box';
						}
						if (route.name === 'StackGroupUsers') {
							iconName = 'users';
						}
						return <FontAwesome5 name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: '#6E83B4',
					tabBarInactiveTintColor: '#A4A7AE',
				})}>
				<Tab.Screen
					name="Profile"
					component={Profile}
					initialParams={{
						userId: userId,
						setIsLoggedIn: setIsLoggedIn,
					}}
				/>
				<Tab.Screen name="StackGroup" component={StackGroup} options={{ headerShown: false, tabBarLabel: 'Products' }} />
				<Tab.Screen
					name="StackGroupUsers"
					component={StackGroupUsers}
					options={{ headerShown: false, tabBarLabel: 'Users' }}
				/>
			</Tab.Navigator>
		);
	}
	return (
		<Tab.Navigator
			screenOptions={({ route, navigation }) => ({
				tabBarIcon: ({ color, focused, size }) => {
					let iconName;
					if (route.name === 'Profile') {
						iconName = focused ? 'user-alt' : 'user';
					}
					if (route.name === 'StackGroup') {
						iconName = 'box';
					}
					if (route.name === 'Users') {
						iconName = 'users';
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
				tabBarActiveTintColor: '#6E83B4',
				tabBarInactiveTintColor: '#A4A7AE',
			})}>
			<Tab.Screen
				name="Profile"
				component={Profile}
				initialParams={{
					userId: userId,
					setIsLoggedIn: setIsLoggedIn,
				}}
			/>
			<Tab.Screen name="StackGroup" component={StackGroup} options={{ headerShown: false, tabBarLabel: 'Products' }} />
		</Tab.Navigator>
	);
}

const Navigation = ({ route }) => {
	return <TabGroup userId={route.params.userId} setIsLoggedIn={route.params.setIsLoggedIn} isAdmin={route.params.isAdmin} />;
};
export default Navigation;
