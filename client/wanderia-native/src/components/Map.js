import { StyleSheet, Text, View, Image, Alert } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import {
    selectOrigin,
    selectDestination,
    selectWaypoints,
} from "../stores/slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useDispatch } from "react-redux";
import {
    setTravelTimeInformation,
    selectStartNavigation,
} from "../stores/slices/navSlice";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";
// import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";

const Map = () => {
    const origin = useSelector(selectOrigin);
    // console.log("origin", origin);
    const destination = useSelector(selectDestination);
    const waypoints = useSelector(selectWaypoints);
    const mapRef = useRef(null);
    const dispatch = useDispatch();
    const startNavigation = useSelector(selectStartNavigation);

    // useEffect(() => {
    //     if (!startNavigation) return;
    //     BackgroundGeolocation.configure({
    //         desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    //         stationaryRadius: 50,
    //         distanceFilter: 50,
    //         notificationTitle: "Background tracking",
    //         notificationText: "enabled",
    //         // debug: true,
    //         startOnBoot: false,
    //         stopOnTerminate: false,
    //         locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    //         interval: 10000,
    //         fastestInterval: 5000,
    //         activitiesInterval: 10000,
    //         stopOnStillActivity: false,
    //         url: "http://192.168.81.15:3000/location",
    //         httpHeaders: {
    //             "X-FOO": "bar",
    //         },
    //         // customize post properties
    //         postTemplate: {
    //             lat: "@latitude",
    //             lon: "@longitude",
    //             foo: "bar", // you can also add your own properties
    //         },
    //     });

    //     BackgroundGeolocation.on("location", (location) => {
    //         // handle your locations here
    //         // to perform long running operation on iOS
    //         // you need to create background task
    //         BackgroundGeolocation.startTask((taskKey) => {
    //             // execute long running task
    //             // eg. ajax post location
    //             // IMPORTANT: task has to be ended by endTask
    //             BackgroundGeolocation.endTask(taskKey);
    //         });
    //     });

    //     BackgroundGeolocation.on("stationary", (stationaryLocation) => {
    //         // handle stationary locations here
    //         Actions.sendLocation(stationaryLocation);
    //     });

    //     BackgroundGeolocation.on("error", (error) => {
    //         console.log("[ERROR] BackgroundGeolocation error:", error);
    //     });

    //     BackgroundGeolocation.on("start", () => {
    //         console.log(
    //             "[INFO] BackgroundGeolocation service has been started"
    //         );
    //     });

    //     BackgroundGeolocation.on("stop", () => {
    //         console.log(
    //             "[INFO] BackgroundGeolocation service has been stopped"
    //         );
    //     });

    //     BackgroundGeolocation.on("authorization", (status) => {
    //         console.log(
    //             "[INFO] BackgroundGeolocation authorization status: " + status
    //         );
    //         if (status !== BackgroundGeolocation.AUTHORIZED) {
    //             // we need to set delay or otherwise alert may not be shown
    //             setTimeout(
    //                 () =>
    //                     Alert.alert(
    //                         "App requires location tracking permission",
    //                         "Would you like to open app settings?",
    //                         [
    //                             {
    //                                 text: "Yes",
    //                                 onPress: () =>
    //                                     BackgroundGeolocation.showAppSettings(),
    //                             },
    //                             {
    //                                 text: "No",
    //                                 onPress: () => console.log("No Pressed"),
    //                                 style: "cancel",
    //                             },
    //                         ]
    //                     ),
    //                 1000
    //             );
    //         }
    //     });

    //     BackgroundGeolocation.on("background", () => {
    //         console.log("[INFO] App is in background");
    //     });

    //     BackgroundGeolocation.on("foreground", () => {
    //         console.log("[INFO] App is in foreground");
    //     });

    //     BackgroundGeolocation.checkStatus((status) => {
    //         console.log(
    //             "[INFO] BackgroundGeolocation service is running",
    //             status.isRunning
    //         );
    //         console.log(
    //             "[INFO] BackgroundGeolocation services enabled",
    //             status.locationServicesEnabled
    //         );
    //         console.log(
    //             "[INFO] BackgroundGeolocation auth status: " +
    //                 status.authorization
    //         );

    //         // you don't need to check status before start (this is just the example)
    //         if (!status.isRunning) {
    //             BackgroundGeolocation.start(); //triggers start on start event
    //         }
    //     });

    //     return () => {
    //         console.log("Removing all listeners");
    //         BackgroundGeolocation.removeAllListeners();
    //     };
    // });

    useEffect(() => {
        if (!origin || !destination) return;

        // Zoom and fit to markers
        mapRef.current.fitToSuppliedMarkers(
            ["origin", "destination", "waypoint"],
            {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            }
        );
    }, [origin, destination]);

    useEffect(() => {
        if (!startNavigation) return;
        // I want to zoom in to origin location
        mapRef.current.fitToSuppliedMarkers(["origin"], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        });
    }, [startNavigation]);

    useEffect(() => {
        if (!origin || !destination) return;
        // Get the distance and time of the route and every waypoints
        // const waypointInput = waypoints.map((waypoint) => {
        //     Location.reverseGeocodeAsync({
        //         latitude: waypoint.latitude,
        //         longitude: waypoint.longitude,
        //     })
        //         .then((res) => {
        //             console.log("res", res);
        //             let address = `${res[0].district} ${res[0].subregion} ${res[0].region} ${res[0].country}`;
        //             console.log("address", address);
        //             return address;
        //         })
        //         .catch((error) => {
        //             console.log(error);
        //         });
        // });

        // console.log("====================================");
        // console.log("waypointInput", waypointInput);
        // console.log("====================================");

        const getTravelTime = async () => {
            fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4`
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    dispatch(
                        setTravelTimeInformation(data.rows[0].elements[0])
                    );
                });
        };

        getTravelTime();
    }, [origin, destination]);

    return (
        <MapView
            ref={mapRef}
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
                startNavigation && {
                    center: {
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    },
                    pitch: 60,
                    heading: 0,
                    altitude: 1000,
                    zoom: 20,
                }
            }
        >
            {origin && destination && waypoints && (
                <MapViewDirections
                    origin={origin.description}
                    destination={destination.description}
                    waypoints={waypoints}
                    apikey="AIzaSyCPqKoUKVc1aUxhG4vGluGxF3OOr8ProL4"
                    strokeWidth={3}
                    strokeColor="blue"
                />
            )}

            {origin?.location && (
                <Marker
                    coordinate={{
                        latitude: origin.location.lat,
                        longitude: origin.location.lng,
                    }}
                    title="Origin"
                    description={origin.description}
                    identifier="origin"
                >
                    <View style={tw`bg-purple-400 rounded-full p-4 shadow-xl`}>
                        <FontAwesome5 name="car" size={24} color="black" />
                    </View>
                </Marker>
            )}

            {destination?.location && (
                <Marker
                    coordinate={{
                        latitude: destination.location.lat,
                        longitude: destination.location.lng,
                    }}
                    title="Destination"
                    description={destination.description}
                    identifier="destination"
                />
            )}

            {waypoints?.map((waypoint, index) => {
                return (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: waypoint.latitude,
                            longitude: waypoint.longitude,
                        }}
                        title="Waypoint"
                        description={waypoint.description}
                        identifier="waypoint"
                    />
                );
            })}
        </MapView>
    );
};

export default Map;

const styles = StyleSheet.create({});
