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
                <SafeAreaView style={styles.safearea}>
                <View>
                    <Navbar title='Чек Лист СУШИ ХИРО'/>
                    <View style={styles.container}>
                        <ListOfCheckboxes />
                    </View>
                </View>
                </SafeAreaView>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffcc00'
    }
});