import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import * as Icons from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { mapMarkers, openMarker } from '../stores/actionCreator'
import { useNavigation } from '@react-navigation/native'

const MapEatsScreen = () => {
  const navigator = useNavigation()
  const dispatcher = useDispatch()
  const { markers:bussinessMarker } = useSelector((state) => state.ux)

  useLayoutEffect(() => {
    dispatcher(mapMarkers())
  }, [])

  return (
    <>
      <View className='absolute top-16 left-5 z-50 w-10 h-10 items-center justify-center bg-white rounded-full shadow border-[1px] border-gray-200'>
        <TouchableOpacity className='flex-row justify-between' onPress={()=>navigator.navigate('HomeScreen')}>
          <Icons.Feather name='arrow-left' className='text-2xl'/>
        </TouchableOpacity>
      </View>
      <MapView
        className='flex-1'
        initialRegion={{
          maptype: 'mutedStandard',
          latitude: -6.2608437,
          longitude: 106.7815256,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >

        {
          bussinessMarker.map((marker) => (
            <Marker key={marker.id} coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude}
            } title={marker.name} description='origin'>
                <View className='p-2 bg-white rounded-full shadow border-[1px] border-gray-200'>
                  <Text className='text-3xl'>{String.fromCodePoint(parseInt (marker.icon, 16))}</Text>
                </View>
                <Callout tooltip>
                  <View className="h-16 w-56 bg-white rounded-xl">
                    <TouchableOpacity className='pl-2 h-full w-full bg-white rounded-xl flex-row flex-1 items-center border-[1px] border-gray-200 shadow'
                      onPress={()=>dispatcher(openMarker())}>
                      <Image source={{uri:marker.imageUrl}} className='h-12 w-12 rounded-xl'/>
                      <View className='flex-1 px-2'>
                        <View>
                          <Text className='text-lg'>{marker.name.length>17?marker.name.slice(0,14)+'...':marker.name}</Text>
                          <Text className='text-xs font-light text-gray-500'>{marker.description.length>20?marker.description.slice(0,25)+'...':marker.description}</Text>
                        </View>
                      </View>
                      <View className='h-full w-10 rounded-r-xl pr-2'>
                        <View className='flex-1 w-full h-full items-center justify-center border-b-[1px] border-gray-200'>
                          <Icons.FontAwesome5 name="users" className='text-2xl text-gray-800'/>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Callout>
            </Marker>
          ))
        }
      </MapView>
    </>
  )
}

export default MapEatsScreen