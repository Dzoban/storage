import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { products } from '../../config/firebaseConfig';
import { CustomButton, CustomButtonOutline } from '../ui/CustomButton';

const Products = ({ route }) => {
	const [productsData, setProductsData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageAddress, setStorageAddress] = useState('');

	const navigation = useNavigation();

	const addProduct = async (name, amount, location, address) => {
		setIsLoading(true);
		const data = {
			name: name.trim(),
			amount: parseInt(amount),
			storageLocation: location,
			storageAddress: address,
		};
		await products
			.create(data)
			.then((res) => {
				setIsLoading(false);
				Toast.show({
					type: 'success',
					text1: 'Success',
					text2: 'Product successfully added!',
				});
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		const fetchData = async () => {
			await products
				.getAll()
				.then((res) => {
					setProductsData(res);
					setIsLoading(false);
                    setIsModalOpen(false);
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
						<TextInput style={styles.input} placeholder="New York" onChangeText={(val) => setStorageLocation(val)} />
						<Text style={styles.text}>Product storage address:</Text>
						<TextInput
							style={styles.input}
							placeholder="Pluto way, 23f"
							onChangeText={(val) => setStorageAddress(val)}
						/>
						<View style={styles.buttons}>
							<CustomButton title="Add" onPress={() => addProduct(name, amount, storageLocation, storageAddress)} />
							<CustomButtonOutline title="Close" onPress={() => setIsModalOpen(false)} />
						</View>
					</SafeAreaView>
				</View>
			</Modal>
			<CustomButton title="Add product" onPress={() => setIsModalOpen(true)} />
			<View style={styles.divider}></View>
			<FlatList
				keyExtractor={(item) => item.id}
				data={productsData}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() => {
							navigation.navigate('Product', { item, setIsLoading });
						}}>
						<Text style={styles.itemText}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</SafeAreaView>
	);
};
export default Products;

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
	},
	itemText: {
		textAlign: 'center',
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
