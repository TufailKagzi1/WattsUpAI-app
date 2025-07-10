import { CustomInputProp } from '@/types/InputProps'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

const CustomInput = ({
    label,
    placeholder,
    keyboardType = 'default',
    value,
    onChangeText,
    secureTextEntery = false,
    error
}: CustomInputProp & { error?: string }) => (
    <View className=''>
        <Text className='mb-2'>{label}</Text>
        <TextInput
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType={keyboardType}
            value={value}
            secureTextEntry={secureTextEntery}
            placeholder={placeholder}
            onChangeText={onChangeText}
            className='rounded-xl p-4 bg-[#F4F6FA]'
        />
        {error && <Text className='text-warning text-sm mt-1'>{error}</Text>}
    </View>
)


export default CustomInput