import React from 'react';
import { View, TouchableOpacity, Text, TouchableHighlight, Image } from 'react-native';

export const Button = ({ 
    buttonText, 
    onButtonClick, 
    buttonStyle, 
    isOpacity = true, 
    underlayColor, 
    activeOpacity, 
    isDisabled = false,
    isIcon = false,
    iconImage = undefined,
    iconStyle = undefined
 }) => {

    const style = isDisabled ? { ...buttonStyle, ...{ backgroundColor: 'grey', borderColor: 'grey' } } : buttonStyle;

    return (
            <>
            {isOpacity &&
            <TouchableOpacity onPress={onButtonClick} disabled={isDisabled} style={style}>
                <View>
                    {isIcon ?
                    <Image source={iconImage} style={iconStyle} resizeMode='cover' /> :
                    <Text style={{
                        color: buttonStyle.textColor,
                        fontFamily: 'ProductSans',
                        fontSize: 16,
                        opacity: 1
                    }}>{buttonText}</Text>}
                </View>
            </TouchableOpacity>}
            {!isOpacity &&
            <TouchableHighlight onPress={onButtonClick} underlayColor={underlayColor} activeOpacity={activeOpacity} disabled={isDisabled} style={style}>
                <View>
                    {isIcon ?
                    <Image source={iconImage} style={iconStyle} resizeMode='cover' /> :
                    <Text style={{
                        color: buttonStyle.textColor,
                        fontFamily: 'ProductSans',
                        fontSize: 16,
                        opacity: 1
                    }}>{buttonText}</Text>}
                </View>
            </TouchableHighlight>}
            </>
    )

}