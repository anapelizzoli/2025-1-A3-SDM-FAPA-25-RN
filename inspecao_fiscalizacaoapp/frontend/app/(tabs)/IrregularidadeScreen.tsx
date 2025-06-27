import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

const IrregularidadeScreen = () => {
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSave = async () => {
    if (!tipo || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const data = {
      tipo,
      descricao,
    };

    try {
      const response = await fetch("http://<SEU_BACKEND_URL>/irregularidade/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Irregularidade salva:", result);
        router.back(); // Voltar à tela anterior
      } else {
        const errorText = await response.text();
        console.error("Erro ao salvar irregularidade:", errorText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Irregularidade</Text>

      <TextInput
        style={styles.input}
        placeholder="Tipo de irregularidade"
        value={tipo}
        onChangeText={setTipo}
        placeholderTextColor="#999"
      />

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Descrição detalhada"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        placeholderTextColor="#999"
      />

      <Button title="Salvar Irregularidade" onPress={handleSave} />
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
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});

export default IrregularidadeScreen;
