import { View, Text, TouchableOpacity } from "react-native";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useState } from "react";
import { router } from "expo-router";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    return (
        <View className="flex-1 bg-background justify-center px-6">

            {/* Logo / Nombre */}
            <View className="items-center mb-12">
                <Text className="text-4xl font-bold text-primary">
                    Rapicity
                </Text>
            </View>

            {/* Email */}
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secure
            />

            <Button
                title="Iniciar sesión"
                onPress={() => router.push("/(client)/home")}
            />

            {/* Register */}
            <TouchableOpacity onPress={() => router.push("/register")} className="mt-4">
                <Text className="text-center text-secondary font-semibold">
                    Crear cuenta
                </Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-8">
                <View className="flex-1 h-[1px] bg-gray-400" />
                <Text className="mx-4 text-gray-300">o</Text>
                <View className="flex-1 h-[1px] bg-gray-400" />
            </View>

            {/* Google login */}
            <TouchableOpacity className="bg-white py-4 rounded-xl">
                <Text className="text-center font-semibold">
                    Continuar con Google
                </Text>
            </TouchableOpacity>

        </View>
    );
}