import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    saldo: {
        backgroundColor: '#4caf50',
        padding: 20,
        alignItems: 'center',
    },
    saldoText: {
        color: '#fff',
        fontSize: 16,
    },
    saldoAmount: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    acoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        margin: 20,
    },
    movimentacoes: {
        flex: 1,
        marginHorizontal: 20,
    },
    movimentacoesTitle: {
        fontSize: 18,
        marginBottom: 10,
    },
});
