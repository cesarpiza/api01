import React from 'react';
import {
    Text,
    View
} from 'react-native';
import { styles } from './styles';

export default function Item(props) {

    const {
        name,
        episode,
        air_date
    } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {name} - {episode}
            </Text>
            <Text style={styles.date}>
                {air_date}
            </Text>
        </View>
    );
}