import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import ProductsView from "./screens/ProductsView"
import CartView from "./screens/CartView"
import Orders from "./screens/Orders"
import { ProductContextDistributer } from './Context';
import { Entypo, AntDesign } from '@expo/vector-icons';




export default function App() {
  const tab = createBottomTabNavigator()
  return (
    <ProductContextDistributer>
      <NavigationContainer>
        <tab.Navigator>
          <tab.Screen name="Product Screen" component={ProductsView} options={
            {
              tabBarIcon: () => {
                return (
                  <Entypo name="home" size={24} color="black" />
                )
              },
            }
          } />
          <tab.Screen name="Cart" component={CartView} options={
            {
              tabBarIcon: () => {
                return (
                  <AntDesign name="shoppingcart" size={24} color="black" />
                )
              }
            }
          } />
          <tab.Screen name="Orders" component={Orders} options={
            {
              tabBarIcon: () => {
                return (
                  <AntDesign name="user" size={24} color="black" />)
              }
            }
          } />

        </tab.Navigator>
      </NavigationContainer>
    </ProductContextDistributer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
