import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, LayoutAnimation, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { width, COLOR_MODES } from '../utils/constants';
import { CalendarUtils } from 'react-native-calendars';
import { LineChart } from 'react-native-chart-kit';
import InputField from '../components/InputField';
import { SelectList } from 'react-native-dropdown-select-list';
import { Button } from '../components/Button';

const AdminStatisticsSreen = (props) => {
    
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light; 
    
    const [data, setData] = useState([15, 13, 14, 10, 18, 7]);
    const today = CalendarUtils.getCalendarDateString(new Date());
    const [isMonth, setMonth] = useState(true);
    const [selected, setSelected] = useState(0);
    const [type, setType] = useState(0);
    const [input, setInput] = useState('');
    const [isGraph, setGraph] = useState(true);
    const [isSearch, setSearch] = useState(false);

    const units = [
        { key: 0, value: 'Global Functional Technologies'},
        { key: 1, value: 'Global Reconcilliation Unit'},
        { key: 2, value: 'Olympus Operations'},
        { key: 3, value: 'GENESYS Systems'},
    ]
    
    const DropDownArrow = () => {
        const arrowIcon = require('../../assets/images/down.png');
        return (
            <Image source={arrowIcon} style={{ width: 15, height: 15, margin: 5, resizeMode: 'contain', tintColor: theme.white }} />
        )
    }
    
    const placeholder = type === 1 ? 'Business Unit' : 'User ID';

    const onFocus = () => {
        setGraph(false);
        if(input) setSearch(true);
    }

    const onInputChange = (value) => {         
        LayoutAnimation.configureNext({
            duration: 250,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'linear', property: 'opacity' },
            delete: { type: 'linear', property: 'opacity' }
        });
        if(value) {
            setSearch(true)
        } else {
            setSearch(false)
        }
        setInput(value);
    }

    const onSelectChange = (value) => {  
        setInput(value);
        setGraph(true);
    }

    const onSearch = () => {
        LayoutAnimation.configureNext({
            duration: 250,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'linear', property: 'opacity' },
            delete: { type: 'linear', property: 'opacity' }
        });
        setSearch(false);
        setGraph(true);
    }

    const getSearchComponent = () => {
        if(type === 2) {
            return (
            <View style={{ width, paddingHorizontal: 20, marginTop: 5 }}>
                <InputField onFocus={onFocus} placeholder={placeholder} onInputChange={onInputChange} />
                {isSearch && <Button onButtonClick={onSearch} buttonText={'Search'} buttonStyle={styles(theme).searchButton} />}
            </View>
            )
        } else {
            return (
                <View style={{ width, justifyContent: 'center', marginTop: 5, alignItems: 'center' }}>
                    <SelectList placeholder={placeholder} search={false} inputStyles={styles(theme).selectInput}
                    boxStyles={[styles(theme).selectContainer, { height: 50 }]} arrowicon={<DropDownArrow />}
                    dropdownStyles={styles(theme).dropDownContainer} dropdownTextStyles={styles(theme).selectInput} data={units} 
                    save='value' setSelected={(value) => onSelectChange(value)} />
                </View>
            )
        }
    }

    const onChange = (index) => {
        setGraph(false);
        LayoutAnimation.configureNext({
            duration: 250,
            create: { type: 'linear', property: 'opacity' },
            update: { type: 'linear', property: 'opacity' },
            delete: { type: 'linear', property: 'opacity' }
        });
        setType(index);
        if(index === 0) setGraph(true);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <View style={styles(theme).container}>
            <View style={styles(theme).titleContainer}>
                <Text style={styles(theme).title}>Booking Statistics</Text>
            </View>                          
            <View style={styles(theme).inputContainer}>
            <View style={{ height: 50, width, paddingHorizontal: 20, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center',
                 marginBottom: type === 0 ? 20 : 10 }}>
                    <TouchableOpacity onPress={() => onChange(0)} style={{
                        borderTopStartRadius: 10,
                        borderBottomStartRadius: 10,
                        borderWidth: 1,
                        borderColor: theme.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        flex: 1,
                        backgroundColor: type === 0 ? theme.primary : theme.background
                    }}>
                        <Text style={[styles(theme).month, { color: type === 0 ? theme.white : theme.primary }]}>Origanization</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChange(1)} style={{
                        borderWidth: 1,
                        borderColor: theme.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        flex: 1,
                        borderStartWidth: 0,
                        borderEndWidth: 0,
                        backgroundColor: type === 1 ? theme.primary : theme.background
                    }}>
                        <Text style={[styles(theme).month, { color: type === 1 ? theme.white : theme.primary }]}>Business Unit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChange(2)} style={{
                        borderTopEndRadius: 10,
                        borderBottomEndRadius: 10,
                        borderWidth: 1,
                        borderColor: theme.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        flex: 1,
                        backgroundColor: type  === 2 ? theme.primary : theme.background
                    }}>
                        <Text style={[styles(theme).month, { color: type === 2 ? theme.white : theme.primary }]}>User</Text>
                    </TouchableOpacity>
                </View>
                {type !== 0 &&
                <View>
                    {getSearchComponent()}
                </View>}
                {isGraph &&
                <View style={{ justifyContent: 'center', alignItems: 'center', width }}>
                    <LineChart
                        data={{
                            labels: ["Jun", "Jul", "Aug", "Sept", "Oct", "Nov"],
                            datasets: [
                            {
                                data: [...data]
                            }
                            ]
                        }}
                        width={width-40} // from react-native
                        height={350}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: theme.background,
                            backgroundGradientFrom: theme.background,
                            backgroundGradientTo: theme.background,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            decimalPlaces: 0,
                            style: {
                            borderRadius: 10
                            },
                            propsForDots: {
                            r: "2",
                            strokeWidth: "3",
                            stroke: theme.primary
                            },
                            propsForLabels: {
                                stroke: theme.primary
                            }
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} />
                    <View style={{ height: 40, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', marginTop: 15, marginBottom: 35 }}>
                        <TouchableOpacity onPress={() => setMonth(true)} style={{
                            borderTopStartRadius: 10,
                            borderBottomStartRadius: 10,
                            borderWidth: 1,
                            borderColor: theme.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 80,
                            backgroundColor: isMonth ? theme.primary : theme.background
                        }}>
                            <Text style={[styles(theme).month, { color: isMonth ? theme.white : theme.primary }]}>Monthly</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMonth(false)} style={{
                            borderTopEndRadius: 10,
                            borderBottomEndRadius: 10,
                            borderWidth: 1,
                            borderColor: theme.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 30,
                            width: 80,
                            backgroundColor: isMonth ? theme.background : theme.primary
                        }}>
                            <Text style={[styles(theme).month, { color: isMonth ? theme.primary : theme.white }]}>Weekly</Text>
                        </TouchableOpacity>
                    </View>
                </View>}
            </View>
        </View>
        </TouchableWithoutFeedback>
    )

}

function mapStateToProps(state) {
    return {
        bookings: state.bookings.bookings,
        isDarkMode: state.settings.isDarkMode,
        userData: state.auth.userData,
        delegatesDetails: state.auth.delegatesDetails,
    }
}

export default connect(
    mapStateToProps,
    actions
) (AdminStatisticsSreen);

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
        paddingStart: 20,
    },
    title: {
        fontSize: 60,
        fontFamily: 'ProductSansBold',
        color: theme.primary,
    },
    month: {
        fontSize: 14,
        fontFamily: 'ProductSansBold',
        color: theme.white,
    },
    inputContainer: {
        flex: 3,
        width,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
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
    },
    searchButton: {
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
        marginTop: 5
    },
});