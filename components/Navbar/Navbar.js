import React from 'react'
import {StyleSheet, View, Text} from 'react-native'

export const Navbar = (props) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.navtext}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar:{
        height: 70,
        backgroundColor: '#ff363a',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 10

    },
    navtext:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10
    }
})