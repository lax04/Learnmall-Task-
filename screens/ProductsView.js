import { Dimensions, FlatList, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useContext, useLayoutEffect, useState } from 'react'
import { ProductContext } from '../Context';
import { fetchData } from '../http';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { Card } from 'react-native-shadow-cards';


const { height, width } = Dimensions.get('window');
const windowWidth = Dimensions.get('window').width;



const ProductsView = ({ navigation }) => {
  const { productsBackend, setProductsBackend, cart, setCart, total } = useContext(ProductContext)
  const [data, setData] = useState([])
  const Cat = [     //Making it a separate json to make the edits smoother
    {
      id: "2",
      category: "All",

    },
    {
      id: "6",
      category: "smartphones",

    },
    {
      id: "0",
      category: "laptops",

    },
    {
      id: "1",
      category: "fragrances",

    },

    {
      id: "3",
      category: "skincare",

    },
    {
      id: "4",
      category: "groceries",

    },
    {
      id: "5",
      category: "home-decorations",

    }


  ]


  //Fetchdata
  useLayoutEffect(() => {
    const fetchProducts = async () => {
      const response = await fetchData()
      setProductsBackend(response)
      setData(response)

    }
    fetchProducts()
  }, [])

  const addCart = (item) => {
    const ItemPresent = cart.find((current) => current.id === item.id);
    if (ItemPresent) {
      alert("Already in the Cart")
    }
    else {
      setCart([...cart, item])
      alert("Added to Cart")

    }
  }


  const filterProducts = (category) => {
    if (category === "All") {
      setData(productsBackend)
      return;
    }
    setData(productsBackend.filter((item) => item.category === category))
  }

  return (
    <>

      <View>

        <FlatList showsHorizontalScrollIndicator={false} horizontal data={Cat} renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={filterProducts.bind(this, item.category)} style={{ marginVertical: 10, marginHorizontal: 5 }} >
              <Text style={{ padding: 8, borderWidth: 0.5, backgroundColor: "white", borderRadius: 7 }}>{item.category}</Text>
            </TouchableOpacity>
          )
        }} />
      </View>


      <View style={{ alignItems: "center", backgroundColor: "white", marginBottom: 10 }}>
        <FlatList showsVerticalScrollIndicator={false} numColumns={2} data={data} renderItem={({ item }) => {
          return (
            <View style={[styles.mainCont, { marginTop: 5 }]}>

              <Pressable onPress={addCart.bind(this, item)} >
                <Card style={styles.cardView}>

                  <View style={{ alignItems: "center" }}>
                    <Image style={styles.imageStyle} source={{ uri: item.images[0] }} />
                  </View>

                  <View>
                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between" }}>
                      <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: "capitalize" }}>{item.title.substr(0, 20)}... </Text>
                    </View>

                    <Text style={{ fontSize: 10, color: 'gray' }}>{item.description.substr(0, 12)}...</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>{item.brand}</Text>
                  </View>

                  <View style={styles.bottomStyle}>


                    <Text style={{ fontWeight: "500", fontSize: 15 }}>₹{item.price}</Text>




                  </View>

                  <View style={{ padding: 5, backgroundColor: "#ff0490", position: "absolute", top: 10, borderTopRightRadius: 8 }}>
                    <Text style={{ fontSize: 11, color: "white" }}>{Math.floor(item.discountPercentage)}% off</Text>
                  </View>


                  <Text style={{ fontSize: 13, color: "white", marginLeft: 4, padding: 2, backgroundColor: "#32CD32", borderRadius: 5, position: "absolute", right: 10, bottom: 10 }}>{item.rating}★</Text>


                </Card>
              </Pressable>






            </View >
          )
        }} />



      </View>

    </>
  )
}

export default ProductsView

const styles = StyleSheet.create({
  mainCont: {
    marginHorizontal: 7,
    alignItems: "center"
  },
  cardView: {
    marginBottom: 10,                //This should be added to bring in the card in other screens
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    height: 225,
    width: (width / 2) - 25,
    shadowOpacity: 0.2,


  },
  imageStyle: {
    resizeMode: "contain",
    height: 105,
    width: 105,
    marginBottom: 8,
  },
  bottomStyle: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 10,
    left: 10,
    justifyContent: "space-between",
    width: "100%"
  },
  star: {
    position: "absolute",
    backgroundColor: "red",
    left: 0,
    borderWidth: 0.5,
    transform: [{ rotate: "90deg" }]
  },


})