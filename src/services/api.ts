import axios from "axios";

const API_BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    
    if (!response.data.hasOwnProperty("products")) {
      throw new Error('Invalid API response format: "products" property is missing');
    }

    return response.data.products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProduct = async (productId: number) => {
  const productUrl = `${API_BASE_URL}/${productId}`;
  try {
    const response = await axios.get(productUrl);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};
