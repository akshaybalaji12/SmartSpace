import { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { width, COLOR_MODES } from '../utils/constants';
import { BookingItem } from '../components/BookingItem';
import { CalendarUtils } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { DeleteBookingFragment } from '../fragments/DeleteBookingFragment';
import { EditBookingFragment } from '../fragments/EditBookingFragment';

const YourBookingsScreen = ({ route, ...props}) => {
    
    const ITEM_HEIGHT = 160;
    const { scrollToIndex } = route.params;
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

    const [bookings, setBookings] = useState([]);
    const [isDelete, setDelete] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [bookingItem, setBookingItem] = useState(-1);
    const today = CalendarUtils.getCalendarDateString(new Date());

    const flatListRef = useRef();

    useEffect(() => {
        const scrollTimeout = setTimeout(() => { 
            flatListRef.current.scrollToIndex({
                animated: true,
                index: scrollToIndex
            });
        }, 500);

        return () => clearTimeout(scrollTimeout);
    }, []);

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

    useEffect(() => {
        if(props.modifyBookingMessage.indexOf('Booking') > -1) {
            props.requestBookings(props.user);
        }
    }, [props.modifyBookingMessage]);

    onEdit = (index) => {
        setEdit(true);
        setBookingItem(index);
    }

    onDelete = (index) => {
        setDelete(true);
        setBookingItem(index);
    }

    onCancel = () => {
        setEdit(false);
        setDelete(false);
    }

    confirmDelete = () => {
        const bookingBody = {
            type: 'cancel',
            booking: { ...props.bookings[bookingItem] }
        }
        props.modifyBooking(bookingBody);
        setDelete(false);
        setBookingItem(-1);
    }

    confirmEdit = () => {
        const bookingBody = {
            type: 'edit',
            booking: { ...props.bookings[bookingItem] }
        }
        props.modifyBooking(bookingBody);
        setEdit(false);
        setBookingItem(-1);
    }

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).titleContainer}>
                <Text style={styles(theme).title}>Your Bookings</Text>
            </View>                          
            <View style={styles(theme).inputContainer}>
                {bookings && bookings.length > 0 ?
                <FlatList 
                ref={flatListRef}
                data={bookings}
                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index
                })}
                renderItem={({ item, index }) => <BookingItem key={item.id} index={index} theme={theme} booking={item} onDelete={onDelete} onEdit={onEdit} />}
                keyExtractor={item => item._id}
                /> :
                <Text style={[styles(theme).viewText, { margin: 25, fontSize: 16 }]}>No Upcoming Booking(s)</Text>}
            </View>
            <Modal
            isVisible={isEdit}
            onBackdropPress={() => setEdit(false)}
            style={{ justifyContent: 'flex-end', margin: 0 }}>
                <EditBookingFragment theme={theme} onCancel={onCancel} onEdit={confirmEdit} booking={props.bookings[bookingItem]} />
            </Modal>
            <Modal
            isVisible={isDelete}
            onBackdropPress={() => setDelete(false)}
            style={{ justifyContent: 'flex-end', margin: 0 }}>
                <DeleteBookingFragment theme={theme} onCancel={onCancel} onDelete={confirmDelete} />
            </Modal>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        bookings: state.bookings.bookings,
        modifyBookingMessage: state.bookings.modifyBookingMessage,
        isDarkMode: state.settings.isDarkMode,
        user: state.settings.loggedInUser
    }
}

export default connect(
    mapStateToProps,
    actions
) (YourBookingsScreen);

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        width,
        backgroundColor: theme.background
    },
    titleContainer: {
        flex: 1,
        width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingStart: 20
    },
    title: {
        fontSize: 60,
        fontFamily: 'ProductSansBold',
        color: theme.primary,
    },
    inputContainer: {
        flex: 3,
        width,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
})