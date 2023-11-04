import { useNavigation } from '@react-navigation/native';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { users } from '../../config/firebaseConfig';
import { CustomDeleteButton } from '../ui/CustomButton';
import DisplayBase64Image from '../ui/DisplayImage';

const User = ({ route }) => {
	const { item, setIsLoading } = route.params;

	const navigate = useNavigation();

	const handleProductDeleting = async (id) => {
		await users
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
			<DisplayBase64Image base64Image={item?.picture} />
			<View style={styles.productInfo}>
				<Text style={styles.productText}>Name: {item.name}</Text>
				<Text style={styles.productText}>Email: {item.email}</Text>
			</View>
			<View style={styles.buttons}>
				<CustomDeleteButton
					title="Delete"
					onPress={() => {
						handleProductDeleting(item.id);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};
export default User;

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
		justifyContent: 'center',
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
