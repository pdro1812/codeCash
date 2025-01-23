import React from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../styles/styles';
import ActionButton from '../components/ActionButton';
import MovimentacaoItem from '../components/MovimentacaoItem';
import FooterMenu from '../components/FooterMenu';

const movimentacoes = [
    {
        id: '1',
        title: 'Pagamento de Boleto',
        date: '10/01/2025',
        amount: '-R$ 150,00',
        type: 'negative',
    },
    {
        id: '2',
        title: 'Transferência Recebida',
        date: '09/01/2025',
        amount: '+R$ 200,00',
        type: 'positive',
    },
];

const HomeScreen = () => (
    <View style={styles.container}>
        {/* Saldo */}
        <View style={styles.saldo}>
            <Text style={styles.saldoText}>Olá, Pedro!</Text>
            <Text style={styles.saldoAmount}>R$ 1.250,00</Text>
        </View>

        {/* Ações Rápidas */}
        <View style={styles.acoes}>
            <ActionButton iconName="send" title="Transferir" />
            <ActionButton iconName="payment" title="Pagar" />
            <ActionButton iconName="account-balance-wallet" title="Depositar" />
            <ActionButton iconName="description" title="Extrato" />
        </View>

        {/* Movimentações Recentes */}
        <View style={styles.movimentacoes}>
            <Text style={styles.movimentacoesTitle}>Movimentações Recentes</Text>
            <FlatList
                data={movimentacoes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <MovimentacaoItem item={item} />}
            />
        </View>

        {/* Menu Inferior */}
        <FooterMenu />
    </View>
);

export default HomeScreen;
