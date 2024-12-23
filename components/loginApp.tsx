import { View, TouchableHighlight, Text, StyleSheet } from "react-native"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export const AlternateLogin = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'#e6e6e6'}
            onPress={props.onPress}
            style={[style.button, props.style]}>
            <View style={style.container}>
                <FontAwesome5 name={props.logo} size={24} color={props.color} />
                <Text style={style.title}> {props.title} </Text>
            </View>
        </TouchableHighlight>
    )
}


const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 10,
        width: '100%',
        borderRadius: 37,
        borderColor: '#B9BCC4',
        borderWidth: 1,
        marginTop: 18,
    },
    title: {
        color: '#000000',
        marginLeft: 8,
    },

    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})