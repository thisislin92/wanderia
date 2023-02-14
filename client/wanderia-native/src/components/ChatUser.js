import { Text, View } from 'react-native'
import React from 'react'
import * as Icons from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const ChatUser = ({ username }) => {
  const navigator=useNavigation()
  return (
    <View className={`${username=='fahmifachrizal'?`bg-[#4a388e]`:`bg-gray-300`} rounded-xl flex-row items-center gap-x-1 px-1 border-[1px]`}>
      <Icons.FontAwesome name='user-circle-o' className={`${username=='fahmifachrizal'&&`text-white`} py-1 pr-1`}/>
      <Text className={`${username=='fahmifachrizal'&&`text-white`} py-1 pr-1`}>{ username }</Text>
    </View>
  )
}

export default ChatUser