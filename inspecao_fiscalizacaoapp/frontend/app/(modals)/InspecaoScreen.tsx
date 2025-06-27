// Instalação necessária:
// yarn add react-native-picker-select

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { router } from "expo-router";

const InspecaoCreateScreen = () => {
  const [data, setData] = useState(new Date());
  const [status, setStatus] = useState<string | null>("pendente");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [localId, setLocalId] = useState<number | null>(null);

  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [locais, setLocais] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [uRes, lRes] = await Promise.all([
          fetch("http://192.168.15.126:8000/usuario/"),
          fetch("http://192.168.15.126:8000/local_inspecao/"),
        ]);
        const [uData, lData] = await Promise.all([uRes.json(), lRes.json()]);
        setUsuarios(uData);
        setLocais(lData);
      } catch (err) {
        Alert.alert("Erro", "Falha ao carregar dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    if (!usuarioId || !localId) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://192.168.15.126:8000/inspecao/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: data.toISOString().split("T")[0],
          status,
          usuario: usuarioId,
          local: localId,
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Inspeção criada!");
        router.back();
      } else {
        const erro = await response.text();
        console.error("Erro backend:", erro);
        Alert.alert("Erro", "Falha ao criar inspeção.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Erro ao conectar ao servidor.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  // Helpers para o RNPickerSelect
  const statusItems = [
    { label: "Pendente", value: "pendente" },
    { label: "Concluída", value: "concluida" },
    { label: "Em Andamento", value: "em_andamento" },
  ];
  const usuarioItems = usuarios.map((u) => ({
    label: u.nome,
    value: u.id,
  }));
  const localItems = locais.map((l) => ({
    label: l.nome,
    value: l.id,
  }));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Nova Inspeção</Text>

      <Text style={styles.label}>Data:</Text>
      <DateTimePicker
        value={data}
        mode="date"
        display="default"
        onChange={(_, d) => d && setData(d)}
        style={styles.datePicker}
      />

      <Text style={styles.label}>Status:</Text>
      <RNPickerSelect
        onValueChange={(v) => setStatus(v)}
        items={statusItems}
        placeholder={{ label: "Selecione um status", value: null }}
        value={status}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />

      <Text style={styles.label}>Usuário:</Text>
      <RNPickerSelect
        onValueChange={(v) => setUsuarioId(v)}
        items={usuarioItems}
        placeholder={{ label: "Selecione um usuário", value: null }}
        value={usuarioId}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />

      <Text style={styles.label}>Local de Inspeção:</Text>
      <RNPickerSelect
        onValueChange={(v) => setLocalId(v)}
        items={localItems}
        placeholder={{ label: "Selecione um local", value: null }}
        value={localId}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Inspeção</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#333",
    marginBottom: 12,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    color: "#333",
    marginBottom: 12,
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  contentContainer: { padding: 20 },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    color: "#333",
    fontWeight: "500",
  },
  datePicker: {
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default InspecaoCreateScreen;
