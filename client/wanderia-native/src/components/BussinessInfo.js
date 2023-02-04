import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Icons from '@expo/vector-icons'
import { openMarker } from '../stores/actionCreator'
import { useNavigation } from '@react-navigation/native'
import ChatUser from './ChatUser'


const BussinessInfo = () => {
  const navigator = useNavigation()
  const dispatcher = useDispatch()

  const { markerState } = useSelector((state) => state.ux)
  return (
    <>
      { markerState?
          <TouchableOpacity className='fixed -top-5 z-50 items-center justify-center'
            onPress={()=>dispatcher(openMarker())}>
            <View className='h-10 w-10 bg-white items-center justify-center rounded-full border-[1px] border-gray-200'>
              <Icons.MaterialCommunityIcons name="chevron-double-down" className='text-3xl text-gray-800 rounded-xl'/>
            </View>
          </TouchableOpacity>:null
        }
      <ScrollView className='px-4'>
        <View className='flex-row gap-4 mb-4'>
          <Image source={{uri:'https://i.pravatar.cc/300'}} className='w-24 h-32 rounded-xl'/>
          <View className='gap-[2px]'>
            <Text className='text-2xl font-semibold'>Bussiness Name</Text>
            <Text className='text-lg'>Category</Text>
            <Text className='text-gray-400'>address</Text>
            <Text className=''>description</Text>
          </View>
        </View>
        <View className='mb-2'>
          <TouchableOpacity className='flex-row justify-between' onPress={()=>navigator.navigate('HangoutScreen')}>
            <Text className='text-2xl font-semibold mb-1'>Hangouts</Text>
            <Icons.Feather name='arrow-right' className='text-xl'/>
          </TouchableOpacity>
          <ScrollView horizontal className='flex-row gap-2'>
            <View>
              <ChatUser username={'fahmifachrizal'} />
            </View>
            <View>
              <ChatUser username={'user1'} />
            </View>
            <View>
              <ChatUser username={'user2'} />
            </View>
          </ScrollView>
        </View>
        <View>
          <Text className='text-2xl font-semibold mb-1'>Events & Promos</Text>
          <ScrollView horizontal className='gap-2'>
            <TouchableOpacity>
              <Image source={{uri:'https://i.pravatar.cc/300'}} className='w-24 h-24 rounded-xl'/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:'https://i.pravatar.cc/300'}} className='w-24 h-24 rounded-xl'/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:'https://i.pravatar.cc/300'}} className='w-24 h-24 rounded-xl'/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:'https://i.pravatar.cc/300'}} className='w-24 h-24 rounded-xl'/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={{uri:'https://i.pravatar.cc/300'}} className='w-24 h-24 rounded-xl'/>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  )
}

export default BussinessInfo