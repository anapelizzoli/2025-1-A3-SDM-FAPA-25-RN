// app/index.tsx

/* 
 import { Redirect } from "expo-router";
import { isAuthenticated } from "../services/auth";

export default async function Index() {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    return <Redirect href="/(tabs)/HomeScreen" />;
  } else {
    return <Redirect href="/(tabs)WelcomeScreen" />;
  }
}
 */
import { Redirect } from "expo-router";
export default async function Index() {
  return <Redirect href="/(tabs)/HomeScreen" />;
}
