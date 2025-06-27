// app/(tabs)/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Link, router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Tipos baseados no seu UML
interface Inspecao {
  id: number;
  data: string;
  status: string;
  local: {
    nome: string;
  };
}

interface MenuItem {
  id: number;
  title: string;
  icon: string;
  screen: string;
  color: string;
}

const HomeScreen = () => {
  const [userName, setUserName] = useState("");
  const [inspecoesRecentes, setInspecoesRecentes] = useState<Inspecao[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do usuário e inspeções recentes
  useEffect(() => {
    const loadUserData = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setUserName(parsedData.nome);
      }

      // Simular busca de inspeções recentes
      setTimeout(() => {
        setInspecoesRecentes([
          {
            id: 1,
            data: "2025-06-25",
            status: "Concluída",
            local: { nome: "Restaurante Central" },
          },
          {
            id: 2,
            data: "2025-06-24",
            status: "Pendente",
            local: { nome: "Mercado Municipal" },
          },
          {
            id: 3,
            data: "2025-06-23",
            status: "Concluída",
            local: { nome: "Padaria Doce Sabor" },
          },
        ]);
        setLoading(false);
      }, 1000);
    };

    loadUserData();
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Criar Local",
      icon: "add-location",
      screen: "LocalInspecaoScreen",
      color: "#4CAF50",
    },
    {
      id: 2,
      title: "Criar Inspeção",
      icon: "assignment",
      screen: "InspecaoScreen",
      color: "#2196F3",
    },
    {
      id: 3,
      title: "Adicionar Foto",
      icon: "add-a-photo",
      screen: "FotoScreen",
      color: "#FF9800",
    },
    {
      id: 4,
      title: "Adicionar Documento",
      icon: "description",
      screen: "DocumentoScreen",
      color: "#9C27B0",
    },
    {
      id: 5,
      title: "Adicionar Irregularidade",
      icon: "warning",
      screen: "IrregularidadeScreen",
      color: "#F44336",
    },
    {
      id: 6,
      title: "Adicionar Ação Corretiva",
      icon: "build",
      screen: "AcaoCorretivaScreen",
      color: "#009688",
    },
    {
      id: 7,
      title: "Criar Item de Inspeção",
      icon: "checklist",
      screen: "ItemInspecaoScreen",
      color: "#3F51B5",
    },
    {
      id: 8,
      title: "Ver Inspeções",
      icon: "list",
      screen: "InspecaoListScreen",
      color: "#607D8B",
    },
  ];

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    router.replace("/WelcomeScreen");
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <Link href={`/${item.screen}`} asChild>
      <TouchableOpacity
        style={[styles.menuItem, { backgroundColor: item.color }]}
      >
        <MaterialIcons name={item.icon as any} size={32} color="white" />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </TouchableOpacity>
    </Link>
  );

  const renderInspecaoItem = ({ item }: { item: Inspecao }) => (
    <Link href={`/InspecaoDetailScreen/${item.id}`} asChild>
      <TouchableOpacity style={styles.inspecaoItem}>
        <View style={styles.inspecaoInfo}>
          <Text style={styles.inspecaoLocal}>{item.local.nome}</Text>
          <Text style={styles.inspecaoDate}>
            {new Date(item.data).toLocaleDateString()} • {item.status}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </TouchableOpacity>
    </Link>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bem-vindo,</Text>
          <Text style={styles.userName}>{userName || "Inspetor"}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="exit-to-app" size={24} color="#F44336" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Menu de Ações Rápidas */}
      <Text style={styles.sectionTitle}>Ações Rápidas</Text>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.menuContainer}
      />

      {/* Inspeções Recentes */}
      <Text style={styles.sectionTitle}>Inspeções Recentes</Text>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2196F3" />
          <Text style={styles.loadingText}>Carregando inspeções...</Text>
        </View>
      ) : inspecoesRecentes.length > 0 ? (
        <FlatList
          data={inspecoesRecentes}
          renderItem={renderInspecaoItem}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="assignment" size={48} color="#E0E0E0" />
          <Text style={styles.emptyText}>Nenhuma inspeção recente</Text>
          <Link href="/InspecaoScreen" asChild>
            <TouchableOpacity style={styles.createButton}>
              <Text style={styles.createButtonText}>
                Criar Primeira Inspeção
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      {/* Estatísticas (opcional) */}
      <Text style={styles.sectionTitle}>Estatísticas</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Inspeções</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 18,
    color: "#666",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  logoutText: {
    color: "#F44336",
    marginLeft: 4,
    fontWeight: "500",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  menuContainer: {
    justifyContent: "space-between",
  },
  menuItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 150,
    minHeight: 100,
  },
  menuItemText: {
    color: "white",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  inspecaoItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inspecaoInfo: {
    flex: 1,
  },
  inspecaoLocal: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  inspecaoDate: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: "#666",
  },
  emptyContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  createButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  createButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2196F3",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default HomeScreen;
