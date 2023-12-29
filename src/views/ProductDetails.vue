<template>
  <div class="product">
  <div class="product-details-container">
    <div class="product-details-card">
      <h2>{{ product?.title }}</h2>
      <div class="product-details-text">
        <p>Description: {{ product?.description }}</p>
        <p>Price: ${{ product?.price }}</p>
        <p>Stock: {{ product?.stock }}</p>
        <p>Rating: {{ product?.rating }}</p>
        <p>Brand: {{ product?.brand }}</p>
        <p>Category: {{ product?.category }}</p>
      </div>
    </div>
    <div class="product-details-image">
      <img :src="product?.thumbnail" alt="Product Image" />
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { fetchProduct } from "../services/api";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
}

const route = useRoute();
const productId = ref(Number(route.params.id));
const product = ref<Product | null>(null);

onMounted(async () => {
  try {
    if (!isNaN(productId.value)) {
      product.value = await fetchProduct(productId.value);
    } else {
      console.error("Invalid product ID");
    }
  } catch (error) {
    console.error("Error loading product details:", error);
  }
});
</script>

<style scoped>
.product{
  border: 1px solid #5f5a5a;
  margin: 10px;
}
.product-details-container {
  display: flex;
  flex-direction: row;
  color: black;
  background-color: #fff;
}

.product-details-card {
  flex: 1;
  padding: 20px;
  margin-right: 20px;
}

.product-details-text {
  margin-top: 10px;
}

.product-details-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 20px;
}

.product-details-image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
