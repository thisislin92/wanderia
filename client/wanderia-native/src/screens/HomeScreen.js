import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import NavOptions from "../components/NavOptions";
// import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch, useSelector } from "react-redux";
import {
    setDestination,
    setOrigin,
    setLocationPermission,
} from "../stores/slices/navSlice";
import * as Location from "expo-location";
import NavFavorites from "../components/NavFavorites";
import { Icon } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth, database } from "../../config/firebase";
import { selectOrigin } from "../stores/slices/navSlice";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const origin = useSelector(selectOrigin);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);

    const handleSignOut = () => {
        signOut(auth).catch((error) => alert(error.message));
    };

    const deviceLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            dispatch(setLocationPermission(false));
            return;
        }
        dispatch(setLocationPermission(true));
        let location = await Location.getCurrentPositionAsync({});
        // console.log("location", location);

        let reverseGeoCode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        });

        let address = `${reverseGeoCode[0].district} ${reverseGeoCode[0].subregion} ${reverseGeoCode[0].region} ${reverseGeoCode[0].country}`;
        // console.log("address", address);
        setAddress(address);

        setLocation({
            location: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
            description: address,
        });
        dispatch(
            setOrigin({
                location: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
                description: address,
            })
        );
    };

    useEffect(() => {
        deviceLocation();
    }, []);

    useEffect(() => {
        dispatch(setOrigin(location));
    }, [address]);

    return (
        <SafeAreaView className="bg-white h-full">
            <View className="p-5">
                <View className="flex flex-row justify-between">
                    <Image
                        className="bg-white h-full"
                        style={{
                            width: 150,
                            height: 150,
                            resizeMode: "contain",
                            marginTop: 20,
                        }}
                        source={{ uri: "https://i.imgur.com/fLn2YRT.png" }}
                    />
                    <TouchableOpacity onPress={handleSignOut}>
                        <Icon
                            className="p-2 bg-[#893189] rounded-full w-10 mt-10"
                            name="logout"
                            color="white"
                            type="antdesign"
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>
                <GooglePlacesAutocomplete
                    placeholder="Where from?"
                    styles={{
                        container: { flex: 0 },
                        textInput: { fontSize: 18 },
                    }}
                    query={{
                        key: "AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4",
                        language: "en",
                    }}
                    onPress={(data, details = null) => {
                        console.log(data.description, "<<<<<<<<");
                        console.log(details.geometry.location, "<<<<<<<<");
                        // console.log(setOrigin, "setOrigin");
                        dispatch(
                            setOrigin({
                                location: details.geometry.location,
                                description: data.description,
                            })
                        );

                        dispatch(setDestination(null));
                    }}
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    returnKeyType={"search"}
                    minLength={2}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                />

                <NavOptions />
                <NavFavorites />
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({});
