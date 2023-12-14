import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Pressable } from 'react-native'
import { connect, useSelector } from 'react-redux';
import * as actions from '../actions';
import { COLOR_MODES, width } from '../utils/constants';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { DatePicker } from '../components/DatePicker';
import Modal from 'react-native-modal';

const LocationFragment = (props) => {

    const isRendered = useRef(false);
    
    const [floor, setFloor] = useState(-1);
    const [zone, setZone] = useState(-1);
    const [dates, setDates] = useState([]);
    const [selectList, setList] = useState([]);
    const [isDatePicker, setDatePicker] = useState(false);
    
    useEffect(() => {
        props.requestFloorPlan();
    }, []);

    useEffect(() => {
        if(dates.length > 0) {
            const bookingData = {
                userID: props.user,
                floorNo: `Floor ${props.floorPlan[floor].level}`,
                zone: `Zone ${props.floorPlan[floor].zones[zone].zone}`,
                dates: [...dates]
            }
            props.onComplete(bookingData);
        }
    }, [dates, floor, zone]);

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
            const zoneData = props.floorPlan[floor].zones.map((zone, index) => {
                return {
                    key: index,
                    value: `Zone ${zone.zone}`
                }
            });
            const zoneSelect = {
                key: 'zoneSelect',
                data: zoneData,
                onSelect: (zone) => setZone(zone),
                placeholder: 'Select Zone',
                type: 'single'
            }
    
            setList(prevList => [ ...prevList, zoneSelect ]);
        }
    }, [floor]);

    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;
    
    const DropDownArrow = () => {
        const arrowIcon = require('../../assets/images/down.png');
        return (
            <Image source={arrowIcon} style={{ width: 15, height: 15, margin: 5, resizeMode: 'contain', tintColor: theme.white }} />
        )
    }

    const onDatePress = () => {
        setDatePicker(true);
    }

    const onDatesSelected = (selectedDates) => {
        setDates([...selectedDates]);
        setDatePicker(false);
    }

    const getDateRange = () => {
        if(dates.length === 1) return dates[0]
        return `${dates[0].replaceAll("-", "/")}  to  ${dates[dates.length - 1].replaceAll("-", "/")}`
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles(theme).container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={styles(theme).view}>
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
                        {zone > -1 &&
                        <Pressable onPress={onDatePress}>                            
                            <View style={[ styles(theme).selectContainer, { flexDirection: 'row', height: 50 }]}>
                                {dates.length > 0 ?
                                <Text style={styles(theme).selectInput}>{getDateRange()}</Text> :
                                <Text style={styles(theme).selectInput}>Select Date</Text>}
                            </View>
                        </Pressable>}
                        <Modal
                        isVisible={isDatePicker}
                        onBackdropPress={() => setDatePicker(false)}
                        style={{ justifyContent: 'flex-end', margin: 0 }}>
                            <DatePicker theme={theme} onSelected={onDatesSelected}/>
                        </Modal>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )

}

function mapStateToProps(state) {
    return {
        isDarkMode: state.settings.isDarkMode,
        floorPlan: state.metadata.floorPlan,
        user: state.settings.loggedInUser  
    };
}

export default connect(
    mapStateToProps,
    actions
)(LocationFragment);

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background
    },
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleContainer: {
        flex: 2,
        width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
        paddingStart: 20,
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        backgroundColor: theme.primary
    },
    title: {
        fontSize: 60,
        fontFamily: 'ProductSansBold',
        color: theme.white,
    },
    inputContainer: {
        flex: 4,
        width,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 30
    },
    nextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        alignSelf: 'center',
        borderColor: theme.primary,
        backgroundColor: theme.primary,
        borderWidth: 1,
        borderRadius: 10,
        textColor: theme.white,
        margin: 20
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