import React, { Component } from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getPlaces } from './../../redux/reducers/checks'
import {MyCheckbox} from "../MyCheckbox/MyCheckbox";
import CheckBox from "react-native-web/src/exports/CheckBox";


export const ListOfCheckboxItem = (props) => {
    return (
        <View>
                {
                    props.checkboxes?
                    props.checkboxes.map(item => (
                     <MyCheckbox key={item._id} title={item.title} id={item._id} value={item.value} handleCheckboxChange={props.handleCheckboxChange}/>
                    )
                  ) : null
                }

        </View>
    )
}