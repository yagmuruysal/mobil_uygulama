import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';


import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid } from 'react-native';

const ParkingFinderScreen = ({ navigation }) => {
    const [selectedParking, setSelectedParking] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [parkingSpots] = useState([
        {
            id: 1,
            name: 'AVM Otoparkı',
            availableSpots: 4,
            totalSpots: 20,
            latitude: 41.0082,
            longitude: 28.9784,
            status: 'partial'
        },
        {
            id: 2,
            name: 'İş Merkezi Otoparkı',
            availableSpots: 10,
            totalSpots: 30,
            latitude: 41.0112,
            longitude: 28.9702,
            status: 'low'
        }
    ]);
    useEffect(() => {
        const requestLocationPermission = async () => {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            const { latitude, longitude } = position.coords;
                            setUserLocation({ latitude, longitude });
                        },
                        (error) => console.log(error),
                        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
                    );
                }
            } catch (err) {
                console.warn(err);
            }
        };

        requestLocationPermission();
    }, []);

    const getSpotColor = (status) => {
        switch (status) {
            case 'full':
                return styles.fullStatus;
            case 'low':
                return styles.lowStatus;
            case 'partial':
                return styles.partialStatus;
            default:
                return styles.defaultStatus;
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapView}
                initialRegion={{
                    latitude: userLocation?.latitude || 41.0082,
                    longitude: userLocation?.longitude || 28.9784,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude
                        }}
                        title="Benim Konumum"
                        pinColor="blue"
                    />
                )}
                {parkingSpots.map((spot) => (
                    <Marker
                        key={spot.id}
                        coordinate={{
                            latitude: spot.latitude,
                            longitude: spot.longitude
                        }}
                        title={spot.name}
                        description={`Boş Yerler: ${spot.availableSpots}/${spot.totalSpots}`}
                        pinColor={
                            spot.status === 'full' ? 'red' :
                                spot.status === 'low' ? 'orange' :
                                    spot.status === 'partial' ? 'green' : 'gray'
                        }
                        onPress={() => setSelectedParking(spot)}
                    />
                ))}
            </MapView>

            <ScrollView style={styles.listContainer}>
                {parkingSpots.map((spot) => (
                    <TouchableOpacity
                        key={spot.id}
                        style={styles.parkingCard}
                        onPress={() => setSelectedParking(spot)}
                    >
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardTitle}>{spot.name}</Text>
                            <View style={[styles.statusBadge, getSpotColor(spot.status)]}>
                                <Text style={styles.statusText}>
                                    {spot.availableSpots} / {spot.totalSpots}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.cardContent}>
                            <View>
                                <Text>Boş Yer: {spot.availableSpots}</Text>
                                <Text>Toplam Yer: {spot.totalSpots}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedParking && (
                <View style={styles.detailModal}>
                    <View style={styles.detailContainer}>
                        <Text style={styles.detailTitle}>{selectedParking.name}</Text>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Toplam Kapasite:</Text>
                            <Text style={styles.detailValue}>{selectedParking.totalSpots}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Boş Yerler:</Text>
                            <Text style={styles.detailValue}>{selectedParking.availableSpots}</Text>
                        </View>
                        <TouchableOpacity style={styles.detailButton}
                            onPress={() => navigation.navigate('ParkingView', { parking: selectedParking })
                            }>
                            <Text style={styles.detailButtonText}>Görüntüle</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.detailCloseButton}
                            onPress={() => setSelectedParking(null)}
                        >
                            <Text style={styles.detailCloseButtonText}>Kapat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    mapView: {
        width: '100%',
        height: 192,
        marginBottom: 16
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f2f2f2'
    },
    mapView: {
        width: '100%',
        height: 192,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16
    },
    mapText: {
        color: '#808080',
        fontSize: 16
    },
    listContainer: {
        flex: 1
    },
    parkingCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4
    },
    statusText: {
        color: '#fff',
        fontSize: 14
    },
    fullStatus: {
        backgroundColor: '#e53e3e'
    },
    lowStatus: {
        backgroundColor: '#d69e2e'
    },
    partialStatus: {
        backgroundColor: '#48bb78'
    },
    defaultStatus: {
        backgroundColor: '#a0aec0'
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailModal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end'
    },
    detailContainer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 24
    },
    detailTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    detailLabel: {
        fontSize: 16,
        color: '#718096'
    },
    detailValue: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    detailButton: {
        backgroundColor: '#4299e1',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 16
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    detailCloseButton: {
        borderWidth: 1,
        borderColor: '#4299e1',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 12
    },
    detailCloseButtonText: {
        color: '#4299e1',
        fontSize: 16,
        textAlign: 'center'
    }
});

export default ParkingFinderScreen;
