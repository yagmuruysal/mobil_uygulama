import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ParkingSpotGrid = ({ totalSpots, availableSpots }) => {
    const renderSpots = () => {
        let spots = [];
        for (let i = 0; i < totalSpots; i++) {
            spots.push(
                <View
                    key={i}
                    style={[
                        styles.parkingSpot,
                        i < availableSpots ? styles.availableSpot : styles.occupiedSpot
                    ]}
                />
            );
        }
        return spots;
    };

    return (
        <View style={styles.parkingSpotContainer}>
            {renderSpots()}
        </View>
    );
};

const ParkingView = ({ route }) => {
    const { parking } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{parking.name}</Text>

            <View style={styles.detailContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Toplam Kapasite:</Text>
                    <Text style={styles.detailValue}>{parking.totalSpots}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Boş Yerler:</Text>
                    <Text style={styles.detailValue}>{parking.availableSpots}</Text>
                </View>
            </View>

            <View style={styles.gridLabelContainer}>
                <View style={styles.legendRow}>
                    <View style={[styles.legendSpot, styles.availableSpot]} />
                    <Text style={styles.legendText}>Boş Yerler</Text>
                </View>
                <View style={styles.legendRow}>
                    <View style={[styles.legendSpot, styles.occupiedSpot]} />
                    <Text style={styles.legendText}>Dolu Yerler</Text>
                </View>
            </View>

            <ParkingSpotGrid
                totalSpots={parking.totalSpots}
                availableSpots={parking.availableSpots}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 16
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
        textAlign: 'center'
    },
    detailContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
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
    parkingSpotContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    parkingSpot: {
        width: 40,
        height: 60,
        margin: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    availableSpot: {
        backgroundColor: '#48BB78'  // Yeşil renk
    },
    occupiedSpot: {
        backgroundColor: '#E53E3E'  // Kırmızı renk
    },
    gridLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 16
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    legendSpot: {
        width: 20,
        height: 20,
        marginRight: 8
    },
    legendText: {
        fontSize: 14,
        color: '#555'
    }
});

export default ParkingView;