import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useEffect } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { setDestination } from "../stores/slices/navSlice";
import { setWaypoints } from "../stores/slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavorites from "./NavFavorites";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { useMutation, gql } from "@apollo/client";

const REQ_WAYPOINT = gql`
  mutation AddNewTrip($input: NewRoute) {
  addNewTrip(input: $input) {
    tripId
    name
    latitude
    longitude
    address
  }
}
`

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { destination, origin } = useSelector((state) => state.nav);

  const [waypoints, {data, loading, error}] = useMutation(REQ_WAYPOINT)

  useEffect(() => {
    if (destination){
      waypoints({variables: {
        input: {
          placeOfOrigin: origin.location.address,
          destination: destination.location.address
        }
      }})
    }
  },[destination])
  console.log(data, loading, error)
  return (
    <SafeAreaView className="bg-white flex-1">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text className="text-center py-2 text-xl">Where do you want to wander ? </Text>
        <View className="flex-shrink">
          <View className='mb-4'>
            <GooglePlacesAutocomplete
              placeholder="Where to?"
              styles={toInputBoxStyles}
              fetchDetails={true}
              enablePoweredByContainer={false}
              onPress={(data, details = null) => {
                  dispatch( setDestination({ location: details.geometry.location, description: data.description }));
                  navigation.navigate("RideOptionsCard");
              }}

              query={{ key: "AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4", language: "en" }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
          </View>
          <NavFavorites className='mt-10'/>
        </View>

        <View className="flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100">
          <TouchableOpacity className="bg-black w-24 py-3 px-4 rounded-full flex flex-row items-center justify-between" onPress={() => navigation.navigate("RideOptionsCard")}>
              <Icon name="car" type="font-awesome" color="white" size={16} />
              <Text style={tw`text-center text-white`}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-black py-3 px-4 w-24 rounded-full flex flex-row items-center justify-between">
              <Icon name="fast-food-outline" type="ionicon" color="white" size={16}/>
              <Text style={tw`text-center text-white`}>Promo</Text>
          </TouchableOpacity>
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