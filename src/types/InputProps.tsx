import { ReactNode } from "react";
import { GestureResponderEvent } from "react-native";

export interface CustomInputProp {
    label?: string;
    placeholder?: string;
    value: string,
    onChangeText?: (text: string) => void;
    secureTextEntery?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

export interface CustomButtonProps {
    title: string;
    style?: string;
    textStyle?: string;
    leftIcon?: ReactNode;
    isLoading?: boolean;
    onPress?: (text: GestureResponderEvent) => void;
}