import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

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
  const [userName, setUserName] = useState("Inspetor");
  const [inspecoesRecentes, setInspecoesRecentes] = useState<Inspecao[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular carregamento de dados
  useEffect(() => {
    const timer = setTimeout(() => {
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

    return () => clearTimeout(timer);
  }, []);

  // Menu com cores baseadas no diagrama
  const menuItems: MenuItem[] = [
    {
      id: 1,
      title: "Criar Local",
      icon: "add-location",
      screen: "LocalInspecaoScreen",
      color: "#E1BEE7",
    },
    {
      id: 2,
      title: "Criar Inspeção",
      icon: "assignment",
      screen: "InspecaoScreen",
      color: "#BBDEFB",
    },
    {
      id: 3,
      title: "Adicionar Foto",
      icon: "add-a-photo",
      screen: "FotoScreen",
      color: "#E1BEE7",
    },
    {
      id: 4,
      title: "Adicionar Documento",
      icon: "description",
      screen: "DocumentoScreen",
      color: "#E1BEE7",
    },
    {
      id: 5,
      title: "Adicionar Irregularidade",
      icon: "warning",
      screen: "IrregularidadeScreen",
      color: "#E1BEE7",
    },
    {
      id: 6,
      title: "Adicionar Ação Corretiva",
      icon: "build",
      screen: "AcaoCorretivaScreen",
      color: "#E1BEE7",
    },
    {
      id: 7,
      title: "Criar Item de Inspeção",
      icon: "checklist",
      screen: "ItemInspecaoScreen",
      color: "#BBDEFB",
    },
    {
      id: 8,
      title: "Ver Inspeções",
      icon: "list",
      screen: "InspecaoListScreen",
      color: "#BBDEFB",
    },
  ];

  const handleLogout = () => {
    router.replace("/WelcomeScreen");
  };

  const handleNavigate = (screen: string) => {
    router.push(`/(tabs)/${screen}`);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <TouchableOpacity
      style={[
        styles.menuItem,
        { backgroundColor: item.color, borderColor: "#7B1FA2" },
      ]}
      onPress={() => handleNavigate(item.screen)}
    >
      <MaterialIcons name={item.icon as any} size={32} color="#333" />
      <Text style={styles.menuItemText}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderInspecaoItem = ({ item }: { item: Inspecao }) => (
    <TouchableOpacity
      style={[
        styles.inspecaoItem,
        { backgroundColor: "#BBDEFB", borderColor: "#2196F3" },
      ]}
      onPress={() => router.push(`/(tabs)/InspecaoDetailScreen/${item.id}`)}
    >
      <View style={styles.inspecaoInfo}>
        <Text style={styles.inspecaoLocal}>{item.local.nome}</Text>
        <Text style={styles.inspecaoDate}>
          {new Date(item.data).toLocaleDateString()} • {item.status}
        </Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#2196F3" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View
        style={[
          styles.header,
          { backgroundColor: "#C8E6C9", borderColor: "#4CAF50" },
        ]}
      >
        <View>
          <Text style={styles.greeting}>Bem-vindo,</Text>
          <Text style={styles.userName}>{userName}</Text>
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
        <View
          style={[
            styles.emptyContainer,
            { backgroundColor: "#BBDEFB", borderColor: "#2196F3" },
          ]}
        >
          <MaterialIcons name="assignment" size={48} color="#2196F3" />
          <Text style={styles.emptyText}>Nenhuma inspeção recente</Text>
          <TouchableOpacity
            style={[styles.createButton, { backgroundColor: "#2196F3" }]}
            onPress={() => handleNavigate("InspecaoScreen")}
          >
            <Text style={styles.createButtonText}>Criar Primeira Inspeção</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Estatísticas */}
      <Text style={styles.sectionTitle}>Estatísticas</Text>
      <View style={styles.statsContainer}>
        <View
          style={[
            styles.statCard,
            { backgroundColor: "#BBDEFB", borderColor: "#2196F3" },
          ]}
        >
          <Text style={[styles.statNumber, { color: "#2196F3" }]}>12</Text>
          <Text style={styles.statLabel}>Inspeções</Text>
        </View>
        <View
          style={[
            styles.statCard,
            { backgroundColor: "#BBDEFB", borderColor: "#2196F3" },
          ]}
        >
          <Text style={[styles.statNumber, { color: "#2196F3" }]}>8</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
        <View
          style={[
            styles.statCard,
            { backgroundColor: "#BBDEFB", borderColor: "#2196F3" },
          ]}
        >
          <Text style={[styles.statNumber, { color: "#2196F3" }]}>4</Text>
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
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  greeting: {
    fontSize: 18,
    color: "#388E3C",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#388E3C",
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
    borderWidth: 2,
  },
  menuItemText: {
    color: "#333",
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  inspecaoItem: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
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
  loadingContainer: {
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    marginTop: 16,
    color: "#666",
  },
  emptyContainer: {
    borderRadius: 12,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  emptyText: {
    fontSize: 16,
    color: "#333",
    marginTop: 16,
    textAlign: "center",
  },
  createButton: {
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
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});

export default HomeScreen;
