import React from 'react';
import {
  SafeAreaView,  
  View,
  Text,
  StatusBar,
  FlatList
} from 'react-native';
 
import Realm from 'realm';

class App extends React.Component {

  constructor(props) {
    super(props); 

    this.state = {
      dataList: []
    } 
 
    Realm.open({schema: [SchemaCustomers]})
      .then((realm) => {

        // INSERT ----------------------------------------
        for (var i = 1; i < 10; i++) { 
          realm.write(() => {
            realm.create("customers", {
              username: "iunal",
              mail: "iunal@iunal.com" + i,
              password: "123456",
              rank: 0
            });
          });
        }

        // SELECT ----------------------------------------
        var tempdata = realm.objects("customers");
        this.setState({
          dataList: tempdata 
        });

        // DELETE ----------------------------------------
        realm.write(() => {
          let customer = realm.objects('customers').filtered('username="iunal"');
          realm.delete(customer);
        });

        // UPDATE ---------------------------------------- 
        let customer = realm.objects("customers").filtered("username='iunal'")
        realm.write(() => {
          customer.password = "password"
        }); 
   
    }).catch((error) => {
      console.log(error);
    }); 

  }

  
  render() {
    return (
      <View>
        <StatusBar barStyle="white-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.dataList}
            renderItem={({index, item}) => <View><Text>{ index } : {item.username} - {item.mail}</Text></View> }
          />
        </SafeAreaView>
      </View>
    );
  }

};
 
const SchemaCustomers = {
  name: "customers",
  properties: {
    username:  "string",
    mail: "string",
    password: "string",
    rank: { type: 'int', default: 0}
  }
}; 

export default App;
