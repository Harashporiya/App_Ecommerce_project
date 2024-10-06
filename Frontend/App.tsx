
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import Product from './components/FormProduct/Product';
import ShowProduct from './components/ShowProduct/Product';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"default"} />
      {/* <Product/> */}
      <ShowProduct/>
    </View>
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
