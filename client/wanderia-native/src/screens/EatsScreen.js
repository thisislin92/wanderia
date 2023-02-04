import { View, Text, StyleSheet, Button, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import MapEatsScreen from '../components/MapEatsScreen'
import { useDispatch, useSelector } from 'react-redux'
import BussinessInfo from '../components/BussinessInfo'
import * as Icons from '@expo/vector-icons'
import { openMarker } from '../stores/actionCreator'

const EatScreen = () => {
  const dispatcher = useDispatch()
  const { markerState } = useSelector((state) => state.ux)


  return (
      <View className='flex-1 flex-col relative'>
        <View className='flex-1 w-full z-40'>
          <MapEatsScreen />
        </View>
        <View className={`${markerState?`h-1/2`:`h-0`} duration-200 w-full bg-white  z-40`}>
          <BussinessInfo />
        </View>
      </View>
  )
}

export default EatScreen