import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Navbar} from "./components/Navbar/Navbar"
import {MyCheckbox} from "./components/MyCheckbox/MyCheckbox"
import { Provider, connect } from 'react-redux'
import ListOfCheckboxes from "./components/ListOfCheckboxes/ListOfCheckboxes"
import store from "./redux/store"


export default class App extends Component {

    render() {
        return (
            <Provider store={store}>
            <View>
                <Navbar title='Чек Лист СУШИ ХИРО'/>
                <View style={styles.container}>

                    <View style={styles.cbWrapper}>
                        <ListOfCheckboxes />
                    </View>
                </View>
            </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cbWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10
    }
});

