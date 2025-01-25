import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Text, IconButton } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";


const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("Email é obrigatório"),
  password: yup.string().required("Senha é obrigatória"),
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email: data.email,
        password: data.password
      });

      // Navega para a HomeScreen após login bem-sucedido
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Erro de login:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  // Adicionando o botão de 'SignUp' no canto superior direito
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="account-plus"
          size={24}
          onPress={() => navigation.navigate('SignScreen')}
        />
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            style={styles.input}
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.email}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Senha"
            style={styles.input}
            secureTextEntry
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={!!errors.password}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: { marginBottom: 10 },
  button: { marginTop: 20 },
  error: { color: "red", fontSize: 12, marginBottom: 5 },
});

export default LoginScreen;
