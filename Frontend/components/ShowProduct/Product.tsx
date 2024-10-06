import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { API_BACKEND_URL } from "../../Backend_api_url/Api_Backends";

interface Product {
  _id: string;
  name: string;
  prise: number;  
  image: string;
}

const ShowProduct = () => {
  const [data, setData] = useState<Product[]>([]);

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

  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        data.map((item: Product) => {
          const imageUrl = `${API_BACKEND_URL}${item.image}`; 
         
          return (
            <View key={item._id} style={styles.productCard}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.productImage}
                onError={() => console.log(`Error loading image: ${imageUrl}`)} 
              />
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Price: ${item.prise}</Text>
            </View>
          );
        })
      ) : (
        <Text>No products available</Text>
      )}
    </View>
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
