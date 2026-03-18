import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import Input from "@/src/components/ui/Input";

export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("client");
    const [error, setError] = useState("");

    function validateForm() {

        if (!name) {
            setError("El nombre es obligatorio");
            return false;
        }

        if (!email.includes("@")) {
            setError("Email inválido");
            return false;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return false;
        }

        setError("");
        return true;
    }


    function handleRegister() {
        if (!validateForm()) return;
        console.log({
            name,
            email,
            password,
            confirmPassword,
            role
        });
    }

    return (
        <View className="flex-1 bg-background justify-center px-6">

            {/* Título */}
            <View className="items-center mb-10">
                <Image
                    source={require("@/assets/logo_transparente2.png")}
                    className="w-full h-40 mb-4"
                />
            </View>
            <View className="flex-row justify-between mb-6">

                <TouchableOpacity
                    className={`flex-1 py-3 rounded-xl mr-2 ${role === "client" ? "bg-primary" : "bg-white"
                        }`}
                    onPress={() => setRole("client")}
                >
                    <Text
                        className={`text-center font-semibold ${role === "client" ? "text-background" : "text-black"
                            }`}
                    >
                        Cliente
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 py-3 rounded-xl mr-2 ${role === "business" ? "bg-primary" : "bg-white"
                        }`}
                    onPress={() => setRole("business")}
                >
                    <Text
                        className={`text-center font-semibold ${role === "business" ? "text-background" : "text-black"
                            }`}
                    >
                        Negocio
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`flex-1 py-3 rounded-xl ${role === "delivery" ? "bg-primary" : "bg-white"
                        }`}
                    onPress={() => setRole("delivery")}
                >
                    <Text
                        className={`text-center font-semibold ${role === "delivery" ? "text-background" : "text-black"
                            }`}
                    >
                        Repartidor
                    </Text>
                </TouchableOpacity>
            </View>
            {/* Nombre */}
            <Input
                placeholder="Nombre"
                value={name}
                onChangeText={setName}
            />

            {/* Email */}
            <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />

            {/* Password */}
            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secure
            />

            {/* Confirm password */}
            <Input
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secure
            />

            {error ? (
                <Text className="text-red-500 mb-4 text-center">
                    {error}
                </Text>
            ) : null}
            
            {/* Botón registro */}
            <TouchableOpacity
                className="bg-primary py-4 rounded-xl mt-2"
                onPress={handleRegister}
            >
                <Text className="text-center font-bold text-lg text-background">
                    Crear cuenta
                </Text>
            </TouchableOpacity>

            {/* Volver a login */}
            <TouchableOpacity
                className="mt-6"
                onPress={() => router.push("/login")}
            >
                <Text className="text-center text-secondary font-semibold">
                    Ya tengo cuenta
                </Text>
            </TouchableOpacity>

        </View>
    );
}