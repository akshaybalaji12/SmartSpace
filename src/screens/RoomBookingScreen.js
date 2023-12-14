import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Image, Pressable } from 'react-native'
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width, height } from '../utils/constants';
import { Button } from '../components/Button';
import InputField from '../components/InputField'
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import Modal from 'react-native-modal';
import { DatePicker } from '../components/DatePicker';

const RoomBookingScreen = (props) => {

    const isRendered = useRef(false);
    
    const [floor, setFloor] = useState(-1);
    const [room, setRoom] = useState(-1);
    const [people, setPeople] = useState('');
    const [selectList, setList] = useState([]);
    const [error, setError] = useState(false);
    const [date, setDate] = useState('');
    const [isDatePicker, setDatePicker] = useState(false);
    
    useEffect(() => {
        props.requestFloorPlan();
    }, []);

    useEffect(() => {
        if(props.floorPlan.length > 0 && selectList.length === 0) {
            const floorData = props.floorPlan.map((floor, index) => {
                return {
                    key: index,
                    value: `Floor ${floor.level}`
                }
            });

            const floorSelect = {
                key: 'floorSelect',
                data: floorData,
                onSelect: (floor) => setFloor(floor),
                placeholder: 'Select Floor',
                type: 'single'
            }
            setList(prevList => [ ...prevList, floorSelect ]);
        }
    }, [props.floorPlan]);

    useEffect(() => {        
        if(!isRendered.current) {
            isRendered.current = true;
            return;
        };
        
        if(floor > -1 && selectList.length === 1) {
            const roomData = props.floorPlan[floor].rooms.map((room, index) => {
                return {
                    key: index,
                    value: `${room.roomName}`,
                    maxSeats: room.maxSeats
                }
            });
            const roomSelect = {
                key: 'roomSelect',
                data: roomData,
                onSelect: (room) => setRoom(room),
                placeholder: 'Select Room',
                type: 'single'
            }
    
            setList(prevList => [ ...prevList, roomSelect ]);
        }
    }, [floor]);
    
    const DropDownArrow = () => {
        const arrowIcon = require('../../assets/images/down.png');
        return (
            <Image source={arrowIcon} style={{ width: 15, height: 15, margin: 5, resizeMode: 'contain', tintColor: theme.white }} />
        )
    }

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light; 
    
    const onDatePress = () => {
        setDatePicker(true);
    }

    const onDatesSelected = (selectedDate) => {
        setDate(selectedDate);
        setDatePicker(false);
    }


    const onPeopleChange = (value) => {
        setError(false);
        if(parseInt(value) > props.floorPlan[floor].rooms[room].maxSeats) {
            setError(true);
        } else {
            setPeople(value);
            setError(false);
        }
    }

    const onBook = () => {

    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles(theme).container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles(theme).view}>
                    <View style={styles(theme).titleContainer}>                        
                        <Text style={styles(theme).title}>Book {'\n'}Conference Room</Text>
                    </View>
                    <View style={styles(theme).inputContainer}>
                        {selectList.map(item => {
                            return (
                                item.type === 'single' ? 
                                <SelectList key={item.key} placeholder={item.placeholder} search={false} inputStyles={styles(theme).selectInput}
                                boxStyles={[styles(theme).selectContainer, { height: 50 }]} arrowicon={<DropDownArrow />}
                                dropdownStyles={styles(theme).dropDownContainer} dropdownTextStyles={styles(theme).selectInput} data={item.data} 
                                save='key' setSelected={(value) => item.onSelect(value)} /> :

                                <MultipleSelectList key={item.key} placeholder={item.placeholder} search={false} inputStyles={styles(theme).selectInput} 
                                boxStyles={[styles(theme).selectContainer, { height: seatType.length > 3 ? 120 : 70 }]} arrowicon={<DropDownArrow />}
                                dropdownStyles={styles(theme).dropDownContainer} label={item.label} dropdownTextStyles={styles(theme).selectInput} data={item.data} 
                                save='value' setSelected={(value) => item.onSelect(value)}/>
                            )
                        })}
                        {room > -1 &&
                        <Pressable onPress={onDatePress}>                            
                            <View style={[ styles(theme).selectContainer, { flexDirection: 'row', height: 50 }]}>
                                {date ?
                                <Text style={styles(theme).selectInput}>{date}</Text> :
                                <Text style={styles(theme).selectInput}>Select Date</Text>}
                            </View>
                        </Pressable>}
                        {room > -1 &&
                        <View style={{ width, paddingHorizontal: 20 }}>
                            <InputField placeholder="No of people" keyboardType='numeric' maxLength={2} onInputChange={onPeopleChange}/>
                            <Text style={[ styles(theme).maxPeople, { color: error ? theme.error : theme. primary } ]}>Max {props.floorPlan[floor].rooms[room].maxSeats} People</Text>
                        </View>}
                        <Modal
                        isVisible={isDatePicker}
                        onBackdropPress={() => setDatePicker(false)}
                        style={{ justifyContent: 'flex-end', margin: 0 }}>
                            <DatePicker theme={theme} onSelected={onDatesSelected} isRange={false}/>
                        </Modal>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <Button buttonText={'Book Room'} underlayColor={theme.accentRGB} activeOpacity={0.6} onButtonClick={onBook} 
            buttonStyle={styles(theme).bookButton} isDisabled={error || (floor < 0 || room < 0 || !people || !date)}/>
        </KeyboardAvoidingView>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        floorPlan: state.metadata.floorPlan        
    };
}

export default connect(
    mapStateToProps,
    actions
)(RoomBookingScreen);

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    view: {
        flex: 1,
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
    maxPeople: {
        fontSize: 14,
        fontFamily: 'ProductSansBold',
        paddingStart: 5
    },
    inputContainer: {
        flex: 2.5,
        width,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30
    },
    bookButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        alignSelf: 'center',
        backgroundColor: theme.primary,
        borderRadius: 10,
        textColor: theme.white,
        position: 'absolute',
        bottom: 15
    },
    selectContainer: {
        justifyContent: 'flex-start',
        width: width - 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.primary,
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    dropDownContainer: {
        width: width - 40,
        borderWidth: 1,
        borderColor: theme.primary,
        alignSelf: 'center',
        paddingVertical: 5,
        backgroundColor: theme.surface
    },
    selectInput: {
        fontFamily: 'ProductSans',
        color: theme.white
    }
})