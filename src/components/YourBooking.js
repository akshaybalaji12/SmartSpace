import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { width, height } from '../utils/constants';
import { YourBookingItem } from './YourBookingItem';
import { CalendarUtils } from 'react-native-calendars';

const YourBooking = ({ theme, navigation, ...props }) => {

    const [bookings, setBookings] = useState([]);
    const today = CalendarUtils.getCalendarDateString(new Date());
    const statistics = require('../../assets/images/statistics.png');

    useEffect(() => {
        if(props.bookings && props.bookings.length > 0) {
            const bookingData = props.bookings.map(booking => {
                if(today === booking.date) {
                    booking.status = 'active'
                } else {
                    booking.status = 'upcoming'
                }
                return booking;
            });
            setBookings([...bookingData]);
        }
    }, [props.bookings])

    const onClick = (index) => {
        navigation.navigate(
            'YourBooking', {
                scrollToIndex: index
            }
        );
    }

    const onStatisticsClick = () => {
        navigation.navigate('Statistics');
    }

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).titleContainer}>
                <Text style={styles(theme).title}>Your Bookings</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <TouchableOpacity onPress={onStatisticsClick} style={{ backgroundColor: 'white', height: 20, width: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Image source={statistics} style={{ width: 35, height: 35, tintColor: theme.surface }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onClick(0)} style={styles(theme).viewAll}>
                        <Text style={styles(theme).viewText}>View All</Text>
                    </TouchableOpacity>
                </View>
            </View>                          
            {bookings && bookings.length > 0 ?
            <FlatList 
            data={bookings}
            renderItem={({ item, index }) => <YourBookingItem key={item.id} index={index} theme={theme} booking={item} onClick={onClick}/>}
            keyExtractor={item => item._id}
            /> :
            <Text style={[styles(theme).viewText, { margin: 25, fontSize: 16 }]}>No Upcoming Booking(s)</Text>}
        </View>
    )

}

function mapStateToProps(state) {
    return {
        bookings: state.bookings.bookings
    }
}

export default connect(
    mapStateToProps,
    actions
) (YourBooking);

const styles = (theme) => StyleSheet.create({
    container: {
        height: height/3,
        width,
        alignItems: 'center',
        paddingBottom: 15
    },
    titleContainer: {
        flexDirection: 'row',
        width,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        paddingVertical: 5
    },
    viewAll: {
        backgroundColor: theme.surface,
        width: 70,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        marginStart: 10
    },
    title: {
        color: theme.primary,
        fontFamily: 'ProductSansBold',
        fontSize: 24
    },
    viewText: {
        color: theme.white,
        fontFamily: 'ProductSansBold',
        fontSize: 12
    }
})