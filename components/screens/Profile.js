import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../../config/firebaseConfig';

const Profile = ({ route }) => {
	const [userData, setUserData] = useState(null);
	const { userId } = route.params;

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
				<Text style={styles.email}>{userData?.email}</Text>
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
	email: {},
});
