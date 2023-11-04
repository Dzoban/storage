import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

function TabGroup() {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Profile" component={Profile} />
		</Tab.Navigator>
	);
}

const Navigation = () => {
	return <TabGroup />;
};
export default Navigation;
