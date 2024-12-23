import { Text, View, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from "react-native";
import Octicons from '@expo/vector-icons/Octicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ButtonTemplate, FormTemplate } from "@/components";
import { router } from 'expo-router';
import CApi from '../lib/CApi';
import { useSelector, useDispatch } from 'react-redux';
import { setData, resetData } from '../store/reducer/loginReducer';
import React from "react";

export default function Register() {
    // state dari reducer
    const regForm = useSelector((state) => state.login.loginInput);
    const dispatch = useDispatch();
    // set data dari reducer
    const onChangeValue = (payload: any) => {
        dispatch(setData({ ...regForm, ...payload }));
    };

    const handleReg = async () => {
        try {
            // validasi
            if (regForm.password !== regForm.confirm_password) {
                ToastAndroid.show("Passwords do not match!", ToastAndroid.SHORT);
                return;
            }
            //post data
            const { data } = await CApi.post('/register', regForm, {
                headers: { 'Content-Type': 'text/plain' }
            });
            // notifikasi berhasil
            ToastAndroid.show("Register Success", ToastAndroid.SHORT);
            // console.log('regist berhasil', data)
            // route
            dispatch(resetData());
            router.push('/login')
            // error msg
        } catch (error: any) {
            const msg = error?.response?.data?.message || error?.message || 'Something went wrong';
            ToastAndroid.show(msg, ToastAndroid.SHORT);
        }
    };

    const routeBack = () => {
        router.push('/login');
    };

    // Validasi password
    const isPasswordValid = regForm.password?.length >= 8;
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(regForm.password);

    return (
        <ScrollView style={style.scroll}>
            <View style={style.section}>
                <View style={style.navbar}>
                    <TouchableOpacity onPress={routeBack} style={style.backButton}>
                        <Octicons name="chevron-left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={[style.navPlaceholder, style.fontFamily]}>Register Account</Text>
                </View>

                <View style={style.container}>
                    <View style={style.shape}>
                        <AntDesign name="lock1" size={24} color="#5E62DB" />
                    </View>
                    <Text style={[style.title, style.fontFamily]}>Create New Account</Text>
                    <Text style={[style.subtitle, style.fontFamily]}>
                        Your new password must be different from previously used passwords.
                    </Text>
                </View>

                <FormTemplate
                    style={{ borderRadius: 10 }}
                    label="Name"
                    placeholder="Enter Your Name"
                    change={(val: any) => onChangeValue({ name: val })}
                    value={regForm.name}
                />

                <FormTemplate
                    style={{ borderRadius: 10 }}
                    label="Email"
                    placeholder="Enter Your Email"
                    change={(val: any) => onChangeValue({ email: val })}
                    value={regForm.email}
                />

                <FormTemplate
                    style={{ borderRadius: 10 }}
                    label="New Password*"
                    placeholder="Enter Your New Password"
                    change={(val: any) => onChangeValue({ password: val })}
                    value={regForm.password}
                    max={8}
                    secure={true}
                />

                <FormTemplate
                    style={{ borderRadius: 10 }}
                    label="Confirm Password*"
                    placeholder="Confirm password"
                    change={(val: any) => onChangeValue({ confirm_password: val })}
                    value={regForm.confirm_password}
                    max={8}
                    secure={true}
                />

                {/* Validasi Password */}
                <View style={style.check}>
                    <AntDesign
                        name={isPasswordValid ? "checkcircle" : "closecircle"}
                        size={13}
                        color={isPasswordValid ? "#5E62DB" : "red"}
                    />
                    <Text style={style.checkStatus}>Must be at least 8 characters</Text>
                </View>

                <View style={style.check}>
                    <AntDesign
                        name={hasSpecialCharacter ? "checkcircle" : "closecircle"}
                        size={13}
                        color={hasSpecialCharacter ? "#5E62DB" : "red"}
                    />
                    <Text style={style.checkStatus}>Must contain one special character</Text>
                </View>

                <ButtonTemplate
                    style={style.button}
                    title="Submit"
                    onPress={handleReg}
                />
            </View>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    fontFamily: {
        fontFamily: 'sans-serif',
    },

    scroll: {
        backgroundColor: "#FFFFFF",
    },

    section: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFFFFF",
    },

    backButton: {
        left: -100,
    },

    navbar: {
        display: 'flex',
        flexDirection: 'row',
        padding: 30,
        justifyContent: 'center',
    },

    navPlaceholder: {
        fontSize: 14,
        color: '#1E2842',
        fontWeight: '500',
    },

    container: {
        alignItems: 'center',
    },

    shape: {
        width: 52,
        height: 50,
        backgroundColor: '#EFEFFB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },

    title: {
        fontSize: 20,
        color: '#505050',
        fontWeight: '600',
        marginTop: 24,
    },

    subtitle: {
        color: '#505050',
        fontSize: 14,
        width: '70%',
        textAlign: 'center',
        marginTop: 6,
    },

    check: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },

    checkStatus: {
        marginLeft: 10,
        fontSize: 12,
        color: '#242424',
    },

    button: {
        padding: 15,
        borderRadius: 23,
        marginTop: 12,
    },
});
