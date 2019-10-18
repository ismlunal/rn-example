import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';
 
class App extends React.Component {

  constructor(props) 
  {
    super(props); 

    this.state = {
      dataList: []
    } 
 
    this.getData();
  }
 
  getData() 
  { 

    fetch('https://api.viliks.co/v1/template/items', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer XYZ',
        'Accept-Language': 'en',
      },
      body: JSON.stringify({
        category: 'b94857f6a905ccd028329b0a8324ac4c'
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
 
      this.setState({
        isLoading: false,
        dataList: responseJson.data.items,
      });

    }).catch((error) => {
      console.warn(error);
    });

  }
 
  render() {
    return (
      <View>
        <StatusBar barStyle="white-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.dataList}
            renderItem={({index, item}) => <View><Text>{ index } : {item.unique} - {item.name}</Text></View> }
          />
        </SafeAreaView>
      </View>
    );
  }

};
 
export default App;
