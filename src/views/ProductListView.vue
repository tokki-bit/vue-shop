<script setup>
import { ref, computed, onMounted } from "vue";
import ProductCard from "../components/ProductCard.vue";
import SearchBar from "../components/SearchBar.vue";
import CartSummary from "../components/CartSummary.vue";

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const cart = ref([]);
const searchQuery = ref("");

function addToCart(id) {
    if (!cart.value.includes(id)) {
        cart.value.push(id);
    }
}

const filteredProducts = computed(function() {
    return products.value.filter(function(product) {
        return product.name
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());
    });
});

const cartProducts = computed(function() {
    return products.value.filter(function(product) {
        return cart.value.includes(product.id);
    });
});

onMounted(async function() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");

        if (!response.ok) {
            throw new Error("Ошибка загрузки данных");
        }

        const data = await response.json();

        products.value = data.map(function(product) {
            return {
                id: product.id,
                name: product.title,
                price: product.price,
                inStock: true
            };
        });
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});
</script>

<template>
    <div>
        <h1>Каталог товаров</h1>

        <div v-if="loading">
            Загрузка...
        </div>

        <div v-else-if="error">
            {{ error }}
        </div>

        <div v-else>
            <SearchBar
                :modelValue="searchQuery"
                @search="searchQuery = $event"
            />

            <ProductCard
                v-for="product in filteredProducts"
                :key="product.id"
                :id="product.id"
                :name="product.name"
                :price="product.price"
                :inStock="product.inStock"
                :inCart="cart.includes(product.id)"
                @add-to-cart="addToCart"
            />

            <CartSummary
                :cartProducts="cartProducts"
            />
        </div>
    </div>
</template>