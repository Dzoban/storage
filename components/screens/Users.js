import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Keyboard,
	Modal,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { users } from '../../config/firebaseConfig';
import { CustomButtonOutline } from '../ui/CustomButton';

const Users = ({ route }) => {
	const [usersData, setUsersData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageAddress, setStorageAddress] = useState('');

	const navigation = useNavigation();

	useEffect(() => {
		const fetchData = async () => {
			await users
				.getAll()
				.then((res) => {
					setUsersData(res);
					setIsLoading(false);
				})
				.catch((err) => console.log(err));
		};
		fetchData();
	}, [isLoading]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Modal visible={isModalOpen} animationType="slide">
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}>
					<View style={styles.modalContainer}>
						<SafeAreaView style={styles.modalContent}>
							<Text style={styles.text}>Product name:</Text>
							<TextInput style={styles.input} placeholder="Cup" onChangeText={(val) => setName(val)} />
							<Text style={styles.text}>Product amount:</Text>
							<TextInput
								style={styles.input}
								keyboardType="numeric"
								placeholder="77"
								onChangeText={(val) => setAmount(val)}
							/>
							<Text style={styles.text}>Product storage location:</Text>
							<TextInput
								style={styles.input}
								placeholder="New York"
								onChangeText={(val) => setStorageLocation(val)}
							/>
							<Text style={styles.text}>Product storage address:</Text>
							<TextInput
								style={styles.input}
								placeholder="Pluto way, 23f"
								onChangeText={(val) => setStorageAddress(val)}
							/>
							<View style={styles.buttons}>
								<CustomButtonOutline title="Close" onPress={() => setIsModalOpen(false)} />
							</View>
						</SafeAreaView>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<FlatList
				keyExtractor={(item) => item.id}
				data={usersData}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => {
							navigation.navigate('User', { item, setIsLoading });
						}}>
						<Text style={styles.itemText}>{item.name}</Text>
						{item?.isAdmin && <Text style={styles.admin}>Admin</Text>}
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};
export default Users;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EDEEF2',
		alignItems: 'center',
	},
	modalContainer: {
		paddingTop: 100,
		flex: 1,
		alignItems: 'center',
		width: '100%',
	},
	modalContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left',
		justifyContent: 'center',
		padding: 10,
		width: '100%',
		justifyContent: 'space-between',
		width: '100%',
	},
	buttons: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#6E83B4',
		padding: 8,
		marginVertical: 10,
		width: '100%',
	},
	item: {
		backgroundColor: '#CDDAFA',
		width: 300,
		padding: 15,
		borderRadius: 8,
		borderStyle: 'dashed',
		borderColor: '#6E83B4',
		borderWidth: 1,
		marginBottom: 10,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	admin: {
		padding: 5,
		borderWidth: 1,
		borderStyle: 'dashed',
		borderColor: '#371c57',
		borderRadius: 5,
		fontWeight: '600',
	},
	itemText: {
		textAlign: 'left',
		fontSize: 24,
	},
	divider: {
		width: '90%',
		height: 1,
		backgroundColor: '#CCCCCC',
		marginVertical: 10,
	},
	text: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'left',
	},
});
