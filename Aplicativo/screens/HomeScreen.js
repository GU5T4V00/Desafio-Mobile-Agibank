// screens/HomeScreen.js
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";



export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(false); // controla o olho
  const balance = 1000; // valor fixo

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Gustavo!</Text>
            <Text style={styles.balanceLabel}>Saldo em conta</Text>

            {/* saldo + botão olho */}
            <View style={styles.balanceRow}>
              <Text style={styles.balance}>
                R$ {showBalance ? balance.toFixed(2) : "*******"}
              </Text>
              <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
                <Ionicons
                  name={showBalance ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="white"
                  style={{ marginLeft: 8 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Ícones do lado direito */}
          <View style={styles.rightIcons}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={24}
              color="white"
              style={{ marginRight: 16 }}
            />
            <Ionicons name="notifications" size={24} color="white" />
          </View>
        </View>

        {/* Atalhos principais */}
        <View style={styles.mainActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="qr-code-outline" size={28} color="#0A45D1" />
            <Text style={styles.actionText}>Pix</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <MaterialCommunityIcons name="barcode" size={28} color="#0A45D1" />
            <Text style={styles.actionText}>Pagar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Ionicons name="cash-outline" size={28} color="#0A45D1" />
            <Text style={styles.actionText}>Empréstimos</Text>
          </TouchableOpacity>
        </View>


        {/* Banner */}
        <View style={styles.banner}>
          <Ionicons name="key-outline" size={28} color="#0A45D1" />
          <View style={{ marginLeft: 8 }}>
            <Text style={styles.bannerText}>
              Receba dinheiro na hora usando o CPF ou nº de celular!
            </Text>
            <Text style={styles.bannerLink}>Cadastre sua chave Pix</Text>
          </View>
        </View>

        {/* Grade de serviços */}
        <View style={styles.grid}>
          <Service icon="briefcase-outline" label="Crédito do Trabalhador" />
          <Service icon="swap-horizontal" label="Portabilidade Crédito" />
          <Service icon="cash-outline" label="Empréstimo FGTS" />
          <Service icon="school-outline" label="Consignado INSS" />
          <Service icon="repeat" label="Portabilidade" />
          <Service icon="calendar-outline" label="Antecipação 13º" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Service({ icon, label }) {
  return (
    <TouchableOpacity style={styles.serviceBtn}>
      <Ionicons name={icon} size={26} color="#0A45D1" />
      <Text style={styles.serviceText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  header: {
    backgroundColor: "#0A45D1",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { color: "white", fontSize: 16, marginBottom: 4 },
  balanceLabel: { color: "white", fontSize: 14 },
  balance: { color: "white", fontSize: 22, fontWeight: "bold" },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginTop: -40,
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 12,
    elevation: 4, // sombra Android
    shadowColor: "#000", // sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  actionText: {
    fontSize: 13,
    marginTop: 6,
    color: "#0A45D1",
    fontWeight: "600",
    textAlign: "center",
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "white",
    margin: 12,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  bannerText: { fontSize: 13, color: "#374151" },
  bannerLink: { fontSize: 13, color: "#0A45D1", fontWeight: "bold" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 10,
  },
  serviceBtn: { width: "30%", marginVertical: 12, alignItems: "center" },
  serviceText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    color: "#374151",
  },
});
