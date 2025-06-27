import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Telas modais */}
      <Stack.Screen
        name="modals/LocalInspecaoScreen"
        options={{
          title: "Novo Local",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/InspecaoScreen"
        options={{
          title: "Criar Inspecao",
          presentation: "modal",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="modals/FotoScreen"
        options={{
          title: "Adicionar Foto",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/DocumentoScreen"
        options={{
          title: "Adicionar Documento",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/IrregularidadeScreen"
        options={{
          title: "Adicionar Irregularidade",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/AcaoCorretivaScreen"
        options={{
          title: "Adicionar Ação Corretiva",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/ItemInspecaoScreen"
        options={{
          title: "Criar Item de Inspeção",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="modals/InspecaoDetailScreen"
        options={{
          title: "Detalhes da Inspeção",
        }}
      />
      <Stack.Screen
        name="modals/ItemInspecaoDetailScreen"
        options={{
          title: "Detalhes do Item",
        }}
      />
      <Stack.Screen
        name="modals/UsuarioDetailScreen"
        options={{
          title: "Detalhes do Usuário",
        }}
      />
    </Stack>
  );
}
