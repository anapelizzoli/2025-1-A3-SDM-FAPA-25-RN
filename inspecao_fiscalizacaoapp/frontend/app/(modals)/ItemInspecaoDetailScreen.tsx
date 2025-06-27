import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

interface ItemInspecao {
  id: number;
  observacao: string;
  irregularidade?: {
    tipo: string;
    descricao: string;
  };
  acaoCorretiva?: {
    descricao: string;
    prazo: string;
  };
  fotos: string[];
}

const ItemInspecaoDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const [item, setItem] = useState<ItemInspecao | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemInspecao = async () => {
      try {
        // Substitua pela URL da sua API para buscar o item de inspeção
        const response = await fetch(
          `http://192.168.15.126:8000/item_inspecao/${id}/`
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do item de inspeção");
        }

        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItemInspecao();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Item</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Observação</Text>
        <Text style={styles.text}>{item.observacao}</Text>
      </View>

      {item.irregularidade && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Irregularidade</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Tipo:</Text>
            <Text style={styles.infoValue}>{item.irregularidade.tipo}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Descrição:</Text>
            <Text style={styles.infoValue}>
              {item.irregularidade.descricao}
            </Text>
          </View>
        </View>
      )}

      {item.acaoCorretiva && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Ação Corretiva</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Descrição:</Text>
            <Text style={styles.infoValue}>{item.acaoCorretiva.descricao}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Prazo:</Text>
            <Text style={styles.infoValue}>
              {new Date(item.acaoCorretiva.prazo).toLocaleDateString()}
            </Text>
          </View>
        </View>
      )}

      {item.fotos.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Fotos</Text>
          <View style={styles.photosContainer}>
            {item.fotos.map((foto, index) => (
              <Image key={index} source={{ uri: foto }} style={styles.photo} />
            ))}
          </View>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: "bold",
    width: 100,
    color: "#333",
  },
  infoValue: {
    flex: 1,
    color: "#555",
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  photo: {
    width: "48%",
    height: 150,
    marginBottom: 10,
    borderRadius: 4,
  },
});

export default ItemInspecaoDetailScreen;
