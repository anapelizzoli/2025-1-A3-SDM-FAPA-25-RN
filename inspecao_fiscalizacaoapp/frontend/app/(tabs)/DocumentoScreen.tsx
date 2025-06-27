import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";

const DocumentoScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [documento, setDocumento] =
    useState<DocumentPicker.DocumentResult | null>(null);

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === "success") {
      setDocumento(result);
    }
  };

  const handleSave = async () => {
    if (!documento || documento.type !== "success") {
      alert("Por favor, selecione um documento válido.");
      return;
    }

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("tipo", tipo);
    formData.append("arquivo", {
      uri: documento.uri,
      name: documento.name,
      type: "application/pdf", // ou "application/octet-stream" se for genérico
    });

    try {
      const response = await fetch("http://<SEU_BACKEND_URL>/documento/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Documento salvo:", data);
        router.back();
      } else {
        const errorData = await response.text(); // ou .json() se for JSON
        console.error("Erro ao salvar:", errorData);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Documento</Text>

      <Button
        title={documento ? documento.name : "Selecionar Documento"}
        onPress={pickDocument}
      />

      <TextInput
        style={styles.input}
        placeholder="Título do documento"
        value={titulo}
        onChangeText={setTitulo}
        placeholderTextColor="#999"
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo (relatório, laudo, etc.)"
        value={tipo}
        onChangeText={setTipo}
        placeholderTextColor="#999"
      />

      <Button title="Salvar Documento" onPress={handleSave} />
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

export default DocumentoScreen;
