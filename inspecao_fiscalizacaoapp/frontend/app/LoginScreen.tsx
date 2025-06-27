import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Link, router } from "expo-router";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Lógica de autenticação aqui
    router.replace("/(tabs)/HomeScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Button title="Entrar" onPress={handleLogin} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Não tem conta?</Text>
          <Link href="/WelcomeScreen" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Registre-se</Text>
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
    color: "#333",
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
    color: "#333",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 15,
  },
  loginText: {
    color: "#666",
  },
  loginLink: {
    color: "#007AFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
