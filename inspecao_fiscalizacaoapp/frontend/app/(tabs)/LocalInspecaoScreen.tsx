import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

const LocalInspecaoScreen = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState("");

  const handleSave = async () => {
    try {
      const response = await fetch("http://<SEU_BACKEND_URL>/local_inspecao/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          endereco,
          tipo,
        }),
      });

      if (!response.ok) {
        throw new Error("Falha ao salvar local");
      }

      // Quando a resposta for bem-sucedida, redireciona para a tela anterior
      router.back();
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Local de Inspeção</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do local"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo (comercial, residencial, etc.)"
        value={tipo}
        onChangeText={setTipo}
        placeholderTextColor="#999"
      />

      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "white",
    color: "#333",
  },
});

export default LocalInspecaoScreen;
