import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Dashboard() {
    const [userData, setUserData] = useState({ name: '', email: '' });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                const storedEmail = await AsyncStorage.getItem('userEmail');

                if (!token || !storedEmail) {
                    ToastAndroid.show('User Not Found', ToastAndroid.SHORT);
                    return;
                }

                const name = await AsyncStorage.getItem('userName');
                setUserData({
                    name: name || '',
                    email: storedEmail,
                });
            } catch (err) {
                ToastAndroid.show('Data Not Found', ToastAndroid.SHORT);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        Alert.alert(
            'Logout?',
            'Are You Sure Want To Logout?',
            [
                { text: 'Nope', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            ToastAndroid.show('Logout Succefully', ToastAndroid.SHORT);
                            router.replace('/login');
                        } catch (err) {
                            ToastAndroid.show('Something Went Wronh', ToastAndroid.SHORT);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header Image */}
            <Image
                style={styles.headerImage}
                source={require('./assets/images/docu-banner.png')}
            />

            {/* User Info Card */}
            <View style={styles.card}>
                <View style={styles.info}>
                    <Text style={styles.cardTitle}>Welcome, {userData.name}!</Text>
                    <Text style={styles.cardSubtitle}>Email: {userData.email}</Text>
                </View>
                <View style={styles.actionContainer}>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <MaterialIcons name="logout" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Banner Section */}
            <View style={styles.contentContainer}>
                <Image
                    style={styles.contentImage}
                    source={require('./assets/images/empty.png')}
                />
                <Text style={styles.contentText}>Sorry, this application still don't have any content yet Hehe...</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#070F2B',
    },
    headerImage: {
        width: '100%',
        height: 200,
    },

    info: {
        flexDirection: 'column',
    },

    card: {
        marginTop: -30,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1B243C',
    },
    cardSubtitle: {
        fontSize: 16,
        color: '#4B5368',
        marginTop: 8,
    },
    contentContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    contentImage: {
        width: '80%',
        height: 350,
        objectFit: 'contain',
    },
    contentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        paddingVertical: 10,
        textAlign: 'center',
        letterSpacing: 1.5,
    },
    actionContainer: {
        marginTop: 20,
        alignItems: 'center',

    },

    logoutButton: {
        marginRight: 20
    },
});
