import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { width } from "../utils/constants";
import { parseSeatNo } from "../utils/utilities";

export const SeatSelection = ({ seatPlan, theme }) => {

    return (
        <View style={styles(theme).container}>
            <Text>
                {seatPlan.structure}
            </Text>
        </View>
    )

}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 4,
        width,
        padding: 20,
        justifyContent: 'flex-start',
        marginTop: 30
    },
})