import React, { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

const BookingScreen = (props) => {

    return (
        <View>
            <Text>Book your seats</Text>
            <View>
                
            </View>
        </View>
    )

}

function mapStateToProps(state) {
    return {
    };
}

export default connect(
    mapStateToProps,
    actions
)(BookingScreen);
