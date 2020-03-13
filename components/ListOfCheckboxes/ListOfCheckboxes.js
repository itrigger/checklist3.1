import React, { Component } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getCheckboxesThunk } from './../../redux/reducers/checks'
import {MyCheckbox} from "../MyCheckbox/MyCheckbox";
import {toggleCheckboxesValue} from "../../redux/reducers/checks";
import Constants from 'expo-constants';

class ListOfCheckboxes extends Component {
    componentDidMount() {
        this.props.getCheckboxesThunk(1,10);
    }

    handleCheckboxChange = (id) => {
        this.props.toggleCheckboxesValue(id)
    }

    render() {
        return (
          /*<ListOfCheckboxItem
              checkboxes={this.props.checkboxes}
              handleCheckboxChange={this.handleCheckboxChange}
          />*/
            <View>
              <FlatList
                data={this.props.checkboxes}
                renderItem={({ item }) => <MyCheckbox style={styles.item} key={item._id} title={item.title} id={item._id} value={item.value} handleCheckboxChange={this.handleCheckboxChange}/>}
                keyExtractor={item => item._id}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        marginTop: Constants.statusBarHeight
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    }
});

const mapStateToProps = (state) => {
    return {
        checkboxes: state.checksReducer.checkboxes
    };
};

const mapDispatchToProps = {
    getCheckboxesThunk,
    toggleCheckboxesValue
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfCheckboxes);