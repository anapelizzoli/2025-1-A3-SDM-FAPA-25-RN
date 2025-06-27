import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const FotoScreen = () => {
  const [fotoUri, setFotoUri] = useState<string | null>(null);
  const [legenda, setLegenda] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFotoUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!fotoUri) {
      alert("Por favor, selecione uma imagem.");
      return;
    }

    const formData = new FormData();
    formData.append("legenda", legenda);
    //formData.append("item_inspecao", "1"); // substitua pelo ID correto do item

    formData.append("caminho", {
      uri: fotoUri,
      name: "imagem.jpg", // ou `${new Date().getTime()}.jpg`
      type: "image/jpeg",
    });

    try {
      const response = await fetch("http://<SEU_BACKEND_URL>/foto/", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Foto salva:", data);
        router.back();
      } else {
        const errorText = await response.text();
        console.error("Erro ao salvar:", errorText);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Foto</Text>

      {fotoUri ? (
        <Image source={{ uri: fotoUri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
        </View>
      )}

      <Button title="Selecionar Imagem" onPress={pickImage} />

      <TextInput
        style={styles.input}
        placeholder="Legenda da foto"
        value={legenda}
        onChangeText={setLegenda}
        placeholderTextColor="#999"
      />

      <Button title="Salvar Foto" onPress={handleSave} />
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
  image: {
    width: "100%",
    height: 300,
    marginBottom: 20,
    resizeMode: "contain",
  },
  placeholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  placeholderText: {
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: "white",
    color: "#333",
  },
});

export default FotoScreen;
