import { StyleSheet } from 'react-native';
import { colors } from '../../theme/index'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        justifyContent: 'space-between',
        marginHorizontal: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: colors.background,
    },
    date: {
        fontSize: 20,
        color: colors.background,
    },
});