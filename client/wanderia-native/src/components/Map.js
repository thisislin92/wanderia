import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination, selectWaypoints, setBoundsWaypoint } from "../stores/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch } from "react-redux";
import { setTravelTimeInformation, selectStartNavigation, } from "../stores/slices/navSlice";
import * as Icons from "@expo/vector-icons";
import { mapMarkers, openMarker } from "../stores/actionCreator";
import { gql, useQuery } from "@apollo/client";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const waypoints = useSelector(selectWaypoints);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const startNavigation = useSelector(selectStartNavigation);
  const [ bounds, setBounds ] = useState(null);
  const { markerState, markers: bussinessMarker } = useSelector((state) => state.ux)

  const REQ_MARKER = gql`
    query AllBusiness($input: GetBusiness) {
      allBusiness(input: $input) {
        name
        id
        address
        latitude
        longitude
        imageUrl
        price
        rating
        category {
          symbol
        }
        posts {
          link
          name
          imageUrl
        }
      }
    }
  `
  let { loading, data, error, refetch } = useQuery(REQ_MARKER, { 
      variables: {
          input: {
          "neLat": (bounds? bounds.northEast.latitude:origin.location.lat+0.1).toString(),
          "swLat": (bounds? bounds.southWest.latitude:origin.location.lat-0.1).toString(),
          "neLon": (bounds? bounds.northEast.longitude:origin.location.lng+0.1).toString(),
          "swLon": (bounds? bounds.southWest.longitude:origin.location.lng-0.1).toString()
        }
      }
    }
  )

  console.log(bounds?'bounds':'origin',{
    neLat: (bounds? bounds.northEast.latitude:origin.location.lat+0.1).toString(),
    swLat: (bounds? bounds.southWest.latitude:origin.location.lat-0.1).toString(),
    neLon: (bounds? bounds.northEast.longitude:origin.location.lng+0.1).toString(),
    swLon: (bounds? bounds.southWest.longitude:origin.location.lng-0.1).toString()
  })

  useEffect(() => {
    if (data && startNavigation) {
      console.log(data, 'di effect_____________________________________________')
      dispatch(mapMarkers(data.allBusiness))
    }
  },[data])

  useEffect(()=>{
    if (bounds) {
      refetch()
    };
  }, [bounds])

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(
      ["origin", "destination"],
      { edgePadding: { top: 50, right: 50, bottom: 50, left: 50 } }
    );
  }, [origin, destination]);

  useEffect(() => {
    if (!startNavigation) return;
    mapRef.current.fitToSuppliedMarkers(["origin"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [startNavigation]);

  const onRegionChangeComplete = () => {
    mapRef.current.getMapBoundaries().then((map) => {
      dispatch(setBoundsWaypoint(map))
      setBounds(map)
    });
  };

  useEffect(() => {
    if (!origin || !destination) return;
    const getTravelTime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4`)
      .then((res) => res.json())
      .then((data) => {
        dispatch( setTravelTimeInformation(data.rows[0].elements[0]) );
      });
    };
    getTravelTime();
  }, [origin, destination]);

  return (
    <MapView
      ref={mapRef}
      // onMapLoaded=
      onRegionChangeComplete={onRegionChangeComplete}
      style={tw`h-full w-full`}
      mapType="mutedStandard"
      initialRegion={{
        // use device current location
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      showsMyLocationButton={true}
      camera={
        startNavigation ? {
          center: {
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          },
          pitch: 60,
          heading: 0,
          altitude: 1000,
          zoom: 20,
        } : {
          center: {
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          },
          zoom: 20,
        }
      }
    >

      {origin && destination && waypoints && (
          <MapViewDirections
              origin={origin.description}
              destination={destination.description}
              // optimizeWaypoints={true}
              // mode='TRANSIT'
              waypoints={
                waypoints.map(el=> {return {"longitude":+el.longitude,"latitude":+el.latitude}})
              }
              apikey="AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4"
              strokeWidth={4}
              strokeColor="purple"
          />
      )}

      {
        origin?.location && 
        <Marker title="Origin" description={origin.description} identifier="origin"
          coordinate={{ latitude: origin.location.lat, longitude: origin.location.lng }}
        >
          <View className='px-1 bg-blue-600 rounded-full shadow border-[1px] border-gray-200'>
            <Icons.MaterialIcons name='trip-origin' className='text-lg text-white'/> 
          </View>
        </Marker>
      }

      {
        destination?.location && 
        <Marker title="Destination" description={destination.description} identifier="destination"
          coordinate={{ latitude: destination.location.lat, longitude: destination.location.lng }}
          >
          <View className='px-1 bg-red-600 rounded-full shadow border-[1px] border-gray-200'>
            <Icons.MaterialIcons name='trip-origin' className='text-lg text-white'/> 
          </View>
        </Marker>
      }

      {
        waypoints?.map((waypoint, index) => { 
          return (
          <Marker key={index} title={waypoint.name} description={waypoint.address} identifier={waypoint.id}
            coordinate={{ latitude: +waypoint.latitude, longitude: +waypoint.longitude }}
          >
            <View className='p-2 bg-white rounded-full shadow border-[1px] border-gray-200'>
              <Text className='text-3xl'>{String.fromCodePoint(parseInt (waypoint.category.symbol, 16))}</Text>
            </View>
            <Callout tooltip>
              <View className="h-16 w-56 bg-white rounded-xl">
                <View className='pl-2 h-full w-full bg-white rounded-xl flex-row flex-1 items-center border-[1px] border-gray-200 shadow'>
                  <Image source={{uri:waypoint.imageUrl}} className='h-12 w-12 rounded-xl'/>
                  <View className='flex-1 px-1'>
                    <View>
                      <Text className='text-lg'>{waypoint.name?.length>20?waypoint.name.slice(0,17)+'...':waypoint.name}</Text>
                      <Text className='text-xs font-light text-gray-500'>{waypoint.address?.length>20?waypoint.address.slice(0,20)+'...':waypoint.address}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Callout>
          </Marker>
        )})
      }
      
      { bounds && startNavigation &&
          bussinessMarker?.map((marker, index) => {
            return (
            <Marker key={'marker'+marker.id} 
              coordinate={{
                latitude: +marker.latitude,
                longitude: +marker.longitude}
              } title={marker.name} description='origin'>
                <View className='p-2 bg-white rounded-full shadow border-[1px] border-gray-200'>
                  <Text className='text-3xl'>{String.fromCodePoint(parseInt (marker.category.symbol, 16))}</Text>
                </View>
                <Callout tooltip>
                  <View className="h-16 w-56 bg-white rounded-xl">
                    <TouchableOpacity className='pl-2 h-full w-full bg-white rounded-xl flex-row flex-1 items-center border-[1px] border-gray-200 shadow'
                      onPress={()=>{
                        console.log('tap >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
                        dispatch(openMarker(marker))
                      }}>
                      <Image source={{uri:marker.imageUrl}} className='h-12 w-12 rounded-xl'/>
                      <View className='flex-1 px-1'>
                        <View>
                          <Text className='text-lg'>{marker.name?.length>20?marker.name.slice(0,17)+'...':marker.name}</Text>
                          <Text className='text-xs font-light text-gray-500'>{marker.address?.length>20?marker.address.slice(0,20)+'...':marker.address}</Text>
                        </View>
                      </View>
                      <View className='h-full w-8 rounded-r-xl pr-2'>
                        <View className='flex-1 w-full h-full items-center justify-center border-b-[1px] border-gray-200'>
                          <Icons.FontAwesome5 name="users" className='text-xl text-gray-800'/>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Callout>
            </Marker>
          )})
        }
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});