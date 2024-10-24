import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native';
import * as Location from 'expo-location';

export default function App() {

  // const [location, setLocation] = useState<null|{}| {}| []|''>(null);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<null|string>(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }






  return (<>
    <SafeAreaView style={styles.container}>
    
{location &&  <MapView  style={styles.map} initialRegion={
  {
latitude:location.coords.latitude,
longitude:location.coords.longitude,
latitudeDelta:0.001,
longitudeDelta:0.002
}
}>

<Marker coordinate={{
longitude:location.coords.longitude,
latitude:location.coords.latitude
}}>

</Marker>
</MapView>
}




    </SafeAreaView>
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  containera: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  marker: {
    fontSize: 18,
    textAlign: 'center',
    color:"blue"
  },
});
