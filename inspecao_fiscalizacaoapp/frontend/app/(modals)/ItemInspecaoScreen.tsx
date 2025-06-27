// app/(modals)/ItemInspecaoScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

// Tipos baseados no seu UML
type Foto = { id: number; legenda: string };
type Documento = { id: number; titulo: string };
type Irregularidade = { id: number; tipo: string };
type AcaoCorretiva = { id: number; descricao: string };
type Inspecao = { id: number; data: string; local: { nome: string } };

interface ItemInspecaoForm {
  observacao: string;
  inspecaoId: string;
  fotoId?: number;
  documentoId?: number;
  irregularidadeId?: number;
  acaoCorretivaId?: number;
}

const ItemInspecaoScreen = () => {
  const { inspecaoId } = useLocalSearchParams();
  const [form, setForm] = useState<ItemInspecaoForm>({
    observacao: "",
    inspecaoId: inspecaoId as string,
  });

  // Listas de entidades
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [irregularidades, setIrregularidades] = useState<Irregularidade[]>([]);
  const [acoesCorretivas, setAcoesCorretivas] = useState<AcaoCorretiva[]>([]);
  const [inspecao, setInspecao] = useState<Inspecao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fotosRes, docsRes, irregsRes, acoesRes, inspecaoRes] =
          await Promise.all([
            fetch("http://192.168.15.126:8000/foto/"),
            fetch("http://192.168.15.126:8000/documento/"),
            fetch("http://192.168.15.126:8000/irregularidade/"),
            fetch("http://192.168.15.126:8000/acao-corretiva/"),
            fetch(`http://192.168.15.126:8000/inspecao/${inspecaoId}/`),
          ]);

        const [fotosData, docsData, irregsData, acoesData, inspecaoData] =
          await Promise.all([
            fotosRes.json(),
            docsRes.json(),
            irregsRes.json(),
            acoesRes.json(),
            inspecaoRes.json(),
          ]);

        setFotos(fotosData);
        setDocumentos(docsData);
        setIrregularidades(irregsData);
        setAcoesCorretivas(acoesData);
        setInspecao(inspecaoData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        Alert.alert("Erro", "Falha ao carregar os dados do servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inspecaoId]);

  const handleSave = () => {
    // Lógica para salvar o item de inspeção
    console.log("Salvando item:", form);
    Alert.alert("Sucesso!", "Item de Inspeção registrado com sucesso");
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Item de Inspeção</Text>

      {inspecao && (
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Inspeção:</Text>
          <Text style={styles.infoText}>
            {inspecao.local.nome} -{" "}
            {new Date(inspecao.data).toLocaleDateString()}
          </Text>
        </View>
      )}

      <Text style={styles.label}>Observação:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o item"
        value={form.observacao}
        onChangeText={(text) => setForm({ ...form, observacao: text })}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Foto:</Text>
      <Picker
        selectedValue={form.fotoId}
        onValueChange={(itemValue) => setForm({ ...form, fotoId: itemValue })}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma foto" value={undefined} />
        {fotos.map((foto) => (
          <Picker.Item key={foto.id} label={foto.legenda} value={foto.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Documento:</Text>
      <Picker
        selectedValue={form.documentoId}
        onValueChange={(itemValue) =>
          setForm({ ...form, documentoId: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Selecione um documento" value={undefined} />
        {documentos.map((doc) => (
          <Picker.Item key={doc.id} label={doc.titulo} value={doc.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Irregularidade:</Text>
      <Picker
        selectedValue={form.irregularidadeId}
        onValueChange={(itemValue) =>
          setForm({ ...form, irregularidadeId: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma irregularidade" value={undefined} />
        {irregularidades.map((irr) => (
          <Picker.Item key={irr.id} label={irr.tipo} value={irr.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Ação Corretiva:</Text>
      <Picker
        selectedValue={form.acaoCorretivaId}
        onValueChange={(itemValue) =>
          setForm({ ...form, acaoCorretivaId: itemValue })
        }
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma ação corretiva" value={undefined} />
        {acoesCorretivas.map((acao) => (
          <Picker.Item key={acao.id} label={acao.descricao} value={acao.id} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  infoCard: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontWeight: "bold",
    color: "#1976d2",
    marginBottom: 4,
  },
  infoText: {
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 6,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top",
  },
  picker: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ItemInspecaoScreen;
