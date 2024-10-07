import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, Touchable, TouchableOpacity, ScrollView } from "react-native";
import { API_BACKEND_URL } from "../../Backend_api_url/Api_Backends";
import useProductContext from "../ContextApi/Product";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RouterType } from "../navigation";
interface Product {
  _id: string;
  name: string;
  prise: number;  
  image: string;
}

const ShowProduct = () => {
  const [data, setData] = useState<Product[]>([]);
  const {setProduct} = useProductContext()
  const navigation = useNavigation<NavigationProp<RouterType>>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_BACKEND_URL}/api/all/products`);
        // console.log(res.data);
        setData(res.data.allProduct);
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchData();
  }, []);

  const handelProductData=(data:Product)=>{
    setProduct(data);
      navigation.navigate("ContextShowProduct")
  }

  return (
    <ScrollView style={styles.container}>
      {data.length > 0 ? (
        data.map((item: Product) => {
          const imageUrl = `${API_BACKEND_URL}${item.image}`; 
         
          return (
            <TouchableOpacity key={item._id} onPress={()=>handelProductData(item)}>
            <View key={item._id} style={styles.productCard} >
              <Image 
                source={{ uri: imageUrl }}
                style={styles.productImage}
                onError={() => console.log(`Error loading image: ${imageUrl}`)} 
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Price: ${item.prise}</Text>
            </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text>No products available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productCard: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  productName: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  productImage: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default ShowProduct;
