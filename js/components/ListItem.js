import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';

function ListItem({ title, subTitle, image }) {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={image} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.subTitle}>{subTitle}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },

    detailsContainer: {
        top: 8,
    },

    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 10,
    },

    subTitle: {
        color: colors.grey
    },

    title: {
        fontWeight: "500",
    },

})

export default ListItem;