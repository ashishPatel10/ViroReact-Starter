import React from 'react';

import { Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

function AppText({ children, style }) {
    return (
        <Text style={[styles.text, style]}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'tomato',

        ...Platform.select({
            ios: {
                fontSize: 15,
                fontFamily: 'Avernir',
            },

            android: {
                color: colors.black,
                fontSize: 15,
                fontFamily: 'Roboto',
            }
        })
    }
})

export default AppText;