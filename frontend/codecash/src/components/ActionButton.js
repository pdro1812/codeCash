import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionButton = ({ iconName, title }) => (
    <TouchableOpacity style={styles.actionButton}>
        <Icon name={iconName} size={30} color="#4caf50" />
        <Text style={styles.actionText}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    actionButton: {
        width: '40%',
        alignItems: 'center',
        marginBottom: 15,
    },
    actionText: {
        marginTop: 10,
        fontSize: 14,
        color: '#333',
    },
});

export default ActionButton;
