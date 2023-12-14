import { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet } from 'react-native';
//import CalendarPicker from 'react-native-calendar-picker';
import { Calendar, CalendarUtils } from "react-native-calendars";
import { width, height } from "../utils/constants";
import { Button } from "./Button";

export const DatePicker = ({ theme, onSelected, isRange = true }) => {

    const [markedDates, setMarkedDates] = useState({});

    const startingDay = { startingDay: true, color: theme.primary, textColor: 'white' };
    const endingDay = { endingDay: true, color: theme.primary, disabled: false };
    const markedDay = { color: theme.primary, disabled: false };
    const markedDaySingle = { color: theme.primary, disabled: false, startingDay: true, endingDay: true, textColor: 'white' };

    const today = new Date();
    const todayString = CalendarUtils.getCalendarDateString(today);

    onButtonSelect = () => {
        let dates = [];
        for(let date in markedDates) {
            dates.push(date);
        }
        dates.sort();
        onSelected(dates);
    }

    const onDaySelect = useCallback((day) => {
        if(isRange) {
            const selectedDates = Object.keys(markedDates);
            selectedDates.sort();
            const dateString = day.dateString;
            const selectedDate = new Date(dateString);
            const dayOfWeek = selectedDate.getDay();
            const jump = 6 - dayOfWeek;

            if(selectedDates.includes(dateString)) {
                getMarkedDates(dateString);
            } else {
                if(checkSameWeek(selectedDate, selectedDates[0])) {
                    addDayToMarked(selectedDate);
                } else {
                    getMarkedWeek(selectedDate, jump);
                }
            }
        } else {            
            const dateString = day.dateString;
            const currDate = {};
            currDate[dateString] = markedDaySingle;
            setMarkedDates(currDate);
        }
    }, [markedDates])

    const getMarkedWeek = (date, jump) => {
        let jumpDate;
        let markedDates = {};
        if(jump === 0) {
            markedDates[CalendarUtils.getCalendarDateString(date)] = markedDaySingle;
            setMarkedDates(markedDates);
            return;
        }
        markedDates[CalendarUtils.getCalendarDateString(date)] = startingDay;
        for(let i=1;i<=jump;i++) {
            jumpDate = date.setDate(date.getDate() + 1);
            if(i == jump) {
                markedDates[CalendarUtils.getCalendarDateString(jumpDate)] = endingDay;
            } else {
                markedDates[CalendarUtils.getCalendarDateString(jumpDate)] = markedDay;
            }
        }
        setMarkedDates(markedDates);
    }

    checkSameWeek = (selectedDate, markedDay) => {
        const markedDate = new Date(markedDay);
        return (Math.abs(markedDate.getDate() - selectedDate.getDate()) <= (6 - markedDate.getDay()))
    }

    const getMarkedDates = (selectedDate) => {
        const currDates = { ...markedDates };
        delete currDates[selectedDate];
        for(date in currDates) {
            currDates[date] = markedDaySingle;
        }
        setMarkedDates(currDates);
    }

    const addDayToMarked = (selectedDate) => {
        const currDates = { ...markedDates };
        currDates[CalendarUtils.getCalendarDateString(selectedDate)] = markedDaySingle;
        setMarkedDates(currDates);
    }

    return(
        <View style={styles(theme).calendarContainer}>
            <Calendar 
            style={{
                borderRadius: 10
            }}
            theme={{
                calendarBackground: theme.background,
                textMonthFontFamily: 'ProductSansBold',
                textDayFontFamily: 'ProductSans',
                textDayHeaderFontFamily: 'ProductSans',
                arrowColor: theme.primary,
                monthTextColor: theme.primary,
                dayTextColor: theme.white,
                todayTextColor: theme.primary,
                todayDotColor: theme.primary,
                textDisabledColor: theme.primaryFade,
            }}
            minDate={todayString}
            onDayPress={onDaySelect}
            markingType="period"
            markedDates={markedDates}
            />
            <Button buttonText={'Select'} isOpacity={true} onButtonClick={onButtonSelect} buttonStyle={styles(theme).selectButton}/>
        </View>
    )
}

const styles = (theme) => StyleSheet.create({
    calendarContainer: {
        width,
        alignSelf: 'center',
        justifyContent: 'flex-end',
        backgroundColor: theme.background
    },
    selectButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: width - 40,
        backgroundColor: theme.primary,
        borderWidth: 1,
        borderRadius: 10,
        textColor: theme.white,
        margin: 15,
        alignSelf: 'center'
    },
})