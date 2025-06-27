import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  inspecoes: {
    id: number;
    data: string;
    local: string;
  }[];
}

const UsuarioDetailScreen = () => {
  const { id } = useLocalSearchParams(); // Obtendo o id da URL
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(
          `http://192.168.15.126:8000/usuario/${id}`
        );
        if (!response.ok) {
          throw new Error("Erro ao carregar os dados do usuário");
        }
        const data = await response.json();
        setUsuario(data); // Atualizando o estado com os dados do usuário
        setLoading(false);
      } catch (error) {
        console.error("Erro:", error);
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Usuário</Text>

      <View style={styles.card}>
        <View style={styles.infoRow}>
          <MaterialIcons name="person" size={24} color="#3F51B5" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{usuario.nome}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="email" size={24} color="#3F51B5" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{usuario.email}</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <MaterialIcons name="work" size={24} color="#3F51B5" />
          <View style={styles.infoText}>
            <Text style={styles.label}>Tipo</Text>
            <Text style={styles.value}>{usuario.tipo}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Inspeções Realizadas</Text>
      {usuario.inspecoes.length > 0 ? (
        usuario.inspecoes.map((inspecao) => (
          <TouchableOpacity
            key={inspecao.id}
            style={styles.inspecaoItem}
            onPress={() =>
              router.push(`/(tabs)/InspecaoDetailScreen/${inspecao.id}`)
            }
          >
            <View style={styles.inspecaoInfo}>
              <Text style={styles.inspecaoLocal}>{inspecao.local}</Text>
              <Text style={styles.inspecaoDate}>
                {new Date(inspecao.data).toLocaleDateString()}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#666" />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhuma inspeção encontrada</Text>
        </View>
      )}
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
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoText: {
    marginLeft: 16,
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  inspecaoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inspecaoInfo: {
    flex: 1,
  },
  inspecaoLocal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  inspecaoDate: {
    fontSize: 14,
    color: "#666",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
});

export default UsuarioDetailScreen;
