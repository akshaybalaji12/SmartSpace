import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { DeskRow } from "../components/DeskRow";
import { width, height } from "../utils/constants";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { ActivityLoader } from "../components/ActivityLoader";
import { SeatComponent } from "../components/SeatComponent";

const ReviewFragment = ({ theme, ...props }) => {

    return (
        <View style={styles(theme).container}>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width/2,
                paddingVertical: 15,
                marginVertical: 10
            }}>
                <Text style={styles(theme).title}>Building</Text>
                <Text style={styles(theme).value}>Cambridge</Text>
            </View>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width/2,
                paddingVertical: 15,
                marginVertical: 10
            }}>
                <Text style={styles(theme).title}>Floor & Zone</Text>
                <Text style={styles(theme).value}>{props.bookingData.floorNo}, {props.bookingData.zone}</Text>
            </View>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width,
                paddingVertical: 15,
                marginVertical: 10
            }}>
                <Text style={styles(theme).title}>Dates</Text>
                {props.bookingData.dates.map((date, index) => {
                    return (
                        <Text style={styles(theme).value} key={index}>{date}</Text>
                    )
                })}
            </View>
            <View style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: width,
                paddingVertical: 15,
                marginVertical: 10
            }}>
                <Text style={styles(theme).title}>Seat No</Text>
                <Text style={styles(theme).value}>{props.bookingData.seatNo}</Text>
            </View>
        </View>
    )
}

function mapStateToProps(state) {
    return {
        bookingData: state.bookings.seatBookingData
    };
}

export default connect(
    mapStateToProps,
    actions
)(ReviewFragment);

const styles = (theme) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        width,
        height: height/2.5,
        paddingBottom: 50,
        flexWrap: 'wrap'
    },
    title: {
        fontSize: 16,
        fontFamily: 'ProductSansBold',
        color: theme.primary
    },
    value: {
        fontSize: 18,
        fontFamily: 'ProductSansBold',
        color: theme.white,
    }
});