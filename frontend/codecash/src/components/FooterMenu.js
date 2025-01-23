import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FooterMenu = () => (
    <View style={styles.footer}>
        <TouchableOpacity style={styles.menuItem}>
            <Icon name="home" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Icon name="credit-card" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Cartões</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Icon name="show-chart" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Investimentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
            <Icon name="person" size={24} color="#4caf50" />
            <Text style={styles.menuText}>Perfil</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        elevation: 2,
    },
    menuItem: {
        alignItems: 'center',
    },
    menuText: {
        fontSize: 12,
        color: '#757575',
    },
});

export default FooterMenu;
