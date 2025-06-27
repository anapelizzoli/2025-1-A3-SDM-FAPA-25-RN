import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Inspecao {
  id: number;
  data: string;
  status: string;
  local: {
    nome: string;
    endereco: string;
    tipo: string;
  };
  usuario: {
    nome: string;
    email: string;
  };
  itens: {
    id: number;
    observacao: string;
  }[];
}

const InspecaoDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [inspecao, setInspecao] = useState<Inspecao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspecao = async () => {
      try {
        const response = await fetch(
          `http://192.168.15.126:8000/inspecao/${id}/`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar inspeção");
        }

        const data = await response.json();
        setInspecao(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspecao();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  if (!inspecao) {
    return (
      <View style={styles.container}>
        <Text>Inspeção não encontrada</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes da Inspeção</Text>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Informações Básicas</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="place" size={20} color="#3F51B5" />
          <Text style={styles.infoText}>{inspecao.local.nome}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={20} color="#3F51B5" />
          <Text style={styles.infoText}>{inspecao.local.endereco}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="category" size={20} color="#3F51B5" />
          <Text style={styles.infoText}>{inspecao.local.tipo}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="date-range" size={20} color="#3F51B5" />
          <Text style={styles.infoText}>
            {new Date(inspecao.data).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={20} color="#3F51B5" />
          <Text style={styles.infoText}>{inspecao.usuario.nome}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={20} color="#3F51B5" />
          <Text style={styles.infoText}>{inspecao.usuario.email}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Itens da Inspeção</Text>
        </View>
        {inspecao.itens.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() =>
              router.push(`/(tabs)/ItemInspecaoDetailScreen/${item.id}`)
            }
          >
            <Text style={styles.itemText}>{item.observacao}</Text>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>
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
    marginBottom: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#555",
    flex: 1,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f9f9f9",
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
});

export default InspecaoDetailScreen;
