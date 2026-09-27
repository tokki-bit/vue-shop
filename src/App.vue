<script setup>
import { ref, computed } from "vue";

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
</script>

<template>
    <div>
        <h1>Мой Vue-проект</h1>

        <h2>Счётчик: {{ count }}</h2>

        <button @click="increase">Увеличить</button>
        <button @click="decrease">Уменьшить</button>

        <h2>Имя</h2>

        <input v-model="name" placeholder="Введите имя">

        <p v-if="name">Привет, {{ name }}!</p>

        <h2>Товары</h2>

        <input
            v-model="searchQuery"
            placeholder="Поиск по названию"
        >

        <div v-for="product in filteredProducts" :key="product.id">
            <h3>{{ product.name }}</h3>

            <p>Цена: {{ product.price }} ₽</p>

            <p v-if="product.inStock">В наличии</p>
            <p v-else>Нет в наличии</p>
        </div>
    </div>
</template>