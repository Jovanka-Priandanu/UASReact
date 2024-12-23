import { Text, View, StyleSheet, TouchableOpacity, Linking, ScrollView, ToastAndroid } from "react-native";
import { ButtonTemplate, AlternateLogin, FormTemplate } from "@/components";
import { router, Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import CApi from "@/lib/CApi";
import React from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
    const routeApp = () => {
        Linking.openURL('https://youtu.be/dQw4w9WgXcQ?si=1dMyymkSdafSk8kn');
    }
    const rickRoll = routeApp;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const setVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        // validasi
        if (!email || !password) {
            ToastAndroid.show('Email and Password can’t be empty', ToastAndroid.SHORT);
            return;
        }
        setIsLoading(true);

        try {
            // deklarassi variabel
            const request = {
                email: email,
                password: password,
            };
            // post data
            const { data } = await CApi.post('/login', request, {
                headers: { 'Content-Type': 'text/plain' }
            });
            ToastAndroid.show('Login Succefully', ToastAndroid.SHORT);
            // console.log('Login berhasil:', data);
            await AsyncStorage.setItem('userToken', data.token);
            await AsyncStorage.setItem('userEmail', data.data.email);
            await AsyncStorage.setItem('userName', data.data.name);

            router.push('/dashboard');
        } catch (err) {
            // console.log('Login gagal:', err);
            const msg = err?.response?.data?.message || 'Something Went Wrong, Please Try Again Later';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <ScrollView style={style.scroll}>
            <View style={style.section}>
                <View style={style.container}>
                    <View style={style.appLogo}>
                        <Text style={[style.first, style.logoFont]}>Docu</Text>
                        <Text style={[style.last, style.logoFont]}>Flex</Text>
                    </View>
                    <Text style={style.signText}>Sign In</Text>
                </View>
                <View>
                    <FormTemplate
                        label='Email'
                        placeholder='Enter Your Email'
                        change={setEmail}
                        value={email}
                    />
                    <View>
                        <FormTemplate
                            label='Password'
                            placeholder='Enter Your Password'
                            change={setPassword}
                            value={password}
                            max={8}
                            secure={!isPasswordVisible}
                        />
                        <TouchableOpacity onPress={setVisibility} style={style.eyeIcon}>
                            <Feather
                                name={isPasswordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="#989CA8"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={style.forgot}>Forgot Password ?</Text>
                <ButtonTemplate
                    title={isLoading ? "Submitting Please Wait..." : "Submit"}
                    onPress={handleLogin}
                    disabled={isLoading}
                    style={style.button} />

                <View style={style.lineContainer}>
                    <View style={style.hairline} />
                    <Text style={style.orText}>Or</Text>
                    <View style={style.hairline} />
                </View>

                <View style={style.container}>
                    <AlternateLogin title="Continue with Apple"
                        onPress={rickRoll}
                        logo='apple'
                    />
                    <AlternateLogin title="Continue with Google"
                        onPress={rickRoll}
                        logo='google'
                    />
                    <AlternateLogin title="Continue with Facebook"
                        onPress={rickRoll}
                        logo='facebook'
                        color='blue'
                    />
                    <Link href='/register' style={style.createAcc}>Create an Account</Link>
                </View>
            </View>
        </ScrollView >
    );
}

const style = StyleSheet.create({
    scroll: {
        backgroundColor: "#FFFFFF",
    },
    section: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        padding: 20,
        marginTop: 50
    },

    container: {
        alignItems: "center",
    },

    appLogo: {
        flexDirection: 'row',
        marginBottom: 24,
    },

    logoFont: {
        fontSize: 32,
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },

    first: {
        color: '#1B243C',
    },

    last: {
        color: '#5E62DB',
    },

    signText: {
        fontSize: 16,
        color: '#1E2842',
        fontWeight: '500',
    },

    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 42,
    },

    forgot: {
        marginBottom: 16,
        color: '#5E62DB',
        textAlign: 'right',
    },

    button: {
        padding: 15,
        borderRadius: 5,
        marginBottom: 20,
    },

    lineContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    hairline: {
        borderColor: '#B9BCC4',
        width: 153,
        borderTopWidth: 1,
    },

    orText: {
        fontSize: 14,
        color: '#4B5368',
    },

    createAcc: {
        color: '#5E62DB',
        fontSize: 14,
        marginTop: 34,
    },
});