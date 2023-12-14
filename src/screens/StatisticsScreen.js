import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { width, COLOR_MODES, MONTHS } from '../utils/constants';
import { LineChart } from 'react-native-chart-kit';
import { ActivityLoader } from '../components/ActivityLoader';

const StatisticsSreen = (props) => {
    
    const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light; 

    const [isMonth, setMonth] = useState(true);
    const [delegates, setDelegates] = useState([]);
    const [selected, setSelected] = useState(0);

    const [label, setLabel] = useState([]);
    const [chartData, setChartData] = useState([0]);

    useEffect(() => {
        props.requestStatistics(props.userData?.userID);
    }, []);
    
    useEffect(() => {
        if(props.statistics.length > 0) {
            const _delegates = props.statistics.map(delegate => {
                return {
                    name: delegate.firstName,
                    gender: delegate.gender,
                    isSelf: props.userData?.userID === delegate.userID
                }
            });
            setDelegates([..._delegates]);
        }
    }, [props.statistics]);

    useEffect(() => {
        if(props.statistics.length > 0 && selected >= 0) {
            const { userStats } = props.statistics[selected];
            let months = Object.keys(userStats);
            months.sort();
            const data = months.map(month => {
                return userStats[month]
            });
            months = months.map(month => {
                return MONTHS[parseInt(month)];
            })
            setLabel([...months]);
            setChartData([...data]);
        }
    }, [selected]);

    const getPersonImage = (gender) => {
        return gender === 'F' ? require('../../assets/images/woman.png') : require('../../assets/images/man.png');
    }

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).titleContainer}>
                <Text style={styles(theme).title}>Booking Statistics</Text>
            </View>                          
            <View style={styles(theme).inputContainer}>
                <View style={{ height: 40, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', marginTop: 15, marginBottom: 35 }}>
                    <TouchableOpacity onPress={() => setMonth(true)} style={{
                        borderTopStartRadius: 10,
                        borderBottomStartRadius: 10,
                        borderWidth: 1,
                        borderColor: theme.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 35,
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
                        height: 35,
                        width: 80,
                        backgroundColor: isMonth ? theme.background : theme.primary
                    }}>
                        <Text style={[styles(theme).month, { color: isMonth ? theme.primary : theme.white }]}>Weekly</Text>
                    </TouchableOpacity>
                </View>
                {props.isLoading ? 
                <ActivityLoader theme={theme} size='large' /> :
                <LineChart
                    data={{
                        labels: [...label],
                        datasets: [
                          {
                            data: [...chartData]
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
                    }} />}
                <View style={{ height: 60, justifyContent: 'center', flexDirection: 'row', alignSelf: 'center', width: width - 40 }}>
                    {delegates.map((delegate, index) => {
                        return (
                            <TouchableOpacity 
                            onPress={() => setSelected(index)}
                            key={delegate.name}
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 70,
                                marginHorizontal: 10,
                                opacity: index === selected ? 1 : 0.3
                            }}>
                                <Image style={{ width: index === selected ? 70 : 60, height: index === selected ? 70 : 60, resizeMode: 'cover', margin: 5 }} 
                                source={getPersonImage(delegate.gender)}/>
                                <Text style={[styles(theme).month, { color: theme.primary, fontSize: index === selected ? 14 : 12 }]}>{delegate.name}</Text>
                                {delegate.isSelf && <Text style={[styles(theme).month, { color: theme.primary, fontSize: index === selected ? 12 : 10 }]}>(Me)</Text>}
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </View>
    )

}

function mapStateToProps(state) {
    return {
        bookings: state.bookings.bookings,
        isDarkMode: state.settings.isDarkMode,
        userData: state.auth.userData,
        delegatesDetails: state.auth.delegatesDetails,
        statistics: state.auth.statistics,
        isLoading: state.auth.isLoading
    }
}

export default connect(
    mapStateToProps,
    actions
) (StatisticsSreen);

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
});