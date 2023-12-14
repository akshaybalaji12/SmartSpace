import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { DeskRow } from "../components/DeskRow";
import { width, height } from "../utils/constants";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import { ActivityLoader } from "../components/ActivityLoader";
import { SeatComponent } from "../components/SeatComponent";

const SeatFragment = ({ theme, onComplete, ...props }) => {

    useEffect(() => {
        props.requestAvailability(props.bookingData);
    }, []);

    const zoomableViewRef = useRef();

    onSelect = (bookingData) => {
        onComplete(bookingData);
    }
    
    return (
        <View style={styles(theme).container}>
            {!props.isLoading &&
            <View style={{ zIndex: 5, flexDirection: 'column', justifyContent: 'space-around', height: 80, position: 'absolute', end: 30, top: 10 }}>
                <TouchableOpacity onPress={() => zoomableViewRef.current.zoomBy(0.1)} style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles(theme).title}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => zoomableViewRef.current.zoomBy(-0.1)} style={{ width: 30, height: 30, borderRadius: 10, backgroundColor: theme.primary, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles(theme).title}>-</Text>
                </TouchableOpacity>
            </View>}
            {!props.isLoading &&
            <View style={{ width: width - 40, height: 270, flexGrow: 1, borderColor: theme.primary, borderWidth: 1, alignSelf: 'center', borderRadius: 10 }}>
                <ReactNativeZoomableView
                    contentWidth={width-20}
                    contentHeight={300}
                    initialZoom={0.7}
                    initialOffsetX={-15}
                    initialOffsetY={0}
                    bindToBorders={false}
                    ref={zoomableViewRef}>
                    <SeatComponent onSelect={onSelect} bookingData={props.bookingData} unavailableSeats={props.unavailableSeats} bookedSeats={props.bookedSeats} />
                </ReactNativeZoomableView>
            </View>}
            {!props.isLoading &&
            <View style={{ flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', marginVertical: 10, width: width - 40 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 120, marginVertical: 2 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: theme.surface, marginEnd: 20 }} />
                    <Text style={styles(theme).title}>Unavailable</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 300, marginVertical: 2 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: theme.upcoming, marginEnd: 20 }} />
                    <Text style={styles(theme).title}>Unavailable for all selected dates</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 120, marginVertical: 2 }}>
                    <View style={{ width: 20, height: 20, backgroundColor: theme.primary, marginEnd: 20 }} />
                    <Text style={styles(theme).title}>Selected</Text>
                </View>
            </View>}
            {props.isLoading && <ActivityLoader theme={theme} size="large" />}
        </View>
    )
}

function mapStateToProps(state) {
    return {
        bookingData: state.bookings.seatBookingData,
        isLoading: state.bookings.isLoading,
        unavailableSeats: state.bookings.unavailableSeats,
        bookedSeats: state.bookings.bookedSeats
    };
}

export default connect(
    mapStateToProps,
    actions
)(SeatFragment);

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width,
        height: height/2.5,
        paddingBottom: 50
    },
    title: {
        fontSize: 14,
        fontFamily: 'ProductSansBold',
        color: theme.white
    },
    available: {
        fontSize: 18,
        fontFamily: 'ProductSansBold',
        color: theme.primary,
    }
});