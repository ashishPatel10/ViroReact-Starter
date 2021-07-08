import React from 'react';
import { ImageBackground, StyleSheet, View, Image, Text } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
    return (
        <ImageBackground
            blurRadius={2}
            style={styles.background}
            source={require('./assets/background.jpg')}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('./assets/logo-red.png')} />
                <Text>A Tagline!</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <AppButton title="Login" color='primary' onPress={() => console.log('Button pressed.')}></AppButton>
                <AppButton title="Register" color='secondary' onPress={() => console.log('Button pressed.')}></AppButton>

            </View>


        </ImageBackground >


    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    buttonsContainer: {
        padding: 15,
        width: "100%",
    },

    logo: {
        width: 100,
        height: 100,
    },

    text: {
        left: 10,
    },

    logoContainer: {
        position: 'absolute',
        top: 70,
        alignItems: 'center',
    }
})

export default WelcomeScreen;