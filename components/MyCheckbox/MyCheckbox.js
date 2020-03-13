import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import CheckBox from "react-native-web/src/exports/CheckBox"

export const MyCheckbox = (props) => {
    const handleCheckboxChange = (id) => {props.handleCheckboxChange(id)};
    return (
        <View style={styles.checkboxWrapper}>
            <Text style={styles.text}>
                <CheckBox onChange={()=>handleCheckboxChange(props.id)} value={props.value}/> <Text onPress={()=>handleCheckboxChange(props.id)}>{props.title}</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    checkboxWrapper: {
        /*flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'*/
    },
    text: {
        color: '#000'
    }
})