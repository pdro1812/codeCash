import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MovimentacaoItem = ({ item }) => (
    <View style={styles.movimentacaoItem}>
        <View style={styles.movimentacaoDetalhes}>
            <Icon
                name={item.type === 'negative' ? 'arrow-downward' : 'arrow-upward'}
                size={24}
                color={item.type === 'negative' ? 'red' : 'green'}
            />
            <View>
                <Text style={styles.movimentacaoTitle}>{item.title}</Text>
                <Text style={styles.movimentacaoDate}>{item.date}</Text>
            </View>
        </View>
        <Text
            style={[
                styles.movimentacaoAmount,
                item.type === 'negative' ? styles.negative : styles.positive,
            ]}
        >
            {item.amount}
        </Text>
    </View>
);

const styles = StyleSheet.create({
    movimentacaoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    movimentacaoDetalhes: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    movimentacaoTitle: {
        fontSize: 14,
        color: '#333',
    },
    movimentacaoDate: {
        fontSize: 12,
        color: '#aaa',
    },
    movimentacaoAmount: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    negative: {
        color: 'red',
    },
    positive: {
        color: 'green',
    },
});

export default MovimentacaoItem;
