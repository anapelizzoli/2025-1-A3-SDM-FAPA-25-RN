import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";

const AcaoCorretivaScreen = () => {
  const [descricao, setDescricao] = useState("");
  const [prazo, setPrazo] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    const novaAcao = {
      descricao,
      prazo: prazo.toISOString().split("T")[0], // formato yyyy-mm-dd
    };

    try {
      const response = await fetch("http://<SEU_BACKEND_URL>/acao_corretiva/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaAcao),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Ação corretiva salva:", data);
        router.back();
      } else {
        const errorData = await response.json();
        console.error("Erro ao salvar:", errorData);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Ação Corretiva</Text>

      <TextInput
        style={[styles.input, styles.multilineInput]}
        placeholder="Descrição da ação"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
        placeholderTextColor="#999"
      />

      <Button
        title={`Prazo: ${prazo.toLocaleDateString()}`}
        onPress={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={prazo}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setPrazo(selectedDate);
            }
          }}
        />
      )}

      <Button title="Salvar Ação Corretiva" onPress={handleSave} />
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

export default AcaoCorretivaScreen;
