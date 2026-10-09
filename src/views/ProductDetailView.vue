<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async function () {
    try {
        const id = route.params.id;

        const response = await fetch(
            `https://fakestoreapi.com/products/${id}`
        );

        if (!response.ok) {
            throw new Error("Не удалось загрузить товар");
        }

        const data = await response.json();

        if (!data || !data.id) {
            throw new Error("Товар не найден");
        }

        product.value = data;
    } catch (err) {
        error.value = "Не удалось загрузить товар. Попробуйте позже.";
    } finally {
        loading.value = false;
    }
});

function goBack() {
    router.push("/");
}
</script>

<template>
    <main class="product-detail">
        <p v-if="loading">
            Загрузка...
        </p>

        <p v-else-if="error" class="error">
            {{ error }}
        </p>

        <section v-else-if="product" class="product-info">
            <h1>{{ product.title }}</h1>

            <img
                :src="product.image"
                :alt="product.title"
                class="product-image"
            >

            <p class="product-description">
                {{ product.description }}
            </p>

            <p class="product-price">
                Цена: {{ product.price }} $
            </p>

            <button @click="goBack">
                Назад в каталог
            </button>
        </section>
    </main>
</template>