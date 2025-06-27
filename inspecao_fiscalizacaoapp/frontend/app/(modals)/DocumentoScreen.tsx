import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

interface Inspecao {
  id: number;
  data: string;
  local: { nome: string };
}

const DocumentoScreen = () => {
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [documento, setDocumento] = useState<{
    uri: string;
    name: string;
    mimeType?: string;
  } | null>(null);

  // estado para as inspeções
  const [inspecoes, setInspecoes] = useState<Inspecao[]>([]);
  const [inspecaoSelecionada, setInspecaoSelecionada] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspecoes = async () => {
      try {
        const resp = await fetch("http://192.168.15.126:8000/inspecao/");
        const data: Inspecao[] = await resp.json();
        setInspecoes(data);
        // define uma inspeção padrão (por ex. a primeira)
        if (data.length) setInspecaoSelecionada(data[0].id);
      } catch (e) {
        console.error("Erro ao buscar inspeções:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchInspecoes();
  }, []);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
    if (result.type === "success") setDocumento(result);
  };

  const handleSave = async () => {
    if (!documento || documento.type !== "success") {
      Alert.alert("Selecione um documento");
      return;
    }
    if (inspecaoSelecionada === null) {
      Alert.alert("Selecione uma inspeção");
      return;
    }

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("tipo", tipo);
    formData.append("inspecao", String(inspecaoSelecionada));
    formData.append("arquivo", {
      uri: documento.uri,
      name: documento.name,
      type: "application/pdf",
    } as any);

    try {
      const response = await fetch("http://192.168.15.126:8000/documento/", {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });
      if (response.ok) {
        Alert.alert("Sucesso", "Documento registrado!");
        router.back();
      } else {
        const err = await response.text();
        console.error(err);
        Alert.alert("Erro", "Não foi possível salvar.");
      }
    } catch (e) {
      console.error("Falha na requisição:", e);
      Alert.alert("Erro de rede");
    }
  };

  if (loading) {
    return <Text>Carregando inspeções...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Documento</Text>

      <Picker
        selectedValue={inspecaoSelecionada}
        onValueChange={(val) => setInspecaoSelecionada(val)}
        style={styles.picker}
      >
        {inspecoes.map((ins) => (
          <Picker.Item
            key={ins.id}
            label={`${ins.local.nome} — ${new Date(
              ins.data
            ).toLocaleDateString()}`}
            value={ins.id}
          />
        ))}
      </Picker>

      <Button
        title={documento ? documento.name : "Selecionar Documento"}
        onPress={pickDocument}
      />

      <TextInput
        style={styles.input}
        placeholder="Título"
        placeholderTextColor={"#999"}
        value={titulo}
        onChangeText={setTitulo}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo"
        placeholderTextColor={"#999"}
        value={tipo}
        onChangeText={setTipo}
      />

      <Button title="Salvar Documento" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  picker: { marginBottom: 15, backgroundColor: "white" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: "white",
  },
});

export default DocumentoScreen;
