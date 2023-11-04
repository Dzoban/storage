import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Button,
	Keyboard,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { users } from '../../config/firebaseConfig';

const Login = ({ navigation, route }) => {
	const [usersData, setUsersData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAuth, setIsAuth] = useState(true);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nameReg, setNameReg] = useState('');
	const [emailReg, setEmailReg] = useState('');
	const [passwordReg, setPasswordReg] = useState('');
	const { handleLogin, setUserId } = route.params;

	const handleLoginPress = async () => {
		setIsLoading(true);
		const user = usersData.find((item) => item.email === email && item.password === password);
		console.log(user);
		if (user) {
			setIsLoading(false);
			handleLogin();
			setUserId(user.id);
			console.log('login');
		} else {
			setIsAuth(false);
			Toast.show({
				type: 'info',
				text1: 'Info',
				text2: 'Please register!',
			});
		}
	};

	const handleRegisterPress = async (name, email, password) => {
		setIsLoading(true);
		const data = {
			name: name.trim(),
			email: email.trim(),
			password: password.trim(),
			isAdmin: false,
		};
		try {
			await users
				.create(data)
				.then((res) => {
					console.log('Created');
					setNameReg('');
					setEmailReg('');
					setPasswordReg('');
					setIsLoading(false);
					Toast.show({
						type: 'success',
						text1: 'Success',
						text2: 'Successfully registered!',
					});
				})
				.catch((err) => console.log(err));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		setIsAuth(true);
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				await users
					.getAll()
					.then((res) => {
						setUsersData(res);
						setIsLoading(false);
					})
					.catch((err) => console.log(err));
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [isAuth]);

	if (isLoading) {
		return (
			<SafeAreaView style={styles.container}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			{isAuth ? (
				<SafeAreaView style={styles.container}>
					<Text>Enter email:</Text>
					<TextInput style={styles.input} placeholder="example@email.com" onChangeText={(val) => setEmail(val)} />
					<Text>Enter password:</Text>
					<TextInput
						style={styles.input}
						placeholder="******"
						onChangeText={(val) => setPassword(val)}
						secureTextEntry={true}
					/>
					<Button title="Login" onPress={handleLoginPress} />
				</SafeAreaView>
			) : (
				<SafeAreaView style={styles.container}>
					<Text>Register</Text>
					<Text>Enter name:</Text>
					<TextInput style={styles.input} placeholder="John Doe" onChangeText={(val) => setNameReg(val)} />
					<Text>Enter email:</Text>
					<TextInput style={styles.input} placeholder="example@email.com" onChangeText={(val) => setEmailReg(val)} />
					<Text>Enter password:</Text>
					<TextInput
						style={styles.input}
						placeholder="******"
						onChangeText={(val) => setPasswordReg(val)}
						secureTextEntry={true}
					/>
					<Button title="Register" onPress={() => handleRegisterPress(nameReg, emailReg, passwordReg)} />
				</SafeAreaView>
			)}
		</TouchableWithoutFeedback>
	);
};
export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		background: '#cccccc',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: '#fff',
		padding: 8,
		margin: 10,
		width: 200,
	},
});
