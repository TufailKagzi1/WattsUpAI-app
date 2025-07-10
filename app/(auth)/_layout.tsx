import { Redirect, Slot } from 'expo-router';
import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import logo from '../../assets/images/logo.png';
import { useAuth } from '@/features/auth/selectors/useAuth';

const AuthLayout = () => {
    
    const { user } = useAuth();

    if (user) {
        return <Redirect href={'/(tabs)/Dashboard'} />
    }

    return(
    <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
            style={styles.flexContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
        >
            <ScrollView
                contentContainerStyle={styles.flexGrow}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.logoWrapper}>
                    <Image source={logo} className='h-40 w-full' resizeMode='contain'/>
                </View>
                <View style={styles.slotWrapper}>
                    <Slot />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
)};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    flexContainer: {
        flex: 1,
    },
    flexGrow: {
        flexGrow: 1,
    },
    logoWrapper: {
        alignItems: 'center',
        width: '100%',
        marginTop: 60,
    },
    logo: {
        width: 200,
        height: 80,
        resizeMode: 'contain',
    },
    slotWrapper: {
        flex: 1,
        margin: 20,
        marginTop: 0,
        backgroundColor: '#f9fafb',
        borderRadius: 24,
        padding: 20,
    },
});

export default AuthLayout;
