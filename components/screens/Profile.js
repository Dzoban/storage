import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../../config/firebaseConfig';

const Profile = ({ route }) => {
	const [userData, setUserData] = useState(null);

	const { userId, setIsLoggedIn } = route.params;

	useEffect(() => {
		const fetchData = async (userId) => {
			await users
				.getById(userId)
				.then((res) => setUserData(res))
				.catch((err) => console.log(err));
		};
		fetchData(userId);
	}, [userId]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.userBox}>
				<FontAwesome name="user-circle-o" size={60} color="black" />
				<Text style={styles.name}>{userData?.name}</Text>
				<Text>{userData?.email}</Text>
				{userData?.isAdmin && <Text style={styles.admin}>Admin</Text>}
				<Button title="Logout" onPress={() => setIsLoggedIn(false)} />
			</View>
		</SafeAreaView>
	);
};
export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		background: '#cccccc',
		alignItems: 'center',
	},
	userBox: {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		alignItems: 'center',
	},
	name: {
		fontSize: 30,
		fontWeight: '700',
	},
	admin: {
		padding: 5,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#bbb',
		borderRadius: 5,
	},
});
