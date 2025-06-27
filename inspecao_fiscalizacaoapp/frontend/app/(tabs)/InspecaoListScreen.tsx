import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Inspecao {
  id: number;
  data: string;
  status: "pendente" | "concluída" | "cancelada";
  local: {
    nome: string;
  };
}

const InspecaoListScreen = () => {
  const [inspecoes, setInspecoes] = useState<Inspecao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInspecoes = async () => {
      try {
        const response = await fetch("http://192.168.15.126:8000/inspecao/");
        if (!response.ok) {
          throw new Error("Erro ao buscar inspeções");
        }

        const data = await response.json();
        setInspecoes(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspecoes();
  }, []);

  const renderItem = ({ item }: { item: Inspecao }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => router.push(`/(tabs)/InspecaoDetailScreen/${item.id}`)}
    >
      <View style={styles.itemInfo}>
        <Text style={styles.local}>{item.local.nome}</Text>
        <Text style={styles.date}>
          {new Date(item.data).toLocaleDateString()}
        </Text>
      </View>
      <View
        style={[
          styles.status,
          { backgroundColor: getStatusColor(item.status) },
        ]}
      >
        <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "concluída":
        return "#4CAF50";
      case "pendente":
        return "#FFC107";
      case "cancelada":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Inspeções</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
      ) : (
        <FlatList
          data={inspecoes}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma inspeção encontrada</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemInfo: {
    flex: 1,
  },
  local: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  listContent: {
    paddingBottom: 16,
  },
});

export default InspecaoListScreen;
