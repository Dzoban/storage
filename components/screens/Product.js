import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Keyboard, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { products } from '../../config/firebaseConfig';
import { CustomButton, CustomButtonOutline, CustomDeleteButton } from '../ui/CustomButton';
import DisplayBase64Image from '../ui/DisplayImage';

const Product = ({ route }) => {
	const { item, setIsLoading } = route.params;

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [name, setName] = useState(item.name);
	const [amount, setAmount] = useState(String(item.amount));
	const [storageLocation, setStorageLocation] = useState(item.storageLocation);
	const [storageAddress, setStorageAddress] = useState(item.storageAddress);
	const [image, setImage] = useState(item.picture);

	const navigate = useNavigation();

	const editProduct = async (id, name, amount, location, address, picture) => {
		const data = {
			id,
			name: name.trim(),
			amount: parseInt(amount),
			storageLocation: location.trim(),
			storageAddress: address.trim(),
			picture: picture,
		};
		if (name.trim() === '' || amount.trim() === '' || location.trim() === '' || address.trim() === '') {
			setIsModalOpen(false);
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Please fill all inputs!',
			});
		} else {
			setIsModalOpen(false);
			setIsLoading(true);

			await products
				.update(data)
				.then((res) => {
					setIsLoading(false);
					navigate.goBack();
					Toast.show({
						type: 'success',
						text1: `${item.name}`,
						text2: 'Product successfully updated!',
					});
				})
				.catch((err) => console.log(err));
		}
	};

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

	const openImagePicker = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== 'granted') {
			console.log('Дозвіл на доступ до медіатеки не надано');
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			quality: 1,
		});

		if (!result.cancelled) {
			if (result.uri) {
				const localUri = result.uri;

				// Resize and compress the image using ImageManipulator
				const manipulatedImage = await ImageManipulator.manipulateAsync(localUri, [{ resize: { width: 600 } }], {
					compress: 0.8, // You can adjust the compression quality as needed
					format: ImageManipulator.SaveFormat.JPEG,
					base64: true, // Convert the image to base64
				});

				if (manipulatedImage.base64) {
					setImage(`data:image/jpeg;base64,${manipulatedImage.base64}`);
				} else {
					console.log('Не вдалося отримати base64 обраного зображення.');
				}
			} else {
				console.log('Не вдалося отримати URI обраного зображення.');
			}
		}
	};

	return (
		<SafeAreaView>
			<Modal visible={isModalOpen} animationType="slide">
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}>
					<View style={styles.modalContainer}>
						<SafeAreaView style={styles.modalContent}>
							<Text style={styles.text}>Product name:</Text>
							<TextInput value={name} style={styles.input} placeholder="Cup" onChangeText={(val) => setName(val)} />
							<Text style={styles.text}>Product amount:</Text>
							<TextInput
								value={String(amount)}
								style={styles.input}
								keyboardType="numeric"
								placeholder="77"
								onChangeText={(val) => setAmount(val)}
							/>
							<Text style={styles.text}>Product storage location:</Text>
							<TextInput
								value={storageLocation}
								style={styles.input}
								placeholder="New York"
								onChangeText={(val) => setStorageLocation(val)}
							/>
							<Text style={styles.text}>Product storage address:</Text>
							<TextInput
								value={storageAddress}
								style={styles.input}
								placeholder="Pluto way, 23f"
								onChangeText={(val) => setStorageAddress(val)}
							/>
							<View style={styles.preview}>
								<CustomButtonOutline title="Choose Image" onPress={openImagePicker} />
								<DisplayBase64Image base64Image={image} />
							</View>
							<View style={styles.buttons}>
								<CustomButton
									title="Edit"
									onPress={() => editProduct(item.id, name, amount, storageLocation, storageAddress, image)}
								/>
								<CustomButtonOutline title="Close" onPress={() => setIsModalOpen(false)} />
							</View>
						</SafeAreaView>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
			<DisplayBase64Image base64Image={item?.picture} />
			<View style={styles.productInfo}>
				<Text style={styles.productText}>Name: {item.name}</Text>
				<Text style={styles.productText}>Amount: {item.amount}</Text>
				<Text style={styles.productText}>Storage location: {item.storageLocation}</Text>
				<Text style={styles.productText}>Storage address: {item.storageAddress}</Text>
			</View>
			<View style={styles.buttons}>
				<CustomDeleteButton
					title="Delete"
					onPress={() => {
						handleProductDeleting(item.id);
					}}
				/>
				<CustomButton title="Edit product" onPress={() => setIsModalOpen(true)} />
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
		justifyContent: 'space-between',
		width: '100%',
	},
	preview: {
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	productInfo: {
		paddingHorizontal: 30,
		display: 'flex',
		flexDirection: 'column',
		gap: 10,
	},
	productText: {
		fontSize: 20,
		fontWeight: '600',
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
