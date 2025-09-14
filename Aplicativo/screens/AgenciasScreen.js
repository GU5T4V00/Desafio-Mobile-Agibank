// AgenciasScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
import * as Location from 'expo-location';

// Dados das agências Agibank em Campinas-SP (simulados)
const agenciasCampinas = [
  {
    id: 1,
    name: 'Agibank',
    coords: {
      latitude: -22.907732558117402,
      longitude: -47.05874720754435,
    },
  },
  {
    id: 2,
    name: 'Agibank',
    coords: {
      latitude: -22.90370471453408,
      longitude: -47.06018226894133,
    },
  },
  {
    id: 3,
    name: 'Agibank',
    coords: {
      latitude: -22.92443961767502,
      longitude: -47.08107261431394,
    },
  },
  {
    id: 4,
    name: 'Agibank Campus',
    coords: {
      latitude: -23.010674648393312,
      longitude: -47.11773777052799,
    },
  },
  {
    id: 5,
    name: 'Agibank',
    coords: {
      latitude: -22.919681674877847,
      longitude: -47.109424641535085,
    },
  },
  {
    id: 6,
    name: 'Agibank',
    coords: {
      latitude: -22.968819154902565,
      longitude: -47.12768238428488,
    },
  },
  {
    id: 7,
    name: 'Agibank',
    coords: {
      latitude: -22.941597997418366,
      longitude: -47.18684983291036,
    },
  },
  {
    id: 8,
    name: 'Agibank',
    coords: {
      latitude: -22.825198666319846,
      longitude: -47.07938981337496,
    },
  },
];

// Função para calcular a distância em metros entre dois pontos (Haversine)
const getDistance = (p1, p2) => {
  const R = 6371e3; // Raio da Terra em metros
  const φ1 = (p1.latitude * Math.PI) / 180;
  const φ2 = (p2.latitude * Math.PI) / 180;
  const Δφ = ((p2.latitude - p1.latitude) * Math.PI) / 180;
  const Δλ = ((p2.longitude - p1.longitude) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function AgenciasScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [closestAgency, setClosestAgency] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão Negada', 'O mapa será centralizado em Campinas.');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);

      const closest = findClosestAgency(location.coords);
      setClosestAgency(closest);

      setLoading(false);
    })();
  }, []);

  const findClosestAgency = (location) => {
    let closest = null;
    let minDistance = Infinity;

    agenciasCampinas.forEach((agency) => {
      const distance = getDistance(location, agency.coords);
      if (distance < minDistance) {
        minDistance = distance;
        closest = agency;
      }
    });

    return closest;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Buscando sua localização...</Text>
      </View>
    );
  }

  const initialRegion = {
    latitude: userLocation ? userLocation.latitude : -22.9056,
    longitude: userLocation ? userLocation.longitude : -47.0608,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  const lineCoords = userLocation && closestAgency
    ? [
        { latitude: userLocation.latitude, longitude: userLocation.longitude },
        { latitude: closestAgency.coords.latitude, longitude: closestAgency.coords.longitude },
      ]
    : null;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        provider="google"
      >
        {userLocation && (
          <Marker
            coordinate={userLocation}
            title="Sua Localização"
          >
            <FontAwesome name="location-arrow" size={24} color="#007bff" />
          </Marker>
        )}

        {agenciasCampinas.map((agencia) => (
          <Marker
            key={agencia.id}
            coordinate={agencia.coords}
            title={agencia.name}
          >
            <View style={styles.markerContainer}>
              <View style={styles.markerIcon}>
                <FontAwesome name="bank" size={20} color="#007bff" />
              </View>
              <Text style={styles.markerText}>AGI</Text>
            </View>
          </Marker>
        ))}

        {lineCoords && (
          <Polyline
            coordinates={lineCoords}
            strokeColor="#007bff"
            strokeWidth={4}
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: { flex: 1 },
  markerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'flex-start',
  },
  markerIcon: {
    marginRight: 0,
  },
  markerText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#007bff',
  },
});
