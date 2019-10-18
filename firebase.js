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

import { db } from './db_config';  

class App extends React.Component 
{

  constructor(props) 
  {
    super(props); 

    this.state = {
      dataList: []
    }  
  }

  componentDidMount()
  { 
    // LIST ----------------------------------------
    var items = [];
    db.ref('customers').on('value', function (snapshot) {
      snapshot.forEach((child) => {
        items.push({
          _key: child.key,
          username: child.val().username, 
          password: child.val().password, 
        });
      }); 
    });
    this.setState({
      dataList: items
    }); 

    // INSERT ---------------------------------------- 
    db.ref('customers/').push({
      "username" : "email1",
      "password" : "fname"
    });  
 
    // UPDATE ---------------------------------------- 
    db.ref('customers/-LrTv_d3WfjxWfaIWxRL').update({
      "username" : "ismail",
      "password" : "test2"
    }); 
     
    // DELETE ---------------------------------------- 
    db.ref('customers/-LrTvIg6JtS_W9RRE80i').remove(); 
  }

 
  render() {
    return ( 
      <View>
        <StatusBar barStyle="white-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.dataList}
            renderItem={({index, item}) => <View><Text>{ item._key } : {item.username} - {item.password}</Text></View> }
          />
        </SafeAreaView>
      </View> 
    );
  }
};

export default App; 


/* (file:db_config)
import React from 'react';
import Firebase from 'firebase';

let config = {
  apiKey: "AIzaSyAc56dztiPoUGxYJTk7GTkPaHPwaTBpr4k",
  authDomain: "test-c99a8.firebaseapp.com",
  databaseURL: "https://test-c99a8.firebaseio.com",
  projectId: "test-c99a8",
  storageBucket: "test-c99a8.appspot.com",
  messagingSenderId: "714197822940",
  //appId: "1:714197822940:web:a70df20fc151a8a611f319",
  //measurementId: "G-7QKNK5JNWL"
};

var app = Firebase.initializeApp(config);
 
export const db = app.database(); 
*/
