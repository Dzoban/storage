import { useNavigation } from '@react-navigation/native';
import { Modal, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { products } from '../../config/firebaseConfig';
import { CustomButton, CustomButtonOutline, CustomDeleteButton } from '../ui/CustomButton';
import { useState } from 'react';

const Product = ({ route }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [storageLocation, setStorageLocation] = useState('');
	const [storageAddress, setStorageAddress] = useState('');

	const { item, setIsLoading } = route.params;

	const navigate = useNavigation();

	const handleProductDeleting = async (id) => {
		await products
			.delete(id)
			.then((res) => {
				console.log(res);
				navigate.goBack();
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	};

	return (
		<SafeAreaView>
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
			<Text>{JSON.stringify(item)}</Text>
			<View style={styles.buttons}>
				<CustomDeleteButton
					title="Delete"
					onPress={() => {
						handleProductDeleting(item.id);
					}}
				/>
				<CustomButton title="Edit product" onPress={() => addProduct(name, amount, storageLocation, storageAddress)} />
			</View>
		</SafeAreaView>
	);
};
export default Product;

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
