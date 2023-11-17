import React from 'react';
import {
    Image,
    View,
} from 'react-native';
import { styles } from './styles';

export function FixedHeader() {

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/header.jpeg')}
            />
        </View>
    );
}