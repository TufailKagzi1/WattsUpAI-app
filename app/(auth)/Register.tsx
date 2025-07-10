import CustomButton from '@/components/buttons/CustomButton';
import CustomInput from '@/components/Inputs/CustomInput';
import { useAuth } from '@/features/auth/selectors/useAuth';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

const Register = () => {

  const { user, register, error, isLoading } = useAuth();

  const [data, setData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', phone: '', email: '', password: '' };

    if (!data.name) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!data.phone) {
      newErrors.phone = 'Phone is required';
      valid = false;
    }

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

  const handleRegister = async () => {
    if (validate()) {
      await register({email:data.email, name:data.name, password:data.password, phone:data.phone});
      if (user) {
        router.push('/(auth)/Login');
      }
    }
  }

  return (
    <View>
      <View className='flex justify-center items-center'>
        <Text className='text-text-dark text-3xl font-semibold'>Register</Text>
      </View>

      {error && <View className='flex justify-center items-center mt-2'><Text>{error}</Text></View>}


      <View className='gap-8'>

        <CustomInput
          label='Name'
          value={data.name}
          keyboardType='default'
          placeholder='Full name'
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, name: text }));
            setErrors(prev => ({ ...prev, name: '' }));
          }}
          error={errors.name}
        />

        <CustomInput
          label='Phone'
          value={data.phone}
          keyboardType='numeric'
          placeholder='Phone number'
          onChangeText={(text) => {
            setData((prev) => ({ ...prev, phone: text }));
            setErrors(prev => ({ ...prev, phone: '' }));
          }}
          error={errors.phone} />

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
          error={errors.password} />


        <CustomButton
          title='Register'
          style='bg-secondary p-2 rounded-2xl'
          textStyle='text-text-dark text-xl font-semibold'
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <View className='flex justify-center items-center flex-row gap-2'>
          <Text className='text-text-muted font-semibold'>Already have an account?</Text>
          <Link href="/(auth)/Login" className='text-primary font-semibold'>
            Login
          </Link>
        </View>
      </View>
    </View>
  )
}

export default Register