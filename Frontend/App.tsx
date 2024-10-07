
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Product from './components/FormProduct/Product';
import ShowProduct from './components/ShowProduct/Product';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Product' component={Product} options={{headerShown:false}}/>
      <Stack.Screen name='ShowProduct' component={ShowProduct} options={{headerShown:false}}/>
    </Stack.Navigator>
   </NavigationContainer>
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
