import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
    selectBoundsWaypoint,
    selectDestination,
    selectOrigin,
    setDestination,
} from "../stores/slices/navSlice";
import { setWaypoints } from "../stores/slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useMutation, gql } from "@apollo/client";

const REQ_WAYPOINT = gql`
  mutation Mutation($input: NewRoute) {
  addNewTrip(input: $input) {
    tripId
    name
    address
    latitude
    longitude
    imageUrl
    category {
      symbol
    }
    posts {
      imageUrl
      name
      link
    }
  }
}
`

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector(selectDestination);
  const origin = useSelector(selectOrigin);
  const boundsWaypoint = useSelector(selectBoundsWaypoint);
  const [waypoints, {data, loading, error}] = useMutation(REQ_WAYPOINT)
  const [isBoundAvailable, setIsBoundAvailable] = useState(false)

  const getWaypoints = async () => {
    try {
      await waypoints(
        {variables: {
          input: {
            placeOfOrigin: origin.location.lat + ' ' + origin.location.lng,
            destination: destination.location.lat + ' ' + destination.location.lng,
            neLat:(boundsWaypoint.northEast.latitude).toString(),
            neLon:(boundsWaypoint.northEast.longitude).toString(),
            swLat:(boundsWaypoint.southWest.latitude).toString(),
            swLon:(boundsWaypoint.southWest.longitude).toString(),
          }
        }})
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    if (isBoundAvailable && destination) {
      getWaypoints()
    }
  },[isBoundAvailable])

  useEffect(()=>{
    if (boundsWaypoint && Object.keys(boundsWaypoint).length) setIsBoundAvailable(true)
  },[boundsWaypoint])

  
  useEffect(() => {
    // const payload = data?.addNewTrip?.map(el=> {return {name:el.name, longitude:+el.longitude, latitude:+el.latitude,}})
    if (data?.addNewTrip){
      const payload = data?.addNewTrip
      dispatch(setWaypoints(payload))
    }
  },[data])

    useEffect(() => {
        const payload = data?.addNewTrip?.map((el) => {
            return {
                name: el.name,
                longitude: +el.longitude,
                latitude: +el.latitude,
            };
        });
        dispatch(setWaypoints(payload));
    }, [data]);

    return (
        <SafeAreaView className="bg-white flex-1">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <Text className="text-center py-2 text-xl">
                    Where do you want to wander ?{" "}
                </Text>
                <View className="flex-shrink">
                    <View className="mb-4">
                        <GooglePlacesAutocomplete
                            placeholder="Where to?"
                            styles={toInputBoxStyles}
                            fetchDetails={true}
                            enablePoweredByContainer={false}
                            onPress={(data, details = null) => {
                                dispatch(
                                    setDestination({
                                        location: details.geometry.location,
                                        description: data.description,
                                    })
                                );
                                // navigation.navigate("RideOptionsCard");
                            }}
                            query={{
                                key: "AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4",
                                language: "en",
                            }}
                            nearbyPlacesAPI="GooglePlacesSearch"
                            debounce={400}
                        />
                    </View>
                    <NavFavorites className="mt-10" />
                </View>

                <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
                    {!destination ? (
                        <View className="bg-gray-400 w-48 py-4 px-4 rounded-full flex flex-row items-center justify-center gap-x-2 ">
                            {loading ? (
                                <ActivityIndicator size="large" color="white" />
                            ) : (
                                <>
                                    <Icon
                                        name="car"
                                        type="font-awesome"
                                        color="white"
                                        className=""
                                    />
                                    <Text
                                        style={tw`text-center text-white text-xl font-semibold`}
                                    >
                                        Rides
                                    </Text>
                                </>
                            )}
                        </View>
                    ) : (
                        <TouchableOpacity
                            className="bg-[#4a388e] w-48 py-4 px-4 rounded-full flex flex-row items-center justify-center gap-x-2 "
                            onPress={() => navigation.navigate("ConfirmRide")}
                        >
                            <Icon
                                name="car"
                                type="font-awesome"
                                color="white"
                                className=""
                            />
                            <Text
                                style={tw`text-center text-white text-xl font-semibold`}
                            >
                                Rides
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: "#DDDDDF",
        borderRadius: 0,
        fontSize: 18,
    },
    textInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
});
