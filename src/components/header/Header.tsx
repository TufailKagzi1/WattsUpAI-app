import { useAuth } from '@/features/auth/selectors/useAuth'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import { logo } from 'assets/imageExport';

const Header = () => {
  // const { user } = useAuth();
  return (
    <View>
        <Image source={logo} className='h-32 w-20'/>
    </View>
  )
}

export default Header


// < View className = 'gap-1' >
//       <Text className='text-white text-2xl'>Hi {user?.name} 👋</Text>
//       <Text className='text-text-muted'>Here&apos;s your energy snapshot</Text>
//     </View >
// <TouchableOpacity className=''>
//   <FontAwesome name='bell-o' color="white" size={24} />
// </TouchableOpacity>