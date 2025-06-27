import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="WelcomeScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="LoginScreen"
        options={{ title: "Login", headerShown: false }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
