import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_BACKEND_URL } from '../../Backend_api_url/Api_Backends';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouterType } from '../navigation';

interface ImageInfo {
  uri: string;
  type?: string;
  name?: string;
}

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RouterType>>()

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !price || !image) {
      Alert.alert('Error', 'Please fill all fields and select an image');
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('name', name);
      formData.append('prise', price); // Note: keeping 'prise' to match backend
      
      // Append image
      const imageUri = image.uri;
      const filename = imageUri.split('/').pop() || 'image';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';
      
      const imageInfo: ImageInfo = {
        uri: imageUri,
        name: filename,
        type,
      };
      
      formData.append('image', imageInfo as any);

      const response = await axios.post(`${API_BACKEND_URL}/api/product`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Success', 'Product created successfully');
      // Reset form
      setName('');
      setPrice('');
      setImage(null);
      navigation.navigate("ShowProduct")
    } catch (error) {
      console.error('Error creating product:', error);
      if (axios.isAxiosError(error)) {
        Alert.alert('Error', error.response?.data?.message || 'Failed to create product');
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Product</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Select Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.preview}
        />
      )}

      <TouchableOpacity 
        style={[styles.submitButton, loading && styles.disabledButton]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Creating...' : 'Create Product'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex:1,
    justifyContent:"center"
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  imageButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    fontSize: 16,
    color: '#333',
  },
  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductForm;