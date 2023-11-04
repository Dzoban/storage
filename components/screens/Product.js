import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { products } from '../../config/firebaseConfig';
import { CustomDeleteButton } from '../ui/CustomButton';

const Product = ({ route }) => {
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
		<View>
			<Text>{JSON.stringify(item)}</Text>
			<CustomDeleteButton
				title="Delete"
				onPress={() => {
					handleProductDeleting(item.id);
				}}
			/>
		</View>
	);
};
export default Product;
