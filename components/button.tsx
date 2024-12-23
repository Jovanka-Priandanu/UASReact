import { TouchableHighlight, Text, StyleSheet } from "react-native"

export const ButtonTemplate = (props: any) => {
    return (
        <TouchableHighlight
            underlayColor={'#888be4'}
            onPress={props.onPress}
            style={[style.button, props.style]}>
            <Text style={style.title}> {props.title} </Text>
        </TouchableHighlight>
    )
}


const style = StyleSheet.create({
    button: {
        alignItems: 'center',
        backgroundColor: '#5E62DB',
        padding: 10,
        width: '100%',
    },
    title: {
        color: '#FFFFFF'
    }
})