import { StyleSheet, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Profile = () => {
  return (
		<SafeAreaView style={styles.container}>
			<Text>Profile</Text>
		</SafeAreaView>
  );
}
export default Profile

const styles = StyleSheet.create({
	container: {
		flex: 1,
		background: '#cccccc',
		alignItems: 'center',
		justifyContent: 'center',
	},
});