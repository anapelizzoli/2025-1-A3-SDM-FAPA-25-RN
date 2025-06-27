import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Link } from "expo-router";

const WelcomeScreen = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://192.168.15.126:8000/usuario/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
          tipo: "admin",
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Usuário registrado com sucesso!");
        // opcional: limpar os campos
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmarSenha("");
      } else {
        const erro = await response.json();
        console.log(erro);
        Alert.alert("Erro", "Erro ao registrar. Verifique os dados.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro de conexão com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sistema de Inspeção Fiscal</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#999"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <Button title="Registrar" onPress={handleRegister} />

        <View style={styles.loginContainer}>
          <Text>Já possui conta?</Text>
          <Link href="/LoginScreen" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Faça login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  form: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    color: "black",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 15,
  },
  loginLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default WelcomeScreen;
