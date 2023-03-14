import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native';
import { ProductContext } from '../Context';
import { Card } from 'react-native-shadow-cards';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';


const Orders = ({ navigation }) => {

  const [orders, setOrders] = useState([])
  const { cart } = useContext(ProductContext)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await AsyncStorage.getItem("Orders")
        setOrders(JSON.parse(response))




      }
      catch (error) {
        alert(error.message)
      }

    }
    fetchOrders()
  })

  return (
    <View>
      <>
        <View style={{ flex: orders.length === 0 ? 0.75 : 0, alignItems: orders.length === 0 ? "center" : null, justifyContent: orders.length === 0 ? "center" : null }}>
          {orders.length === 0 ?
            (
              <View style={{ alignItems: "center", flex: 0.75, justifyContent: "center" }}>
                <Text>No Orders Yet</Text>
              </View>
            )
            :
            <FlatList showsVerticalScrollIndicator={false} data={orders} keyExtractor={(key) => key.id} renderItem={({ item }) => {
              return (
                <View style={{ marginBottom: 10, marginHorizontal: 5, marginTop: 5 }}>
                  <Card style={{ width: "100%", padding: 12, paddingVertical: 20, shadowOpacity: 0.2 }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <View>
                        <Text style={{ fontSize: 14, fontWeight: "800" }}>Order #{item.id}</Text>
                        <Text style={{ fontSize: 12, fontWeight: "700", color: "gray" }}>{new Date().toLocaleString() }</Text>
                      </View>
                      <Text style={{ fontSize: 16, fontWeight: "600" }}>₹{item.price}</Text>
                    </View>

                    <View style={{ marginTop: 10, flexDirection: "row", }}>
                      <Image style={{ height: 50, width: 50 }} source={{ uri: item?.images[0] }} />
                      <View style = {{marginHorizontal : 10}}>
                        <Text>{item.title}</Text>
                        <Text style = {{fontSize : 12,color:"gray"}}>{ item.description.substr(0,35) }..</Text>
                      </View>

                    </View>



                    <View style={{ marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <TouchableOpacity style={{ padding: 10, paddingHorizontal: 20, borderWidth: 1, borderRadius: 5, borderColor: "#32CD32" }}>
                        <Text style={{ fontWeight: "500", color: "#32CD32" }}>View Details</Text>
                      </TouchableOpacity>
                    </View>

                  </Card>


                </View>
              )
            }} />

          }



        </View>


      </>


    </View>
  )
}

export default Orders

const styles = StyleSheet.create({})