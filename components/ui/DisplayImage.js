import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

function DisplayBase64Image({ base64Image }) {
	return (
		<View style={styles.container}>
			{base64Image ? <Image source={{ uri: base64Image }} style={styles.image} /> : <Text>No Image Available</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 10,
	},
});

export default DisplayBase64Image;
