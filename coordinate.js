import React from 'react';
import Geolocation from '@react-native-community/geolocation';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert
} from 'react-native';
 
class App extends React.Component {

  constructor(props) 
  {
    super(props); 

    this.state = {
      position: {},
      longitude: null,
      latitude: null,
    }  

    this.findCoordinates();
  }
 
  async findCoordinates() 
  {  
    await Geolocation.getCurrentPosition(
      position => { 
        this.setState({
          position: position,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      error => Alert.alert(error.message)
    );
  }
 
  render() {
    return (
      <View>
        <StatusBar barStyle="white-content" />
        <SafeAreaView>
          <Text>Location</Text>

          <Text>{this.state.longitude}</Text>
          <Text>{this.state.latitude}</Text>

        </SafeAreaView>
      </View>
    );
  }

};
 
export default App;
