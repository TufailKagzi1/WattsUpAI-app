import CustomButton from '@/components/buttons/CustomButton';
import CustomInput from '@/components/Inputs/CustomInput';
import { useAuth } from '@/features/auth/selectors/useAuth';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Login = () => {

  const { login, error, isLoading, user } = useAuth();

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!data.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = 'Enter a Valid email address';
      valid = false;
    }

    if (!data.password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;

  };

  const handleLogin = async () => {
    if (validate()) {
      await login(data.email, data.password);
      console.log(user);
      if (user !== null) {
        router.push('/(tabs)/Dashboard');
      }
    }
  };

  return (
    <View>
      <View className='flex justify-center items-center'>
        <Text className='text-text-dark text-3xl font-semibold'>Login</Text>
      </View>
      {error && <View className='flex justify-center items-center mt-2'><Text>{error}</Text></View>}
      <View className='gap-8'>
        <CustomInput
          label='Email'
          value={data.email}
          keyboardType='email-address'
          placeholder='your@example.com'
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, email: text }));
            setErrors(prev => ({ ...prev, email: '' }));
          }}
          error={errors.email}
        />

        <View>
          <CustomInput
            label='Pasword'
            value={data.password}
            keyboardType='default'
            secureTextEntery={true}
            placeholder='Password'
            onChangeText={(text) => {
              setData((prev) => ({ ...prev, password: text }));
              setErrors(prev => ({ ...prev, password: '' }));
            }}
            error={errors.password}
          />
          <View className='flex-row justify-end'>
            <Text className='text-text-muted text-sm mt-1'>Forgot password?</Text>
          </View>
        </View>

        <CustomButton
          title='Login'
          style='bg-secondary p-2 rounded-2xl'
          textStyle='text-text-dark text-xl font-semibold'
          onPress={handleLogin}
          isLoading={isLoading}
        />

        <View className='flex justify-center items-center flex-row gap-2'>
          <Text className='text-text-muted font-semibold'>Don&apos;t have an account?</Text>
          <Link href="/(auth)/Register" className='text-primary font-semibold'>
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  )
}

export default Login