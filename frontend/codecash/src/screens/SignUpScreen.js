import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const signUpSchema = yup.object().shape({
  cpf: yup.string().length(11, "CPF deve conter 11 dígitos").required("CPF é obrigatório"),
  name: yup.string().required("Nome é obrigatório"),
  rg: yup.string().required("RG é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  email: yup.string().email("Formato de email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .matches(/[A-Z]/, "A senha deve conter ao menos uma letra maiúscula")
    .matches(/[a-z]/, "A senha deve conter ao menos uma letra minúscula")
    .matches(/\d/, "A senha deve conter ao menos um número")
    .matches(/[@$!%*?&#]/, "A senha deve conter ao menos um caractere especial")
    .required("Senha é obrigatória"),
});

const SignUpScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data) => {
    console.log("Dados cadastrados:", data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      {["cpf", "name", "rg", "phone", "email", "password"].map((field) => (
        <Controller
          key={field}
          control={control}
          name={field}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              secureTextEntry={field === "password"}
              keyboardType={field === "phone" || field === "cpf" ? "numeric" : "default"}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors[field]}
            />
          )}
        />
      ))}

      {Object.keys(errors).map((key) => (
        <Text key={key} style={styles.error}>
          {errors[key]?.message}
        </Text>
      ))}

      <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.button}>
        Cadastrar
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

export default SignUpScreen;
