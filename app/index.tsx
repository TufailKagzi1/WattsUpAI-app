import { Redirect } from "expo-router";
import '../global.css';
import { useAuth } from "@/features/auth/selectors/useAuth";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/(tabs)/Dashboard"} />
  }

  return <Redirect href={"/(auth)/Login"} />
};
