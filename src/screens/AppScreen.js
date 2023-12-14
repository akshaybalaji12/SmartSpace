import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../services/NavigationService';
import { connect } from 'react-redux';
import * as actions from '../actions';

import { COLOR_MODES } from '../utils/constants';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import BookingScreen from './BookingScreen';
import SignUpScreen from './SignUpScreen';
import Header from '../components/Header';
import DelegatesScreen from './DelegatesScreen';
import VisitorScreen from './VisitorScreen';
import YourBookingsScreen from './YourBookingsScreen';
import RoomBookingScreen from './RoomBookingScreen';
import StatisticsScreen from './StatisticsScreen';
import AdminStatisticsScreen from './AdminStatisticsScreen';
import AdminHomeScreen from './AdminHomeScreen';
import AdminApprovalScreen from './AdminApprovalScreen';

const Stack = createNativeStackNavigator();

const AppScreen = (props) => {
  
  const theme = props.isDarkMode ? COLOR_MODES.dark : COLOR_MODES.light;

  return(
    <>
      <Header theme={theme} />
      <NavigationContainer ref={navigationRef}>
          {props.isLoggedIn ?
          (props.user === 'admin' ?
          <Stack.Navigator
          screenOptions={{
              headerShown: false,
              animation:'slide_from_right'
          }}>
            <Stack.Screen name="Home" component={AdminHomeScreen} />
            <Stack.Screen name="AdminStats" component={AdminStatisticsScreen} />
            <Stack.Screen name="AdminApproval" component={AdminApprovalScreen} />
          </Stack.Navigator> : 
          <Stack.Navigator
          screenOptions={{
              headerShown: false,
              animation:'slide_from_right'
          }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Delegates" component={DelegatesScreen} />
            <Stack.Screen name="Visitor" component={VisitorScreen} />
            <Stack.Screen name="YourBooking" component={YourBookingsScreen} />
            <Stack.Screen name="RoomBooking" component={RoomBookingScreen} />
            <Stack.Screen name="Statistics" component={StatisticsScreen} />
            <Stack.Screen name="AdminStats" component={AdminStatisticsScreen} />
            <Stack.Screen name="AdminApproval" component={AdminApprovalScreen} />
          </Stack.Navigator>) :
          <Stack.Navigator
          screenOptions={{
              headerShown: false,
              animation:'slide_from_left'
          }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
          </Stack.Navigator>
          }
      </NavigationContainer>
    </>
  )

}

function mapStateToProps(state) {
  return {
      isLoggedIn: state.settings.isLoggedIn,
      isDarkMode: state.settings.isDarkMode,
      user: state.settings.loggedInUser
  };
}

export default connect(
  mapStateToProps,
  actions
)(AppScreen);