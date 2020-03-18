import React, {Component} from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {Navbar} from "./components/Navbar/Navbar"
import {MyCheckbox} from "./components/MyCheckbox/MyCheckbox"
import { Provider, connect } from 'react-redux'
import ListOfCheckboxes from "./components/ListOfCheckboxes/ListOfCheckboxes"
import store from "./redux/store"


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>

                <View style={styles.mainwrapper}>
                    <Navbar title='Чек Лист СУШИ ХИРО'/>
                    <View style={styles.container}>
                        <ListOfCheckboxes />
                    </View>
                </View>

            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    mainwrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        height: 300,
        padding:10,
        justifyContent:'flex-start',
        backgroundColor:'#f4f4f4',
        alignItems:'flex-start'
    }
});