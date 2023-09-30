import React from 'react';
import { View, TouchableOpacity, Text, TouchableHighlight } from 'react-native';

export const Button = (props) => {

    const { buttonText, onButtonClick, buttonStyle, isOpacity = true, underlayColor, activeOpacity } = props;

    return (
        <View>
            {isOpacity &&
            <TouchableOpacity onPress={onButtonClick} style={buttonStyle}>
                <View style={buttonStyle}>
                    <Text style={{
                        color: buttonStyle.textColor,
                        fontFamily: 'ProductSans'
                    }}>{buttonText}</Text>
                </View>
            </TouchableOpacity>}
            {!isOpacity &&
            <TouchableHighlight onPress={onButtonClick} style={buttonStyle}
                underlayColor={underlayColor} activeOpacity={activeOpacity}>
                <View style={buttonStyle}>
                    <Text style={{
                        color: buttonStyle.textColor,
                        fontFamily: 'ProductSans'
                    }}>{buttonText}</Text>
                </View>
            </TouchableHighlight>}
        </View>
    )

}