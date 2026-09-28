<script setup>
import { ref, computed, onMounted } from "vue";
import ProductCard from "./components/ProductCard.vue";
import SearchBar from "./components/SearchBar.vue";
import CartSummary from "./components/CartSummary.vue";

const cart = ref([]);

function addToCart(id) {
    if (!cart.value.includes(id)) {
        cart.value.push(id);
    }
}

const count = ref(0);
const name = ref("");
const searchQuery = ref("");

function increase() {
    count.value++;
}

function decrease() {
    count.value--;
}

const products = ref([
    {
        id: 1,
        name: "Аэрогриль",
        price: 5990,
        inStock: true
    },
    {
        id: 2,
        name: "Колонка",
        price: 2990,
        inStock: true
    },
    {
        id: 3,
        name: "Соковыжималка",
        price: 4490,
        inStock: false
    },
    {
        id: 4,
        name: "Тепловентилятор",
        price: 2490,
        inStock: true
    },
    {
        id: 5,
        name: "Тостер",
        price: 1990,
        inStock: false
    }
]);

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

onMounted(function() {
    console.log(
        "Каталог загружен, товаров:",
        products.value.length
    );
});
</script>

<template>
    <div>
        <h1>Мой Vue-проект</h1>

        <h2>Счётчик: {{ count }}</h2>

        <button @click="increase">Увеличить</button>
        <button @click="decrease">Уменьшить</button>

        <h2>Имя</h2>

        <input
            v-model="name"
            placeholder="Введите имя"
        >

        <p v-if="name">
            Привет, {{ name }}!
        </p>

        <h2>Товары</h2>

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
</template>