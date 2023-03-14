import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { ProductContext } from '../Context'
import { Card } from 'react-native-shadow-cards'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;

const CartView = ({ navigation }) => {

  const { cart, setCart,total } = useContext(ProductContext)


  const removeCart = (items) => {
    setCart(cart.filter((current) => current.id !== items.id))
  }

  const placeOrderNow = async () => {
    
    try {
      
      await AsyncStorage.setItem("Orders", JSON.stringify(cart))
      alert("Order Placed Successfully")
    }
    catch (error) {
      alert(error.message)
    }
    
  }


  return (
    <>
      <ScrollView style={{ marginTop: 10 }}>
        <Card style={styles.cartStyle}>
          {cart.length > 0 ? (
            cart.map((items) => {
              return (
                <View key={items.id} style={[styles.mainCont, { marginBottom: 5, borderColor: "gray" }]}>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View>
                      <Image style={styles.imageStyle} source={{ uri: items.images[0] }} />
                    </View>

                    <View style={{ marginHorizontal: 15 }}>
                      <Text style={{ fontSize: 13, fontWeight: "500", width: 100 }}>{items.title}</Text>
                      <Text style={{ color: "gray", fontSize: 11 }}>{items.description.substr(0, 20)}...</Text>
                    </View>



                  </View>
                  <TouchableOpacity onPress={removeCart.bind(this, items)} >
                    <View style={{ marginHorizontal: 15 }}>
                      <MaterialIcons name="cancel" size={24} color="black" />
                    </View>
                  </TouchableOpacity>


                  <View style={{ alignItems: "center", marginRight: windowWidth <= 360 ? 10 : 0 }}>
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>₹{items.price}</Text>
                  </View>
                </View>
              )
            })

          ) : (
            <View style={{ alignItems: "center", marginTop: 10 }}>
              <Text>Empty Cart</Text>
            </View>
          )}
        </Card>
      </ScrollView>


      {cart.length > 0 &&
        <View style={styles.placeOrderCont}>

          <View pointerEvents={cart ? null : 'none'} style={[styles.card]}>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>₹{total}</Text>
              <Text style={{ color: "#32CD32" }}>Total Bill</Text>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={placeOrderNow} style={styles.placeOrder}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Checkout Now!</Text>
              <AntDesign name="gift" size={22} color="white" />
            </TouchableOpacity>
          </View>



        </View>
      }

    </>

  )
}

export default CartView

const styles = StyleSheet.create({
  mainCont: {
    flexDirection: "row",
    marginTop: 10,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,



  },
  imageStyle: {
    height: 70,
    width: 80,
    resizeMode: "contain",

  },
  cartStyle: {

    paddingBottom: 8,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    width: "100%",
    elevation: 5,
    shadowOpacity: 0.2,
    marginBottom: 10
  },
  placeOrderCont: {
    backgroundColor: "white",
    borderWidth: 0.5,
    borderColor: "gray",
    justifyContent: "center",
  },

  card: {
    flexDirection: "row",
    margin: 15,
    paddingHorizontal: 15,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeOrder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#32CD32",
    borderRadius: 8,
    paddingHorizontal: windowWidth <= 360 ? 25 : 50
  },
})