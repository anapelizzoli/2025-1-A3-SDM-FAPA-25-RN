import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      {/* Telas de autenticação */}
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />

      {/* Telas principais (tabs) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Telas de criação de entidades */}
      <Stack.Screen
        name="LocalInspecaoScreen"
        options={{
          title: "Novo Local",
          presentation: "modal", // Faz a tela abrir como modal
        }}
      />
      <Stack.Screen
        name="FotoScreen"
        options={{
          title: "Adicionar Foto",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="DocumentoScreen"
        options={{
          title: "Adicionar Documento",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="IrregularidadeScreen"
        options={{
          title: "Adicionar Irregularidade",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="AcaoCorretivaScreen"
        options={{
          title: "Adicionar Ação Corretiva",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="ItemInspecaoScreen"
        options={{
          title: "Criar Item de Inspeção",
          presentation: "modal",
        }}
      />

      {/* Telas de detalhes */}
      <Stack.Screen
        name="InspecaoDetailScreen"
        options={{
          title: "Detalhes da Inspeção",
        }}
      />
      <Stack.Screen
        name="ItemInspecaoDetailScreen"
        options={{
          title: "Detalhes do Item",
        }}
      />
      <Stack.Screen
        name="UsuarioDetailScreen"
        options={{
          title: "Detalhes do Usuário",
        }}
      />

      {/* Telas de listagem */}
      <Stack.Screen
        name="InspecaoListScreen"
        options={{
          title: "Lista de Inspeções",
        }}
      />
    </Stack>
  );
}
