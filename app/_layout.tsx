import { Stack } from "expo-router";
import { CartProvider } from "@/src/context/CartContext";

import "../src/styles/global.css";

export default function Layout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </CartProvider>
  );
}