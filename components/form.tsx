import { Text, StyleSheet, TextInput, View } from "react-native"
import React from 'react'

export const FormTemplate = (props: any) => {

    return (
        <View style={style.form}>
            <Text style={style.label}>{props.label}</Text>
            <TextInput
                style={[style.input, props.style]}
                placeholder={props.placeholder}
                onChangeText={props.change}
                value={props.value}
                secureTextEntry={props.secure}
                autoCapitalize="none"
                maxLength={props.max}
            />
        </View>
    )
}


const style = StyleSheet.create({

    form: {
        width: '100%',
    },

    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#4B5368',
    },

    input: {
        height: 48,
        borderColor: '#989CA8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        marginBottom: 16,
    },

})