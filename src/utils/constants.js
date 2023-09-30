import { Dimensions } from "react-native";

export const { width , height } = Dimensions.get("window");

export const ColorModes = {

    dark: {
        white: "#fafafa",
        whiteRGB: "rgba(250, 250, 250, 0.5)",
        background: "#0e0f10",
        backgroundRGB: "rgba(14,15,16, 0.5)",
        keyboardDefault: "#5e666a",
        outline: "#5e666a",
        primary: "#4acfac",
        accent: "#7df5d5",
        accentRGB: "rgba(74, 207, 172, 0.5)"     
    },

    light: {
        white: "#000000",
        whiteRGB: "rgba(0, 0, 0, 0.5)",
        background: "#fafafa",
        backgroundRGB: "rgba(255,255,255, 0.5)",
        keyboardDefault: "#5e666a",
        outline: "#000000",
        primary: "#4acfac",
        accent: "#7df5d5",
        accentRGB: "rgba(74, 207, 172, 0.5)"
    }

}

export const ACTION_TYPES = {
    isLoggedIn: "SET_LOGGED_IN",
    darkMode: "SET_DARK_MODE"
}