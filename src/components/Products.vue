<template>
  <div class="product-container">
    <div class="sidebar">
      <h2 class="blue-text">Sales</h2>
      <ul class="sidebar-items">
        <li>
          <i class="bi bi-grid-fill blue-text"></i
          ><span class="blue-text">Dashboard</span>
        </li>
        <li><i class="bi bi-bag-check"></i> Lab tests</li>
        <li><i class="bi bi-calendar-date"></i> Appointment</li>
        <li><i class="bi bi-backpack"></i> Medicine Order</li>
        <li><i class="bi bi-envelope"></i> Message</li>
        <li><i class="bi bi-wallet2"></i> Payment</li>
        <li><i class="bi bi-gear"></i> Settings</li>
      </ul>
    </div>
    <div class="main-content">
      <div class="header-row">
        <div class="search-bar">
          <div class="search-container">
            <input
              type="text"
              v-model="searchQuery"
              placeholder=" Search"
              class="input-field"
            />
          </div>
        </div>
        <div class="user-actions">
          <div class="bi bi-bell"></div>
          <div class="user-profile">
            <img
              src="..\assets\public\profile-svgrepo-com.svg"
              alt="Profile Icon"
              class="profile-img"
            />
          </div>
        </div>
      </div>
      <h2 class="no-prod-info">Products Information</h2>
      <div class="search-fields">
        <div class="search-field">
          <label for="title" class="search-label">Title</label>
          <input type="text" v-model="titleSearch" placeholder="Enter Title" />
        </div>
        <div class="search-field">
          <label for="brand" class="search-label">Brand</label>
          <input type="text" v-model="brandSearch" placeholder="Enter Brand" />
        </div>
      </div>

      <table class="product-table">
        <thead>
          <tr>
            <th>
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleAll"
                  class="custom-checkbox"
                />
                <label class="" for="selectAll"></label>
              </div>
            </th>
            <th>
              Title
              <button @click="sortByTitle('asc')">▲</button>
              <button @click="sortByTitle('desc')">▼</button>
            </th>
            <th>Category</th>
            <th>
              Brand
              <button @click="sortByBrand('asc')">▲</button>
              <button @click="sortByBrand('desc')">▼</button>
            </th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in filteredProducts" :key="product.id">
            <td>
              <div class="checkbox-container">
                <input
                  type="checkbox"
                  v-model="selectedProducts"
                  :value="product.id"
                  class="custom-checkbox"
                />
                <label class="" for="productCheckbox"></label>
              </div>
            </td>
            <td>
              <router-link
                :to="{ name: 'product', params: { id: product.id } }"
              >
                {{ product.title }}
              </router-link>
              <router-view></router-view>
            </td>
            <td>{{ product.category }}</td>
            <td>{{ product.brand }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.rating }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { fetchProducts } from "../services/api";

interface Product {
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

const products = ref<Product[]>([]);
const searchQuery = ref("");
const titleSearch = ref("");
const brandSearch = ref("");
const selectedProducts = ref<number[]>([]);
const selectAll = ref(false);

onMounted(async () => {
  try {
    products.value = await fetchProducts();
  } catch (error) {
    console.error("Error loading products:", error);
  }
});

const filteredProducts = computed(() => {
  return products.value.filter((product) => {
    const titleMatch = product.title
      .toLowerCase()
      .includes(titleSearch.value.toLowerCase());
    const brandMatch = product.brand
      .toLowerCase()
      .includes(brandSearch.value.toLowerCase());
    return titleMatch && brandMatch;
  });
});

const sortByTitle = (order: "asc" | "desc") => {
  products.value.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();

    if (order === "asc") {
      return titleA.localeCompare(titleB);
    } else {
      return titleB.localeCompare(titleA);
    }
  });
};

const sortByBrand = (order: "asc" | "desc") => {
  products.value.sort((a, b) => {
    const brandA = a.brand.toLowerCase();
    const brandB = b.brand.toLowerCase();

    if (order === "asc") {
      return brandA.localeCompare(brandB);
    } else {
      return brandB.localeCompare(brandA);
    }
  });
};

const toggleAll = () => {
  if (selectAll.value) {
    selectedProducts.value = products.value.map((product) => product.id);
  } else {
    selectedProducts.value = [];
  }
};
</script>

<style scoped>
.product-container,
.sidebar,
.main-content,
h2,
.product-table th,
.product-table td {
  color: #4c4c4c;
}

.product-container,
.sidebar,
.main-content,
h2,
.product-table th,
.product-table td,
.search-bar input,
.search-fields input {
  background-color: #ffffff;
  color: #4c4c4c;
}
.product-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  background-color: #f5f5f5;
  padding: 10px;
  text-align: left;
  color: #4c4c4c;
  border-bottom: 1px solid #e6e6e6;
}
.product-table th button {
  background-color: #ffffff;
  color: #4c4c4c;
  font-size: 12px;
  padding: 4px;
  margin-left: 4px;
  border: 1px solid #e6e6e6;
  cursor: pointer;
}

.product-container {
  display: flex;
  background-color: #ffffff;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-actions {
  display: flex;
  align-items: center;
}

.bi,
.user-profile {
  width: 24px; 
  height: 24px; 
  border-radius: 4px;
  background-color: white;
  padding: 8px;
  margin-right: 5px; 
}

.profile-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f4f4;
}

h2 {
  text-align: left;
  margin-bottom: 10px;
}

.search-fields {
  display: flex;
  margin-bottom: 10px;
  text-align: left !important;
}

.search-field {
  margin-right: 40px;
  margin-top: 10px;
}

.search-bar input,
.search-fields input {
  width: 100%;
  padding: 8px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-top: 10px;
}

.search-label {
  text-align: left;
  font-weight: bold;
  margin-right: 5px;
}
.search-container {
  width: 400px;
}
.product-table {
  width: 100%;
  margin-top: 20px;
}

.product-table th,
.product-table td {
  background-color: #fff;
  padding: 10px;
  text-align: left;
}

.sidebar {
  width: 20%;
  padding: 15px;
  background-color: #ffffff;
}

.sidebar-items {
  list-style-type: none;
  padding: 15px;
}

.sidebar-items li {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.sidebar-items i {
  margin-right: 20px;
}

.no-prod-info {
  background-color: #f5f5f5;
  margin-bottom: 20px;
  margin-top: 20px;
}
.blue-text {
  color: #3a8cea;
}
.blue-text i {
  color: #3a8cea;
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }

  .sidebar {
    width: 20%;
    padding: 5px;
    background-color: #ffffff;
  }

  .sidebar-items {
    list-style-type: none;
    padding: 10px;
  }

  .sidebar-items li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .main-content {
    width: 100%;
    padding: 10px;
  }

  .search-fields {
    flex-direction: column;
    margin-bottom: 10px;
  }

  .search-field {
    margin-right: 0;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .search-container {
    width: 100%;
  }

  .product-table th button {
    font-size: 10px;
  }

  .sidebar {
    width: 20%;
    padding: 5px;
    background-color: #ffffff;
  }

  .sidebar-items {
    list-style-type: none;
    padding: 10px;
  }

  .sidebar-items li {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  }

  .sidebar-items i {
    margin-right: 20px;
  }
}
</style>
