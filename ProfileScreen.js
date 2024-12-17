import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatar} />
            </View>
            <Text style={styles.name}>Kullanıcı Adı</Text>
            <Text style={styles.email}>kullanici@email.com</Text>

            {/* Options Section */}
            <View style={styles.optionsContainer}>
                {/* Account Settings */}
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Hesap Ayarları</Text>
                    <Ionicons name="chevron-forward" size={24} color="#6B7280" />
                </TouchableOpacity>

                {/* Saved Locations */}
                <TouchableOpacity style={styles.option}>
                    <Text style={styles.optionText}>Kayıtlı Konumlar</Text>
                    <Ionicons name="chevron-forward" size={24} color="#6B7280" />
                </TouchableOpacity>

                {/* Logout */}
                <TouchableOpacity style={[styles.option, styles.logoutOption]}>
                    <Text style={[styles.optionText, styles.logoutText]}>Çıkış Yap</Text>
                    <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6',
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    avatarContainer: {
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#9CA3AF',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 24,
    },
    optionsContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    option: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    optionText: {
        fontSize: 16,
        color: '#374151',
    },
    logoutOption: {
        borderBottomWidth: 0
    },
    logoutText: {
        color: '#EF4444',
    },
});

export default ProfileScreen;
