import { CustomButtonProps } from '@/src/types/InputProps'
import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'

const CustomButton = ({ title, style, textStyle, leftIcon, isLoading = false, onPress }: CustomButtonProps) => {
    return (
        <TouchableOpacity className={style} onPress={onPress}>
            {leftIcon}
            <View className='flex justify-center items-center flex-row'>
                {isLoading ? (
                    <ActivityIndicator size={'small'} color="white" />
                ) : (
                    <Text className={textStyle}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton