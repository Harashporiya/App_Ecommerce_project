import React from 'react';
import { View, Text } from 'react-native';
import useProductContext from './Product';

interface Product {
  name: string;
}

const ShowProductContext = () => {
  const { selectProduct } = useProductContext(); 

  return (
    <View>
      {selectProduct.length > 0 ? (
        selectProduct.map((product: Product, index: number) => (
          <Text key={index}>{product.name}</Text>
        ))
      ) : (
        <Text>No products available</Text>
      )}
    </View>
  );
};

export default ShowProductContext;
