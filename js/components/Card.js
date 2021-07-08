import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function Card({ title, subTitle, image }) {
    return (
        <View style={styles.card}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText>{subTitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        elevation: 2,
        overflow: 'hidden',
    },

    detailsContainer: {
        padding: 20
    },

    image: {
        width: "100%",
        height: 170,
    },

    title: {
        marginBottom: 10,
    }
})

export default Card;